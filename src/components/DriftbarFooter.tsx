import React from 'react';
import SmartVideo from './SmartVideo';

export default function DriftbarFooter() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-8 pb-24 md:pb-28">
      <footer className="footer footer--boxed" id="footer">
        <div className="footer__stage" aria-hidden="true">
          <SmartVideo
            className="footer__video"
            src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4d01c727-d9c5-47c8-a778-35a451ffd39f.mp4"
            poster="/assets/clavion/meadow-poster.svg"
          />
        </div>

        <p className="footer__wordmark font-pacifico" aria-hidden="true">
          HeyDots
        </p>

        <div className="footer__fog" aria-hidden="true" />

        <div className="footer__content">
          <div className="brand">
            <a
              href="#home"
              className="brand__logo font-pacifico"
              aria-label="HeyDots home"
            >
              HeyDots
            </a>
            <h2 className="brand__title">
              AI Automation &amp; Digital Transformation
            </h2>
            <p className="brand__text">
              <span className="font-pacifico text-[#f3f5fa]">HeyDots</span> builds 24/7 AI chatbots, voice solutions, automated lead
              generation pipelines, generative content systems, and SaaS tools
              like PropText to streamline operations and scale revenue.
            </p>
            <a href="mailto:info@heydots.com" className="brand__cta">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
              </svg>
              info@heydots.com
            </a>
            <p className="brand__copy">
              © 2026 <span className="font-pacifico text-[#d5dce6]">HeyDots</span> (heydots.com) · Global Remote-First Agency.
            </p>
          </div>

          <nav className="col col--menu" aria-label="Footer services navigation">
            <h3 className="col__title">Services</h3>
            <ul className="col__list">
              <li>
                <a href="#solutions">AI Chatbots &amp; Voice</a>
              </li>
              <li>
                <a href="#solutions">Sales Automation</a>
              </li>
              <li>
                <a href="#solutions">Content Creation</a>
              </li>
              <li>
                <a href="#architecture">Data Insights</a>
              </li>
              <li>
                <a href="#architecture">AI Consulting</a>
              </li>
            </ul>
          </nav>

          <nav className="col" aria-label="Footer case studies navigation">
            <h3 className="col__title">Case Studies</h3>
            <ul className="col__list">
              <li>
                <a href="#solutions">E-Commerce (+34%)</a>
              </li>
              <li>
                <a href="#solutions">Logistics (+40%)</a>
              </li>
              <li>
                <a href="#architecture">PropText Real Estate</a>
              </li>
              <li>
                <a href="#benefits">85% Cost Reduction</a>
              </li>
              <li>
                <a href="#contact">Book an Audit</a>
              </li>
            </ul>
          </nav>

          <nav className="col" aria-label="Footer connect navigation">
            <h3 className="col__title">Connect</h3>
            <ul className="col__list">
              <li>
                <a href="#home">heydots.com</a>
              </li>
              <li>
                <a href="mailto:info@heydots.com">info@heydots.com</a>
              </li>
              <li>
                <a href="#about">About HeyDots</a>
              </li>
              <li>
                <a href="#featured-video">Global Team</a>
              </li>
              <li>
                <a href="#benefits">Key Benefits</a>
              </li>
              <li>
                <a href="#architecture">PropText AI</a>
              </li>
              <li>
                <a href="#contact">Schedule Call</a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
