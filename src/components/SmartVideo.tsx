import React, { useEffect, useRef, useState } from 'react';

interface SmartVideoProps {
  src: string;
  poster?: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  style?: React.CSSProperties;
}

export default function SmartVideo({
  src,
  poster,
  className = 'w-full h-full object-cover',
  priority = false,
  style,
}: SmartVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Play when visible in viewport, pause when offscreen
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const playObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return;
          if (entry.isIntersecting) {
            const playPromise = videoRef.current.play();
            if (playPromise && typeof playPromise.catch === 'function') {
              playPromise.catch(() => {});
            }
          } else {
            videoRef.current.pause();
          }
        });
      },
      { rootMargin: '250px 0px', threshold: 0.01 }
    );

    playObserver.observe(videoEl);
    return () => playObserver.disconnect();
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={`${className} transition-opacity duration-700 ${
        isLoaded || poster ? 'opacity-100' : 'opacity-0'
      }`}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={priority}
      preload={priority ? 'auto' : 'metadata'}
      onLoadedMetadata={() => setIsLoaded(true)}
      onLoadedData={() => setIsLoaded(true)}
      onCanPlay={() => setIsLoaded(true)}
      style={style}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
