# Cinematic Scrollytelling Portfolio

A high-performance, visually immersive personal portfolio built with Next.js and TypeScript. This project focuses on delivering a cinematic user experience through advanced WebGL background effects, complex scroll-driven animations, and highly customized interaction components.

## 🚀 Tech Stack & Architecture

- **Core**: Next.js (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Custom CSS `@property` APIs
- **Animation Orchestration**: 
  - **Framer Motion**: Used for declarative UI states, micro-interactions, page mounts, and `AnimatePresence` unmounts.
  - **GSAP (GreenSock)**: Powers the complex, timeline-based scroll animations (Scrollytelling).
- **Hardware-Accelerated Graphics**:
  - **Three.js**: Drives complex 3D perspective animations.
  - **OGL**: A lightweight WebGL library used for smooth, custom fragment shaders.

## 🎨 Visual Design & Theming

The portfolio operates on a **Cinematic Dark Theme** designed to evoke a premium, sci-fi aesthetic.
- **Color Palette**: Built around deep blacks (`#0F0B08` and `#16110D`) accented by warm, glowing hues of Crimson (`#C44536`) and vibrant Orange (`#FF7A18`).
- **Typography & Layout**: Utilizes large, expressive typography with smooth character-by-character reveals. The layout relies heavily on sticky positioning and overlapping z-index layers to create depth.
- **Glassmorphism**: Strategic use of backdrop blurs and semi-transparent layers (`bg-white/5`, `border-white/10`) to create floating, futuristic UI elements.

## 🌟 Key Components & Effects

### 1. The LightBeam Button (`LightBeamButton.tsx`)
A custom button component used globally across the site (Hero actions, Project links, Social links).
- **Mechanism**: Utilizes cutting-edge CSS `@property` to animate a `conic-gradient` angle seamlessly at 60fps.
- **Visuals**: Features a rotating, multi-color light beam border with an inner glassmorphic core and an interactive radial shine effect on hover.
- **Optimization**: Uses CSS masks (`mask-composite: exclude`) to perfectly crop the rotating gradient to exactly a 1px border without needing stacking background hacks, allowing for true transparent backgrounds over other effects.

### 2. Exploded Gallery (`ExplodedGallery.tsx`)
A highly interactive project showcase that reacts to user scroll.
- **Mechanism**: Powered by GSAP `ScrollTrigger` and `matchMedia` for responsive design across desktop and mobile.
- **Effect**: Project cards initially stack centrally. As the user scrolls down, a timeline orchestrates the cards expanding outward into a defined 6-grid layout, scaling up and fading in relative to the viewport position.

### 3. High-Performance WebGL Backgrounds
- **Aurora (`Aurora.tsx`)**: An OGL-powered fragment shader simulating flowing northern lights, injected with the portfolio's signature warm orange and crimson color stops.
- **Gradient Blinds (`GradientBlinds.tsx`)**: An interactive OGL effect where "blinds" or angled stripes overlay a gradient background. It reacts to mouse movement in real-time, creating a dynamic spotlighting effect.
- **Hyperspeed Warp (`Hyperspeed.tsx`)**: A Three.js simulation of a warp drive/hyperspeed tunnel. Rendered as the foundational background of the Footer, customized to emit orange and red light trails to match the branding perfectly.

### 4. HyperSpeed Form Loader (`HyperSpeedLoader.tsx`)
A custom loading sequence triggered during contact form submission.
- **Mechanism**: Managed by Framer Motion's `AnimatePresence` for smooth mounting and exit animations.
- **Visuals**: A complex, multi-element animation featuring a character-like core, flying horizontal speed lines, and synchronized rotation/opacity pulses, providing immediate, high-quality visual feedback.

### 5. ScrollyCanvas Hero (`ScrollyCanvas.tsx` & `Overlay.tsx`)
The cinematic entry point of the website.
- **Effect**: Uses sticky positioning and GSAP to pin the background elements while the foreground (`Overlay.tsx`) slides up over it. The hero text and images dynamically scale and fade based on the exact scroll percentage, creating a "zoom-in" entry sequence reminiscent of film title credits.

## 📂 Project Structure

```text
├── public/                 # Static assets (images, profile pictures)
├── src/
│   ├── app/                # Next.js App Router entry points (layout, page)
│   ├── components/         # Core UI and Effect components
│   │   ├── ScrollyCanvas.tsx    # Scroll-driven hero container
│   │   ├── ExplodedGallery.tsx  # GSAP project gallery sequence
│   │   ├── LightBeamButton.tsx  # CSS @property animated button
│   │   ├── Aurora.tsx           # WebGL Shader effect
│   │   ├── GradientBlinds.tsx   # Interactive WebGL background
│   │   ├── Hyperspeed.tsx       # Three.js footer background
│   │   ├── HyperSpeedLoader.tsx # Form submission UI state
│   │   └── ...
```

## 🛠️ Setup & Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
