How to install the animated "anime-style" hero into your Milton Next.js repo
---------------------------------------------------------------------------

Files added:
- components/AnimatedHero.tsx
- styles/animated-hero.module.css
- pages/index.tsx (example page that uses the component)

Step 1 — Add images
-------------------
Create a folder public/hero at the project root and add layered artwork files there:

- public/hero/far-mountains.png   (very large, far background)
- public/hero/mid-mountains.png   (midground mountains)
- public/hero/clouds.png          (wide cloud strip with transparency)
- public/hero/grass.png           (foreground grass/reeds)
- public/hero/character.png       (character on the right, PNG with transparency)

Naming is important for the default component; if you'd like to use a different folder or names,
pass a different `imageFolder` prop to the AnimatedHero component (for example "/assets/hero-v2").

Step 2 — Add the component
--------------------------
- Copy the `components/AnimatedHero.tsx` file into your repo.
- Copy `styles/animated-hero.module.css` into your styles directory (path used in component is ../styles/... so keep as-is or update the import).

Step 3 — Use in a page
----------------------
- The provided pages/index.tsx demonstrates usage.
- Import and place `<AnimatedHero imageFolder="/hero" />` in any page or layout.

Notes & Tips
------------
- The implementation uses mouse position and scroll to set simple CSS vars for parallax.
  For mobile, movement is subtle and character is hidden.
- If you want to use vector art or SVG layers, set those as background images or inline SVG markup
  inside component layers.
- To tune animation strengths, open styles/animated-hero.module.css and adjust the root variables:
    --far-depth, --mid-depth, --clouds-depth, --birds-depth, --grass-depth, --char-depth

Accessibility
-------------
- The container uses role="img" and aria-label. If you need a more semantic structure (for screen
  readers) adapt the aria-label or add descriptive text in the page.

If you'd like, I can:
- Convert the birds animation to a smoother SVG motion along a curve (path animation),
- Add Lottie support (if you prefer interpolated vector animations),
- Provide a small script to auto-generate parallax transforms for many layers.