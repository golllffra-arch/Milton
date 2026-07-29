import React, { useEffect, useRef } from "react";
import styles from "../styles/animated-hero.module.css";

type AnimatedHeroProps = {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  // folder under /public where layer images live (default: /hero)
  imageFolder?: string;
  height?: number | string;
};

export default function AnimatedHero({
  title = "VISITE",
  subtitle = "Journey to new frontiers — animated hero background",
  ctaText = "Start the journey",
  imageFolder = "/hero",
  height = "72vh",
}: AnimatedHeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let raf = 0;

    const onMouseMove = (e: MouseEvent) => {
      // normalized -1..1
      const rect = container.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width; // 0..1
      const my = (e.clientY - rect.top) / rect.height; // 0..1
      // convert to -0.5 .. 0.5 then scale
      const nx = (mx - 0.5) * 2;
      const ny = (my - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        container.style.setProperty("--mx", String(nx));
        container.style.setProperty("--my", String(ny));
      });
    };

    const onScroll = () => {
      const scroll = window.scrollY || window.pageYOffset;
      // small parallax effect by scroll
      container.style.setProperty("--scroll", String(Math.min(scroll / 1000, 1)));
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });

    // initial values
    container.style.setProperty("--mx", "0");
    container.style.setProperty("--my", "0");
    container.style.setProperty("--scroll", "0");

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Each layer can be replaced by placing images in public/hero/
  // expected filenames:
  // - far-mountains.png (or .webp)
  // - mid-mountains.png
  // - clouds.png
  // - birds.svg
  // - grass.png
  // - character.png
  // The CSS also draws additional decorative shapes if images are not present.

  return (
    <div
      className={styles.hero}
      ref={containerRef}
      style={{ height: typeof height === "number" ? `${height}px` : height }}
      data-image-folder={imageFolder}
      role="img"
      aria-label={`${title} — animated hero`}
    >
      {/* animated background gradient / sky */}
      <div className={styles.sky} />

      {/* FAR background - slowly drifting mountains */}
      <div
        className={`${styles.layer} ${styles.far}`}
        style={{ backgroundImage: `url(${imageFolder}/far-mountains.png)` }}
      />

      {/* MID mountains */}
      <div
        className={`${styles.layer} ${styles.mid}`}
        style={{ backgroundImage: `url(${imageFolder}/mid-mountains.png)` }}
      />

      {/* Clouds (float & parallax) */}
      <div
        className={`${styles.layer} ${styles.clouds}`}
        style={{ backgroundImage: `url(${imageFolder}/clouds.png)` }}
      />

      {/* Birds - a repeating SVG strip that flies */}
      <div className={`${styles.layer} ${styles.birds}`}>
        <svg
          viewBox="0 0 200 40"
          className={styles.birdSvg}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          {/* simple bird shapes repeated */}
          <g fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="1.2">
            <path d="M2 30 C8 20 12 20 18 30" />
            <path d="M30 28 C36 18 40 18 46 28" />
            <path d="M60 26 C66 16 70 16 76 26" />
            <path d="M90 24 C96 14 100 14 106 24" />
            <path d="M120 22 C126 12 130 12 136 22" />
            <path d="M150 20 C156 10 160 10 166 20" />
          </g>
        </svg>
      </div>

      {/* Foreground grass / reeds */}
      <div
        className={`${styles.layer} ${styles.grass}`}
        style={{ backgroundImage: `url(${imageFolder}/grass.png)` }}
      />

      {/* Character / silhouette on the right */}
      <div
        className={`${styles.layer} ${styles.character}`}
        style={{ backgroundImage: `url(${imageFolder}/character.png)` }}
        aria-hidden
      />

      {/* overlay vignette */}
      <div className={styles.vignette} />

      {/* Text content */}
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <div className={styles.controls}>
          <button className={styles.cta}>{ctaText}</button>
        </div>
      </div>
    </div>
  );
}