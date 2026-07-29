import React from "react";
import AnimatedHero from "../components/AnimatedHero";

/**
 * Example index page using the animated hero.
 *
 * Instructions:
 * 1. Add your layered images into /public/hero/
 *    - far-mountains.png
 *    - mid-mountains.png
 *    - clouds.png
 *    - grass.png
 *    - character.png
 * 2. Adjust imageFolder prop if you place them somewhere else.
 * 3. Import and reuse the AnimatedHero component in pages where you need it.
 */

export default function HomePage() {
  return (
    <>
      <AnimatedHero
        title="VISITE"
        subtitle="A journey into an illustrated world — parallax, drifting clouds, birds and character"
        ctaText="Start the journey"
        imageFolder="/hero"
        height="78vh"
      />

      <main style={{ padding: "3rem 1.25rem" }}>
        <section style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2>Example content</h2>
          <p>
            Continue building your site below the hero. The animated hero is responsive and uses
            layered images + CSS/JS parallax. Replace the placeholder images in /public/hero with
            your artwork (high quality PNG or WebP recommended).
          </p>
        </section>
      </main>
    </>
  );
}