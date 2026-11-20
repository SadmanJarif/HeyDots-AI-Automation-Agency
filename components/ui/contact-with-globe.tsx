import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Headphones, type LucideIcon } from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import type {
  Topology,
  GeometryCollection,
  GeometryObject,
} from 'topojson-specification';
import type { GeoPermissibleObjects } from 'd3';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { GlossyAiButton } from '@/src/components/PillButtons';

interface GlobeWireframeProps {
  width?: number;
  height?: number;
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  graticuleColor?: string;
  graticuleOpacity?: number;
  sphereOutlineColor?: string;
  sphereOutlineWidth?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  rotateToLocation?: string | [number, number];
  rotateCities?: string[];
  rotationSpeed?: number;
  initialRotation?: [number, number];
  enableInteraction?: boolean;
  showGraticule?: boolean;
  animationDuration?: number;
  startAsGlobe?: boolean;
  countryFillColor?: string;
  countryHoverColor?: string;
  variant?: 'wireframe' | 'wireframesolid' | 'solid';
  scale?: number;
  backgroundColor?: string;
}

interface GeoFeature {
  type: string;
  geometry: GeometryObject;
  properties: Record<string, unknown>;
}

interface WorldAtlasTopology extends Topology {
  objects: {
    countries: GeometryCollection;
  };
}

interface CustomProjection extends d3.GeoProjection {
  alpha(value: number): CustomProjection;
  alpha(): number;
}

const cityCoordinates: Record<string, [number, number]> = {
  'san francisco': [37.7749, -122.4194],
  'new york': [40.7128, -74.006],
  london: [51.5074, -0.1278],
  tokyo: [35.6762, 139.6503],
  paris: [48.8566, 2.3522],
  moscow: [55.7558, 37.6176],
  dubai: [25.2048, 55.2708],
  singapore: [1.3521, 103.8198],
  sydney: [-33.8688, 151.2093],
  mumbai: [19.076, 72.8777],
  'los angeles': [34.0522, -118.2437],
  chicago: [41.8781, -87.6298],
};

function orthographicRaw(x: number, y: number): [number, number] {
  const cosy = Math.cos(y);
  return [cosy * Math.sin(x), Math.sin(y)];
}

function equirectangularRaw(lambda: number, phi: number): [number, number] {
  return [lambda, phi];
}

function interpolateProjection(
  raw0: (lambda: number, phi: number) => [number, number],
  raw1: (lambda: number, phi: number) => [number, number],
): CustomProjection {
  let t = 0;

  const createRawProjection = (
    alpha: number,
  ): ((lambda: number, phi: number) => [number, number]) => {
    return (lambda: number, phi: number): [number, number] => {
      const [x0, y0] = raw0(lambda, phi);
      const [x1, y1] = raw1(lambda, phi);
      return [x0 + alpha * (x1 - x0), y0 + alpha * (y1 - y0)];
    };
  };

  const projection = d3.geoProjection(
    createRawProjection(t),
  ) as unknown as CustomProjection;

  const alphaMethod = ((value?: number): CustomProjection | number => {
    if (value !== undefined) {
      t = +value;
      const newProjection = d3.geoProjection(
        createRawProjection(t),
      ) as unknown as CustomProjection;

      if (projection.scale()) newProjection.scale(projection.scale());
      if (projection.translate())
        newProjection.translate(projection.translate());
      if (projection.rotate()) newProjection.rotate(projection.rotate());
      if (projection.precision())
        newProjection.precision(projection.precision());

      newProjection.alpha = alphaMethod as CustomProjection['alpha'];

      return newProjection;
    }
    return t;
  }) as CustomProjection['alpha'];

  projection.alpha = alphaMethod;

  return projection;
}

