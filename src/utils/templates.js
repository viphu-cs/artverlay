// Artverlay Presets and Templates

export const ART_TEMPLATES = [
  {
    id: 'bauhaus-glassmorphism',
    name: 'Bauhaus Glassmorphism',
    description: 'Minimalist Bauhaus shapes styled with futuristic frosted glass overlays, heavy blend modes, and elegant fluid motion.',
    canvasBg: 'linear-gradient(135deg, #181926, #2d1d4c)',
    aspectRatio: '1:1',
    layers: [
      {
        id: 'bg-mesh',
        name: 'Retro Tech Grid',
        visible: true,
        isCustom: true,
        html: `<div class="brutal-grid"></div>`,
        css: `.brutal-grid {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px);
  background-size: 20px 20px;
}`,
        opacity: 50,
        scale: 1,
        rotate: 0,
        translateX: 0,
        translateY: 0,
        blur: 0,
        hueRotate: 0,
        mixBlendMode: 'normal',
        parallaxFactor: -1.5,
        visualConfig: {
          shape: 'none',
          text: '',
          fontFamily: 'Space Grotesk',
          fontSize: 24,
          textColor: '#ffffff',
          bgColor: 'transparent',
          borderColor: '#000000',
          borderWidth: 0,
          borderRadius: 0,
          shadowColor: '#000000',
          shadowOffset: 0,
          rows: 3,
          cols: 3,
          gridGap: 8
        }
      },
      {
        id: 'cyan-orb',
        name: 'Glowing Cyan Orb',
        visible: true,
        isCustom: true,
        html: `<div class="orb cyan-glow"></div>`,
        css: `.orb {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, #00f0ff 0%, rgba(0,240,255,0.2) 70%);
  filter: blur(25px);
  animation: floatOrb 10s ease-in-out infinite;
}
@keyframes floatOrb {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -30px); }
}`,
        opacity: 80,
        scale: 1.1,
        rotate: 0,
        translateX: -50,
        translateY: -60,
        blur: 0,
        hueRotate: 0,
        mixBlendMode: 'screen',
        parallaxFactor: -4,
        visualConfig: {
          shape: 'circle',
          text: '',
          fontFamily: 'Space Grotesk',
          fontSize: 24,
          textColor: '#ffffff',
          bgColor: '#00f0ff',
          borderColor: '#000000',
          borderWidth: 0,
          borderRadius: 100,
          shadowColor: '#00f0ff',
          shadowOffset: 0,
          rows: 3,
          cols: 3,
          gridGap: 8
        }
      },
      {
        id: 'magenta-orb',
        name: 'Glowing Magenta Orb',
        visible: true,
        isCustom: true,
        html: `<div class="orb pink-glow"></div>`,
        css: `.orb {
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: radial-gradient(circle, #ff007f 0%, rgba(255,0,127,0.2) 70%);
  filter: blur(30px);
  animation: floatOrb2 8s ease-in-out infinite;
}
@keyframes floatOrb2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-30px, 30px); }
}`,
        opacity: 75,
        scale: 1,
        rotate: 0,
        translateX: 70,
        translateY: 80,
        blur: 0,
        mixBlendMode: 'screen',
        parallaxFactor: 3.5,
        visualConfig: {
          shape: 'circle',
          text: '',
          fontFamily: 'Space Grotesk',
          fontSize: 24,
          textColor: '#ffffff',
          bgColor: '#ff007f',
          borderColor: '#000000',
          borderWidth: 0,
          borderRadius: 100,
          shadowColor: '#ff007f',
          shadowOffset: 0,
          rows: 3,
          cols: 3,
          gridGap: 8
        }
      },
      {
        id: 'solid-yellow-rect',
        name: 'Bauhaus Yellow Square',
        visible: true,
        isCustom: false,
        html: `<div class="brutal-shape square"></div>`,
        css: `.square {
  background-color: #FFDE4D;
  border: 4px solid #000000;
  color: #000000;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 24px;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  text-align: center;
  padding: 10px;
  width: 140px;
  height: 140px;
  border-radius: 0px;
  box-shadow: 6px 6px 0px #000000;
}`,
        opacity: 100,
        scale: 0.9,
        rotate: 15,
        translateX: -100,
        translateY: 40,
        blur: 0,
        mixBlendMode: 'normal',
        parallaxFactor: 1.2,
        visualConfig: {
          shape: 'square',
          text: '',
          fontFamily: 'Space Grotesk',
          fontSize: 24,
          textColor: '#000000',
          bgColor: '#FFDE4D',
          borderColor: '#000000',
          borderWidth: 4,
          borderRadius: 0,
          shadowColor: '#000000',
          shadowOffset: 6,
          rows: 3,
          cols: 3,
          gridGap: 8
        }
      },
      {
        id: 'glass-panel',
        name: 'Frosted Glass Panel',
        visible: true,
        isCustom: true,
        html: `<div class="glass-sheet">
  <div class="notch"></div>
  <div class="content">ARTVERLAY</div>
</div>`,
        css: `.glass-sheet {
  width: 320px;
  height: 200px;
  border: 4px solid #000;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 10px 10px 0px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
  overflow: hidden;
}
.notch {
  width: 40px;
  height: 8px;
  background: #000;
  border-radius: 4px;
}
.content {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 4px;
  text-shadow: 2px 2px 0px #000;
}`,
        opacity: 90,
        scale: 1,
        rotate: -5,
        translateX: 0,
        translateY: 0,
        blur: 0,
        mixBlendMode: 'normal',
        parallaxFactor: 2.5,
        visualConfig: {
          shape: 'brutal-box',
          text: 'ARTVERLAY',
          fontFamily: 'Space Grotesk',
          fontSize: 28,
          textColor: '#ffffff',
          bgColor: 'rgba(255, 255, 255, 0.1)',
          borderColor: '#000000',
          borderWidth: 4,
          borderRadius: 0,
          shadowColor: 'rgba(0,0,0,0.5)',
          shadowOffset: 10,
          rows: 3,
          cols: 3,
          gridGap: 8
        }
      }
    ]
  },
  {
    id: 'vaporwave-horizon',
    name: 'Vaporwave Sunset',
    description: 'Classic retrowave aesthetic featuring an animated perspective wireframe grid, custom neon gradients, and a glowing retro sun.',
    canvasBg: '#0b001a',
    aspectRatio: '16:9',
    layers: [
      {
        id: 'synth-sun',
        name: 'Glowing Neon Sun',
        visible: true,
        isCustom: true,
        html: `<div class="synth-sun">
  <div class="sun-stripes"></div>
</div>`,
        css: `.synth-sun {
  width: 220px;
  height: 220px;
  background: linear-gradient(to bottom, #ff007f 0%, #ffde4d 100%);
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 50px rgba(255,0,127,0.6);
}
.sun-stripes {
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 15px,
    #0b001a 15px,
    #0b001a 20px
  );
}`,
        opacity: 95,
        scale: 1.2,
        rotate: 0,
        translateX: 0,
        translateY: -50,
        blur: 0,
        mixBlendMode: 'normal',
        parallaxFactor: -2,
        visualConfig: {
          shape: 'circle',
          text: '',
          fontFamily: 'Space Grotesk',
          fontSize: 24,
          textColor: '#ffffff',
          bgColor: '#ff007f',
          borderColor: '#000000',
          borderWidth: 0,
          borderRadius: 100,
          shadowColor: 'rgba(255,0,127,0.6)',
          shadowOffset: 0,
          rows: 3,
          cols: 3,
          gridGap: 8
        }
      },
      {
        id: 'perspective-grid',
        name: '3D Wireframe Grid',
        visible: true,
        isCustom: true,
        html: `<div class="grid-container">
  <div class="wireframe-grid"></div>
</div>`,
        css: `.grid-container {
  width: 100%;
  height: 100%;
  perspective: 120px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}
.wireframe-grid {
  width: 200%;
  height: 300px;
  margin-left: -50%;
  background-image: 
    linear-gradient(rgba(0, 240, 255, 0.4) 2px, transparent 2px),
    linear-gradient(90deg, rgba(0, 240, 255, 0.4) 2px, transparent 2px);
  background-size: 40px 40px;
  transform: rotateX(75deg);
  transform-origin: top center;
  animation: scrollGrid 6s linear infinite;
}
@keyframes scrollGrid {
  0% { background-position: 0 0; }
  100% { background-position: 0 40px; }
}`,
        opacity: 80,
        scale: 1.4,
        rotate: 0,
        translateX: 0,
        translateY: 60,
        blur: 0,
        mixBlendMode: 'screen',
        parallaxFactor: 3,
        visualConfig: {
          shape: 'none',
          text: '',
          fontFamily: 'Space Grotesk',
          fontSize: 24,
          textColor: '#ffffff',
          bgColor: 'transparent',
          borderColor: '#000000',
          borderWidth: 0,
          borderRadius: 0,
          shadowColor: '#000000',
          shadowOffset: 0,
          rows: 3,
          cols: 3,
          gridGap: 8
        }
      },
      {
        id: 'vapor-text',
        name: 'Vaporwave Marquee Text',
        visible: true,
        isCustom: false,
        html: `<div class="brutal-shape text-only">D R E A M S // 夢</div>`,
        css: `.text-only {
  color: #ffffff;
  font-family: 'Syne', sans-serif;
  font-size: 36px;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  text-align: center;
  padding: 10px;
  text-shadow: 3px 3px 0px #ff007f;
}`,
        opacity: 90,
        scale: 1,
        rotate: 0,
        translateX: 0,
        translateY: 0,
        blur: 0,
        mixBlendMode: 'normal',
        parallaxFactor: 1.5,
        visualConfig: {
          shape: 'none',
          text: 'D R E A M S // 夢',
          fontFamily: 'Syne',
          fontSize: 36,
          textColor: '#ffffff',
          bgColor: 'transparent',
          borderColor: '#000000',
          borderWidth: 0,
          borderRadius: 0,
          shadowColor: '#ff007f',
          shadowOffset: 3,
          rows: 3,
          cols: 3,
          gridGap: 8
        }
      }
    ]
  },
  {
    id: 'cyber-mandala',
    name: 'Cybernetic Sacred Geometry',
    description: 'Vibrant neon layers spinning in counter directions to create an abstract, hypnotic digital mandala.',
    canvasBg: '#050508',
    aspectRatio: '1:1',
    layers: [
      {
        id: 'hex-grid',
        name: 'Background Cyber Matrix',
        visible: true,
        isCustom: true,
        html: `<div class="hex-bg"></div>`,
        css: `.hex-bg {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, transparent 20%, #050508 80%),
              repeating-linear-gradient(45deg, rgba(57,255,20,0.05) 0px, rgba(57,255,20,0.05) 2px, transparent 2px, transparent 10px),
              repeating-linear-gradient(-45deg, rgba(57,255,20,0.05) 0px, rgba(57,255,20,0.05) 2px, transparent 2px, transparent 10px);
}`,
        opacity: 60,
        scale: 1,
        rotate: 0,
        translateX: 0,
        translateY: 0,
        blur: 0,
        mixBlendMode: 'normal',
        parallaxFactor: -1,
        visualConfig: {
          shape: 'none',
          text: '',
          fontFamily: 'Space Grotesk',
          fontSize: 24,
          textColor: '#ffffff',
          bgColor: 'transparent',
          borderColor: '#000000',
          borderWidth: 0,
          borderRadius: 0,
          shadowColor: '#000000',
          shadowOffset: 0,
          rows: 3,
          cols: 3,
          gridGap: 8
        }
      },
      {
        id: 'outer-ring',
        name: 'Outer Neon Gear',
        visible: true,
        isCustom: true,
        html: `<svg class="gear-svg" viewBox="0 0 100 100" width="300" height="300">
  <circle cx="50" cy="50" r="40" fill="none" stroke="#ff6b9d" stroke-width="2" stroke-dasharray="6,4" />
  <circle cx="50" cy="50" r="35" fill="none" stroke="#26e6e6" stroke-width="0.5" />
</svg>`,
        css: `.gear-svg {
  animation: rotateCW 20s linear infinite;
  filter: drop-shadow(0 0 8px #ff6b9d);
}
@keyframes rotateCW {
  100% { transform: rotate(360deg); }
}`,
        opacity: 90,
        scale: 1.1,
        rotate: 0,
        translateX: 0,
        translateY: 0,
        blur: 0,
        mixBlendMode: 'screen',
        parallaxFactor: 2,
        visualConfig: {
          shape: 'circle',
          text: '',
          fontFamily: 'Space Grotesk',
          fontSize: 24,
          textColor: '#ffffff',
          bgColor: 'transparent',
          borderColor: '#ff6b9d',
          borderWidth: 2,
          borderRadius: 100,
          shadowColor: '#ff6b9d',
          shadowOffset: 0,
          rows: 3,
          cols: 3,
          gridGap: 8
        }
      },
      {
        id: 'inner-mandala',
        name: 'Hypnotic Inner Flower',
        visible: true,
        isCustom: true,
        html: `<svg class="mandala-svg" viewBox="0 0 100 100" width="220" height="220">
  <g stroke="#4ade80" stroke-width="1.5" fill="none" opacity="0.8">
    <ellipse cx="50" cy="50" rx="40" ry="10" transform="rotate(0 50 50)"/>
    <ellipse cx="50" cy="50" rx="40" ry="10" transform="rotate(30 50 50)"/>
    <ellipse cx="50" cy="50" rx="40" ry="10" transform="rotate(60 50 50)"/>
    <ellipse cx="50" cy="50" rx="40" ry="10" transform="rotate(90 50 50)"/>
    <ellipse cx="50" cy="50" rx="40" ry="10" transform="rotate(120 50 50)"/>
    <ellipse cx="50" cy="50" rx="40" ry="10" transform="rotate(150 50 50)"/>
  </g>
  <circle cx="50" cy="50" r="8" fill="#FFDE4D" />
</svg>`,
        css: `.mandala-svg {
  animation: rotateCCW 15s linear infinite;
  filter: drop-shadow(0 0 10px #4ade80);
}
@keyframes rotateCCW {
  100% { transform: rotate(-360deg); }
}`,
        opacity: 95,
        scale: 0.95,
        rotate: 0,
        translateX: 0,
        translateY: 0,
        blur: 0,
        mixBlendMode: 'screen',
        parallaxFactor: -3,
        visualConfig: {
          shape: 'circle',
          text: '',
          fontFamily: 'Space Grotesk',
          fontSize: 24,
          textColor: '#ffffff',
          bgColor: 'transparent',
          borderColor: '#4ade80',
          borderWidth: 2,
          borderRadius: 100,
          shadowColor: '#4ade80',
          shadowOffset: 0,
          rows: 3,
          cols: 3,
          gridGap: 8
        }
      }
    ]
  },
  {
    id: 'abstract-brutalist',
    name: 'Brutalist Comic Overlay',
    description: 'Vibrant pop-art collage showing retro hand-drawn elements, heavy dots, warning checkers, and solid comic strokes.',
    canvasBg: '#FFDE4D',
    aspectRatio: '1:1',
    layers: [
      {
        id: 'halftone-dots',
        name: 'Halftone Comic Screen',
        visible: true,
        isCustom: true,
        html: `<div class="halftone-screen"></div>`,
        css: `.halftone-screen {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(#000 25%, transparent 26%);
  background-size: 16px 16px;
  opacity: 0.15;
}`,
        opacity: 100,
        scale: 1,
        rotate: 0,
        translateX: 0,
        translateY: 0,
        blur: 0,
        mixBlendMode: 'normal',
        parallaxFactor: -1,
        visualConfig: {
          shape: 'none',
          text: '',
          fontFamily: 'Space Grotesk',
          fontSize: 24,
          textColor: '#ffffff',
          bgColor: 'transparent',
          borderColor: '#000000',
          borderWidth: 0,
          borderRadius: 0,
          shadowColor: '#000000',
          shadowOffset: 0,
          rows: 3,
          cols: 3,
          gridGap: 8
        }
      },
      {
        id: 'warning-banner',
        name: 'Warning Checkers Tape',
        visible: true,
        isCustom: true,
        html: `<div class="brutal-tape">
  <div class="tape-inner">WARNING // OVERLAY ART // DANGER // WARNING //</div>
</div>`,
        css: `.brutal-tape {
  width: 600px;
  background: #000;
  border: 4px solid #000;
  color: #4ade80;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 20px;
  font-weight: 900;
  padding: 8px 0;
  overflow: hidden;
  box-shadow: 6px 6px 0px #FF6B9D;
}
.tape-inner {
  white-space: nowrap;
  display: inline-block;
  animation: scrollText 12s linear infinite;
}
@keyframes scrollText {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}`,
        opacity: 100,
        scale: 1,
        rotate: -8,
        translateX: 0,
        translateY: -80,
        blur: 0,
        mixBlendMode: 'normal',
        parallaxFactor: -2.5,
        visualConfig: {
          shape: 'brutal-box',
          text: 'WARNING // OVERLAY ART // DANGER // WARNING //',
          fontFamily: 'Space Grotesk',
          fontSize: 20,
          textColor: '#4ade80',
          bgColor: '#000000',
          borderColor: '#000000',
          borderWidth: 4,
          borderRadius: 0,
          shadowColor: '#FF6B9D',
          shadowOffset: 6,
          rows: 3,
          cols: 3,
          gridGap: 8
        }
      },
      {
        id: 'cartoon-flower',
        name: 'Brutalist Retro Sun Flower',
        visible: true,
        isCustom: true,
        html: `<svg class="retro-flower" viewBox="0 0 100 100" width="180" height="180">
  <!-- Petals -->
  <g fill="#FF6B9D" stroke="#000" stroke-width="4">
    <circle cx="50" cy="20" r="15"/>
    <circle cx="50" cy="80" r="15"/>
    <circle cx="20" cy="50" r="15"/>
    <circle cx="80" cy="50" r="15"/>
    <circle cx="29" cy="29" r="15"/>
    <circle cx="71" cy="71" r="15"/>
    <circle cx="29" cy="71" r="15"/>
    <circle cx="71" cy="29" r="15"/>
  </g>
  <!-- Center Core -->
  <circle cx="50" cy="50" r="20" fill="#26e6e6" stroke="#000" stroke-width="4" />
  <!-- Smiley Face -->
  <circle cx="43" cy="46" r="3.5" fill="#000"/>
  <circle cx="57" cy="46" r="3.5" fill="#000"/>
  <path d="M 40 56 Q 50 66 60 56" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round"/>
</svg>`,
        css: `.retro-flower {
  animation: dance 3s ease-in-out infinite alternate;
  filter: drop-shadow(4px 4px 0px #000);
}
@keyframes dance {
  0% { transform: scale(1) rotate(-5deg); }
  100% { transform: scale(1.08) rotate(5deg); }
}`,
        opacity: 100,
        scale: 1.1,
        rotate: 0,
        translateX: -60,
        translateY: 60,
        blur: 0,
        mixBlendMode: 'normal',
        parallaxFactor: 3.2,
        visualConfig: {
          shape: 'circle',
          text: '😊',
          fontFamily: 'Space Grotesk',
          fontSize: 24,
          textColor: '#000000',
          bgColor: '#FF6B9D',
          borderColor: '#000000',
          borderWidth: 4,
          borderRadius: 100,
          shadowColor: '#000000',
          shadowOffset: 4,
          rows: 3,
          cols: 3,
          gridGap: 8
        }
      },
      {
        id: 'star-burst',
        name: 'Vibrant Cyber Burst',
        visible: true,
        isCustom: true,
        html: `<svg class="pop-burst" viewBox="0 0 100 100" width="130" height="130">
  <polygon points="50,5 57,35 85,20 68,45 95,50 68,55 85,80 57,65 50,95 43,65 15,80 32,55 5,50 32,45 15,20 43,35" 
           fill="#26e6e6" stroke="#000" stroke-width="4" />
  <circle cx="50" cy="50" r="12" fill="#F8F9FA" stroke="#000" stroke-width="4" />
</svg>`,
        css: `.pop-burst {
  animation: pulseBurst 2s infinite alternate;
  filter: drop-shadow(3px 3px 0px #000);
}
@keyframes pulseBurst {
  0% { transform: scale(0.9) rotate(0); }
  100% { transform: scale(1.1) rotate(15deg); }
}`,
        opacity: 100,
        scale: 0.9,
        rotate: 35,
        translateX: 90,
        translateY: 40,
        blur: 0,
        mixBlendMode: 'normal',
        parallaxFactor: 1.8,
        visualConfig: {
          shape: 'star',
          text: '',
          fontFamily: 'Space Grotesk',
          fontSize: 24,
          textColor: '#ffffff',
          bgColor: '#26e6e6',
          borderColor: '#000000',
          borderWidth: 4,
          borderRadius: 0,
          shadowColor: '#000000',
          shadowOffset: 3,
          rows: 3,
          cols: 3,
          gridGap: 8
        }
      }
    ]
  }
];
