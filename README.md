<div align="center">
  
  # 🌌 Cinematic Scrollytelling Portfolio

  **A High-Performance, WebGL-Driven Interactive Experience**

  [![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
  [![GSAP](https://img.shields.io/badge/GSAP-Scrollytelling-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-UI_Magic-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

  <p align="center">
    This is not just a portfolio—it is an <b>interactive cinematic journey</b>. Engineered with bleeding-edge web technologies to deliver hardware-accelerated shaders, scroll-driven orchestrations, and immersive micro-interactions at a flawless 60 FPS.
  </p>
</div>

---

## 🎨 The Aesthetic: Deep Cyber-Glassmorphism

The visual identity is forged around a **Cinematic Dark Theme** that breaks away from traditional flat UI.
- **The Palette**: Deep voids of Obsidian (`#0F0B08`) ignited by trails of vibrant Plasma Orange (`#FF7A18`) and Crimson (`#C44536`).
- **The Material**: True Glassmorphism. Utilizing backdrop blurs, ultra-thin borders (`border-white/5`), and additive blending to create layered, floating interfaces that dynamically interact with the light-emitting WebGL backgrounds behind them.

---

## 🚀 Engineering The Magic: Effects & Animations

Every component in this project was built to push the limits of modern browser rendering. Here is a deep dive into the underlying architecture of the visual effects:

### 1. WebGL & Fragment Shaders (The Backgrounds)
We bypassed standard CSS backgrounds in favor of raw GPU computing for unparalleled visual depth.
* **The Hyperspeed Engine (`Hyperspeed.tsx`)**: Built on **Three.js**, this effect generates thousands of vertices using `BufferGeometry` to simulate a warp-drive tunnel. By manipulating the Z-axis of points in the render loop and applying `AdditiveBlending` materials, it creates high-speed light trails customized to the portfolio's exact orange/red color hexes.
* **Interactive Gradient Blinds (`GradientBlinds.tsx`)**: Powered by **OGL** (a lightweight WebGL wrapper). A custom fragment shader calculates screen-space UV coordinates to draw angled, masking stripes. It actively listens to mouse movement vectors to calculate a reactive spotlight, illuminating the blinds as the cursor sweeps across the section.
* **The Aurora Simulation (`Aurora.tsx`)**: Uses complex Simplex Noise algorithms within an OGL shader to calculate fluid, organic gradients that mimic the Northern Lights, providing a continuous, breathing ambient light source.

### 2. Scroll Orchestration (The Scrollytelling)
Static pages are dead. This portfolio uses **GSAP (GreenSock)** to tie the passage of time and layout states directly to the user's scroll wheel.
* **The Exploded Gallery (`ExplodedGallery.tsx`)**: Project cards are initially loaded in absolute center, stacked perfectly on top of each other. A GSAP `ScrollTrigger` timeline calculates the viewport progress, mathematically calculating outward trajectories for all 6 cards. As you scroll down, the deck *explodes* into a beautifully spaced masonry grid, scaling up and fading in simultaneously.
* **The Canvas Zoom (`ScrollyCanvas.tsx`)**: The hero section uses `position: sticky` logic paired with transform scaling to create an immersive cinematic "zoom-in" effect, pinning the user in place until the title sequence is complete.

### 3. Cutting-Edge CSS & Micro-interactions
* **The LightBeam Button (`LightBeamButton.tsx`)**: This is not a standard border. It uses the experimental **CSS `@property` API** to natively interpolate angles in a `conic-gradient`. To make the button truly transparent over WebGL backgrounds, we utilize complex **CSS Mask Compositing** (`mask-composite: exclude` / `xor`). This physically cuts the gradient down to a 1px ring, avoiding the traditional hack of covering the center with a solid background color.
* **HyperSpeed Form Loader (`HyperSpeedLoader.tsx`)**: When the user submits the contact form, **Framer Motion's** `AnimatePresence` orchestrates a beautiful SVG takeover. Geometric shapes, rotating cores, and horizontal speed lines animate in sync to provide premium, tactile feedback before gracefully exiting the DOM.
* **The Ghost Cursor (`GhostCursor.tsx`)**: Bypasses the standard OS cursor with a custom React portal that calculates pointer velocity and adds a highly-smoothed spring-physics trailing effect.

---

## 📂 Architecture

```text
📦 src
 ┣ 📂 app                  # Next.js App Router (Layouts & Pages)
 ┣ 📂 components           # The UI Engine
 ┃ ┣ 📜 Aurora.tsx           # OGL Fluid Shader
 ┃ ┣ 📜 GradientBlinds.tsx   # Mouse-reactive WebGL Mask
 ┃ ┣ 📜 Hyperspeed.tsx       # Three.js Warp Drive
 ┃ ┣ 📜 LightBeamButton.tsx  # CSS Houdini/Masked Button
 ┃ ┣ 📜 ExplodedGallery.tsx  # GSAP Scroll Deck
 ┃ ┣ 📜 HyperSpeedLoader.tsx # Framer Motion SVG Orchestrator
 ┃ ┣ 📜 ScrollyCanvas.tsx    # Scroll-pinned Hero Sequence
 ┃ ┗ 📜 GhostCursor.tsx      # Spring-physics custom pointer
 ┗ 📜 globals.css          # Tailwind Directives & CSS Properties
```

## 🛠️ Local Development

Want to see the shaders and animations running locally? 

1. **Clone & Install:**
   ```bash
   git clone https://github.com/LALITHD-21/portfolilo.git
   cd portfolilo
   npm install
   ```

2. **Ignite the Server:**
   ```bash
   npm run dev
   ```

3. **Experience it:**
   Open [http://localhost:3000](http://localhost:3000) and start scrolling. 

---
<div align="center">
  <p><i>Crafted with precision, math, and motion.</i></p>
  <p>© 2026 LALITH D — All rights reserved.</p>
</div>