function GlobeWireframe({
  width,
  height,
  className = 'aspect-square w-full max-w-150',
  strokeColor = 'currentColor',
  strokeWidth = 1.0,
  graticuleColor = 'currentColor',
  graticuleOpacity = 0.2,
  sphereOutlineColor = 'currentColor',
  sphereOutlineWidth = 1,
  autoRotate = true,
  autoRotateSpeed = 0.5,
  rotateToLocation,
  rotateCities = [],
  rotationSpeed = 3000,
  initialRotation = [0, 0],
  enableInteraction = true,
  showGraticule = true,
  animationDuration = 2000,
  startAsGlobe = true,
  countryFillColor,
  countryHoverColor,
  variant = 'wireframe',
  scale = 1,
  backgroundColor,
}: GlobeWireframeProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(startAsGlobe ? 0 : 100);
  const [worldData, setWorldData] = useState<GeoFeature[]>([]);
  const [rotation, setRotation] = useState<[number, number]>(initialRotation);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState([0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const rotationInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const rotationAnimFrame = useRef<number | null>(null);
  const rotationStartTime = useRef<number | null>(null);
  const rotationFrom = useRef<[number, number]>([0, 0]);
  const rotationTo = useRef<[number, number]>([0, 0]);
  const animationFrame = useRef<number | null>(null);
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const rotationRef = useRef(rotation);

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  const useResponsive = !width && !height;
  const finalWidth = useResponsive ? dimensions.width : width || 800;
  const finalHeight = useResponsive ? dimensions.height : height || 500;

  const defaultStrokeColor = strokeColor || 'currentColor';
  const defaultGraticuleColor = graticuleColor || 'currentColor';
  const defaultSphereOutlineColor = sphereOutlineColor || 'currentColor';
  const defaultCountryFillColor =
    countryFillColor || (variant === 'solid' ? 'currentColor' : 'none');
  const defaultBackgroundColor = backgroundColor || 'transparent';

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const updateDimensions = () => {
      if (container && useResponsive) {
        const width = container.offsetWidth || 300;
        setDimensions({ width, height: width });
      }
    };

    updateDimensions();

    if (useResponsive) {
      resizeObserver.current = new ResizeObserver(updateDimensions);
      resizeObserver.current.observe(container);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(container);

    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
      observer.unobserve(container);
    };
  }, [useResponsive]);

  useEffect(() => {
    const loadWorldData = async () => {
      try {
        const response = await fetch(
          'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json',
        );
        const world = (await response.json()) as WorldAtlasTopology;
        const countries = feature(world, world.objects.countries)
          .features as GeoFeature[];
        setWorldData(countries);
      } catch (error) {
        console.error('Error loading world data:', error);
        const fallbackData: GeoFeature[] = [
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [-180, -90],
                  [180, -90],
                  [180, 90],
                  [-180, 90],
                  [-180, -90],
                ],
              ],
            } as unknown as GeometryObject,
            properties: {},
          },
        ];
        setWorldData(fallbackData);
      }
    };
    loadWorldData();
  }, []);

  useEffect(() => {
    if (!autoRotate || !isVisible || isDragging || rotateCities.length > 0) {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }
      return;
    }

    const rotate = () => {
      setRotation((prev) => [(prev[0] + autoRotateSpeed) % 360, prev[1]]);
      animationFrame.current = requestAnimationFrame(rotate);
    };

    animationFrame.current = requestAnimationFrame(rotate);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [autoRotate, autoRotateSpeed, isVisible, isDragging, rotateCities.length]);

  const animateRotationTo = useCallback(
    (target: [number, number], duration = 1200) => {
      if (rotationAnimFrame.current) {
        cancelAnimationFrame(rotationAnimFrame.current);
      }

      rotationFrom.current = rotationRef.current;
      rotationTo.current = target;
      rotationStartTime.current = performance.now();

      const animate = (time: number) => {
        const elapsed = time - (rotationStartTime.current || 0);
        const t = Math.min(elapsed / duration, 1);

        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

        const lon =
          rotationFrom.current[0] +
          (rotationTo.current[0] - rotationFrom.current[0]) * eased;

        const lat =
          rotationFrom.current[1] +
          (rotationTo.current[1] - rotationFrom.current[1]) * eased;

        setRotation([lon, lat]);

        if (t < 1) {
          rotationAnimFrame.current = requestAnimationFrame(animate);
        }
      };

      rotationAnimFrame.current = requestAnimationFrame(animate);
    },
    [],
  );

  useEffect(() => {
    if (rotateCities.length === 0 || !isVisible) return;

    const rotateToNextCity = () => {
      const nextIndex = (currentCityIndex + 1) % rotateCities.length;
      const city = rotateCities[nextIndex].toLowerCase();
      const coordinates = cityCoordinates[city];

      if (coordinates) {
        animateRotationTo(
          [-coordinates[1], -coordinates[0]],
          rotationSpeed * 0.6,
        );
        setCurrentCityIndex(nextIndex);
      }
    };

    const city = rotateCities[currentCityIndex].toLowerCase();
    const coordinates = cityCoordinates[city];

    if (coordinates) {
      animateRotationTo(
        [-coordinates[1], -coordinates[0]],
        rotationSpeed * 0.6,
      );
    }

    rotationInterval.current = setInterval(rotateToNextCity, rotationSpeed);

    return () => {
      if (rotationInterval.current) clearInterval(rotationInterval.current);
    };
  }, [
    rotateCities,
    currentCityIndex,
    rotationSpeed,
    isVisible,
    animateRotationTo,
  ]);

  useEffect(() => {
    if (!rotateToLocation) return;

    let coordinates: [number, number];
    if (typeof rotateToLocation === 'string') {
      const city = rotateToLocation.toLowerCase();
      coordinates = cityCoordinates[city] || [0, 0];
    } else {
      coordinates = rotateToLocation;
    }

    setRotation([-coordinates[1], -coordinates[0]]);
  }, [rotateToLocation]);

  const handleMouseDown = (event: React.MouseEvent) => {
    if (!enableInteraction) return;
    setIsDragging(true);
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      setLastMouse([event.clientX - rect.left, event.clientY - rect.top]);
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging || !enableInteraction) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const currentMouse = [event.clientX - rect.left, event.clientY - rect.top];
    const dx = currentMouse[0] - lastMouse[0];
    const dy = currentMouse[1] - lastMouse[1];

    const t = progress / 100;
    let sensitivity: number;

    if (variant === 'wireframe') {
      sensitivity = t < 0.5 ? 0.5 : 0.25;
    } else {
      sensitivity = 0.5;
    }

    setRotation((prev) => [
      prev[0] + dx * sensitivity,
      Math.max(-90, Math.min(90, prev[1] - dy * sensitivity)),
    ]);

    setLastMouse(currentMouse);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!svgRef.current || worldData.length === 0 || !isVisible) return;
    if (useResponsive && dimensions.width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    let finalCountryFill = 'none';
    let finalStrokeWidth = strokeWidth;
    let finalOpacity = 1.0;
    let renderGraticule = showGraticule;
    let finalGraticuleOpacity = graticuleOpacity;
    let finalSphereOutlineWidth = sphereOutlineWidth;

    if (variant === 'wireframe') {
      finalCountryFill = 'none';
      finalStrokeWidth = strokeWidth;
      finalOpacity = 1.0;
      renderGraticule = showGraticule;
      finalGraticuleOpacity = graticuleOpacity;
      finalSphereOutlineWidth = sphereOutlineWidth;
    } else if (variant === 'wireframesolid') {
      finalCountryFill = 'none';
      finalStrokeWidth = strokeWidth;
      finalOpacity = 1.0;
      renderGraticule = false;
      finalGraticuleOpacity = 0;
      finalSphereOutlineWidth = 1.5;
    } else if (variant === 'solid') {
      finalCountryFill = defaultCountryFillColor;
      finalStrokeWidth = strokeWidth * 0.5;
      finalOpacity = 0.3;
      renderGraticule = false;
      finalGraticuleOpacity = 0;
      finalSphereOutlineWidth = 1.5;
    }

    if (defaultBackgroundColor !== 'transparent') {
      const radius = (Math.min(finalWidth, finalHeight) / 2) * scale * 0.9;
      svg
        .append('circle')
        .attr('cx', finalWidth / 2)
        .attr('cy', finalHeight / 2)
        .attr('r', radius)
        .attr('fill', defaultBackgroundColor);
    }

    let projection: d3.GeoProjection | CustomProjection;
    const path = d3.geoPath();

    if (variant === 'wireframe') {
      const t = progress / 100;
      const alpha = Math.pow(t, 0.5);

      const baseScale = Math.min(finalWidth, finalHeight) / 2;
      const scaleRange = d3
        .scaleLinear()
        .domain([0, 1])
        .range([baseScale * 0.9 * scale, baseScale * 0.54 * scale]);
      const baseRotate = d3.scaleLinear().domain([0, 1]).range([0, 0]);

      projection = interpolateProjection(orthographicRaw, equirectangularRaw)
        .scale(scaleRange(alpha))
        .translate([finalWidth / 2, finalHeight / 2])
        .rotate([baseRotate(alpha) + rotation[0], rotation[1]])
        .precision(0.1)
        .clipAngle(90);

      (projection as CustomProjection).alpha(alpha);
      path.projection(projection);
    } else {
      projection = d3
        .geoOrthographic()
        .scale((Math.min(finalWidth, finalHeight) / 2) * scale * 0.9)
        .translate([finalWidth / 2, finalHeight / 2])
        .rotate([rotation[0], rotation[1]])
        .precision(0.1);

      path.projection(projection);
    }

    if (renderGraticule && finalGraticuleOpacity > 0) {
      try {
        const graticule = d3.geoGraticule();
        const graticulePath = path(graticule());
        if (graticulePath) {
          svg
            .append('path')
            .datum(graticule())
            .attr('d', graticulePath)
            .attr('fill', 'none')
            .attr('stroke', defaultGraticuleColor)
            .attr('stroke-width', 1)
            .attr('opacity', finalGraticuleOpacity);
        }
      } catch (error) {
        console.error('Error creating graticule:', error);
      }
    }

    svg
      .selectAll('.country')
      .data(worldData)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', (d: GeoFeature) => {
        try {
          const pathString = path(d as unknown as GeoPermissibleObjects);
          if (!pathString) return '';
          if (
            typeof pathString === 'string' &&
            (pathString.includes('NaN') || pathString.includes('Infinity'))
          ) {
            return '';
          }
          return pathString;
        } catch (error) {
          return '';
        }
      })
      .attr('fill', finalCountryFill)
      .attr('stroke', defaultStrokeColor)
      .attr('stroke-width', finalStrokeWidth)
      .attr('opacity', finalOpacity)
      // eslint-disable-next-line react-hooks/unsupported-syntax
      .style('visibility', function (this: SVGPathElement) {
        const pathData = d3.select(this).attr('d');
        return pathData && pathData.length > 0 && !pathData.includes('NaN')
          ? 'visible'
          : 'hidden';
      })
      .on('mouseenter', function (this: SVGPathElement) {
        if (countryHoverColor && variant === 'solid') {
          d3.select(this).attr('fill', countryHoverColor);
        }
      })
      .on('mouseleave', function (this: SVGPathElement) {
        if (variant === 'solid') {
          d3.select(this).attr('fill', finalCountryFill);
        }
      });

    try {
      const sphereOutline = path({ type: 'Sphere' });
      if (sphereOutline) {
        svg
          .append('path')
          .datum({ type: 'Sphere' })
          .attr('d', sphereOutline)
          .attr('fill', 'none')
          .attr('stroke', defaultSphereOutlineColor)
          .attr('stroke-width', finalSphereOutlineWidth)
          .attr('opacity', variant === 'wireframe' ? 1.0 : 0.8);
      }
    } catch (error) {
      console.error('Error creating sphere outline:', error);
    }
  }, [
    worldData,
    progress,
    rotation,
    isVisible,
    finalWidth,
    finalHeight,
    defaultStrokeColor,
    strokeWidth,
    defaultGraticuleColor,
    graticuleOpacity,
    defaultSphereOutlineColor,
    sphereOutlineWidth,
    showGraticule,
    defaultCountryFillColor,
    countryHoverColor,
    variant,
    scale,
    defaultBackgroundColor,
    useResponsive,
    dimensions.width,
  ]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <svg
        ref={svgRef}
        width={finalWidth}
        height={finalHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className={
          useResponsive
            ? 'w-full h-full opacity-0 transition-opacity duration-1000'
            : ''
        }
        style={{
          cursor: enableInteraction
            ? isDragging
              ? 'grabbing'
              : 'grab'
            : 'default',
          opacity: useResponsive ? (dimensions.width > 0 ? 1 : 0) : 1,
        }}
      />
    </div>
  );
}

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

const fieldClass =
  'w-full min-h-11 bg-zinc-900/80 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200';

export interface ContactLink {
  icon: LucideIcon;
  label: string;
  href: string;
  external?: boolean;
}

const DEFAULT_LINKS: ContactLink[] = [
  { icon: Mail, label: 'info@heydots.com', href: 'mailto:info@heydots.com' },
  {
    icon: Phone,
    label: 'Book a 30-min call',
    href: 'https://cal.com/heydots/30min',
    external: true,
  },
];

function FormDots({ className }: { className?: string }) {
  return (
    <Separator
      decorative
      orientation="horizontal"
      className={cn('flex h-4 w-full shrink-0 items-center overflow-hidden', className)}
    >
      <div
        aria-hidden="true"
        className="h-4 w-full text-violet-300/80"
        style={{
          backgroundImage: 'radial-gradient(circle, currentColor 0.9px, transparent 0.95px)',
          backgroundSize: '8px 100%',
          backgroundRepeat: 'repeat-x',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      />
    </Separator>
  );
}

export interface ContactWithGlobeProps {
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
  links?: ContactLink[];
  name: string;
  email: string;
  company: string;
  message: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
  isSubmitted?: boolean;
  formError?: string | null;
  onReset?: () => void;
  plan?: string;
  plans?: string[];
  onPlanChange?: (plan: string) => void;
}

export default function ContactWithGlobe({
  title = 'Contact us',
  subtitle = 'Contact',
  description = 'Share your workflow goals or book a 30-minute call. The HeyDots team replies within 24 business hours.',
  className,
  links = DEFAULT_LINKS,
  name,
  email,
  company,
  message,
  onNameChange,
  onEmailChange,
  onCompanyChange,
  onMessageChange,
  onSubmit,
  isSubmitting = false,
  isSubmitted = false,
  formError = null,
  onReset,
  plan,
}: ContactWithGlobeProps) {
  return (
    <section
      className={cn('relative w-full overflow-hidden bg-transparent py-4 text-zinc-100 sm:py-8', className)}
    >
      <div className="relative mx-auto max-w-7xl px-0">
        <div className="mb-10 flex flex-col items-center gap-4 text-center sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="inline-flex items-center rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5"
          >
            <span className="text-sm font-medium text-violet-300">{subtitle}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: smoothEase }}
            className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: smoothEase }}
            className="max-w-md text-base text-zinc-400"
          >
            {description}
          </motion.p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2, ease: smoothEase }}
            className="flex min-w-0 flex-col gap-6"
          >
            <div className="flex flex-col gap-1">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                <Headphones className="h-4 w-4 text-violet-300" aria-hidden="true" />
                Get in touch
              </h2>
              <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
                Email the studio or book a 30-minute call. We typically reply within one business day.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {links.map(({ icon: Icon, label, href, external }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.1,
                    ease: smoothEase,
                  }}
                  className="group flex w-fit items-center gap-3 text-sm text-zinc-400 transition-colors duration-200 hover:text-white"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/80 transition-all duration-200 group-hover:border-violet-400/50 group-hover:bg-violet-500/10">
                    <Icon className="h-3.5 w-3.5 text-zinc-400 transition-colors duration-200 group-hover:text-violet-300" />
                  </div>
                  {label}
                </motion.a>
              ))}
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[440px]">
              <GlobeWireframe
                className="h-full w-full text-violet-300"
                variant="wireframe"
                autoRotate
                autoRotateSpeed={0.45}
                strokeWidth={0.8}
                strokeColor="#c4b5fd"
                graticuleColor="#a78bfa"
                graticuleOpacity={0.28}
                sphereOutlineColor="#a78bfa"
                sphereOutlineWidth={1.25}
                showGraticule
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.35, ease: smoothEase }}
            className="flex min-w-0 flex-col gap-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8"
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <h2 className="mb-2 text-2xl font-semibold text-white">Message received</h2>
                <p className="mb-6 max-w-sm text-sm leading-relaxed text-zinc-400">
                  Thanks, <span className="font-medium text-white">{name}</span>. We logged your note
                  {plan ? (
                    <>
                      {' '}
                      about <span className="text-violet-300">{plan}</span>
                    </>
                  ) : null}{' '}
                  and will reach out at <span className="text-white">{email}</span>.
                </p>
                {onReset ? (
                  <Button
                    type="button"
                    onClick={onReset}
                    className="h-11 rounded-xl bg-[#8b5cf6] px-8 text-sm font-semibold text-white hover:bg-[#7c3aed]"
                  >
                    Send another message
                  </Button>
                ) : null}
              </div>
            ) : (
              <>
                <div>
                  <h2 className="mb-0.5 text-lg font-semibold text-white">Send a message</h2>
                  <p className="text-sm text-zinc-400">
                    Tell us what you want to automate. No spam, and an NDA is available on request.
                  </p>
                </div>

                <FormDots />

                <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="contact-globe-name"
                        className="text-xs font-semibold uppercase tracking-widest text-zinc-500"
                      >
                        Full Name
                      </label>
                      <input
                        id="contact-globe-name"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={(event) => onNameChange(event.target.value)}
                        placeholder="Alex Morgan"
                        autoComplete="name"
                        className={fieldClass}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="contact-globe-company"
                        className="text-xs font-semibold uppercase tracking-widest text-zinc-500"
                      >
                        Company
                      </label>
                      <input
                        id="contact-globe-company"
                        name="company"
                        type="text"
                        value={company}
                        onChange={(event) => onCompanyChange(event.target.value)}
                        placeholder="Acme Corp"
                        autoComplete="organization"
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-globe-email"
                      className="text-xs font-semibold uppercase tracking-widest text-zinc-500"
                    >
                      Email
                    </label>
                    <input
                      id="contact-globe-email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(event) => onEmailChange(event.target.value)}
                      placeholder="alex@company.com"
                      autoComplete="email"
                      className={fieldClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-globe-message"
                      className="text-xs font-semibold uppercase tracking-widest text-zinc-500"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-globe-message"
                      name="message"
                      required
                      rows={4}
                      value={message}
                      onChange={(event) => onMessageChange(event.target.value)}
                      placeholder="Tell us about the workflow you want to automate"
                      className={`${fieldClass} resize-y py-3`}
                    />
                  </div>

                  {formError ? (
                    <p
                      role="alert"
                      className="rounded-[10px] border border-red-500/35 bg-red-500/10 px-3.5 py-2.5 text-[13px] text-red-300"
                    >
                      {formError}
                    </p>
                  ) : null}

                  <GlossyAiButton
                    type="submit"
                    disabled={isSubmitting}
                    className="self-start"
                    label={isSubmitting ? 'Sending Request...' : 'Submit Request'}
                  />
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

