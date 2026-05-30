import React, { useState, useRef, useEffect } from 'react';
import * as htmlToImage from 'html-to-image';
import { 
  FolderOpen, 
  Download, 
  Code, 
  HelpCircle, 
  Layers, 
  Image as ImageIcon, 
  Layout, 
  MousePointer, 
  RefreshCw, 
  Sparkles,
  Info,
  Maximize2,
  FileCode,
  ZoomIn
} from 'lucide-react';
import NeoButton from './components/NeoButton';
import LayerList from './components/LayerList';
import VisualSliders from './components/VisualSliders';
import CodeEditor from './components/CodeEditor';
import Canvas, { scopeCSS } from './components/Canvas';
import { ART_TEMPLATES } from './utils/templates';
import { generateLayerCode } from './utils/generator';

export default function App() {
  // Load initial template (Bauhaus)
  const initialTemplate = ART_TEMPLATES[0];
  const initialLayers = initialTemplate.layers.map(l => ({ ...l, isCustom: l.isCustom ?? true }));
  const [layers, setLayers] = useState(initialLayers);
  const [selectedLayerId, setSelectedLayerId] = useState(initialTemplate.layers[0]?.id || null);
  const [canvasBg, setCanvasBg] = useState(initialTemplate.canvasBg);
  const [aspectRatio, setAspectRatio] = useState(initialTemplate.aspectRatio);
  const [parallaxEnabled, setParallaxEnabled] = useState(true);
  const [selectedTemplateId, setSelectedTemplateId] = useState(initialTemplate.id);
  const [showHelp, setShowHelp] = useState(false);
  const [canvasZoom, setCanvasZoom] = useState(100);

  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState('layers'); // 'layers', 'sliders', 'code', 'exports'

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const canvasRef = useRef(null);

  // Template loader
  const handleLoadTemplate = (e) => {
    const templateId = e.target.value;
    if (templateId === 'custom') {
      setSelectedTemplateId('custom');
      setLayers([]);
      setSelectedLayerId(null);
      setCanvasBg('#ffffff');
      setAspectRatio('1:1');
      return;
    }
    const template = ART_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplateId(templateId);
      const loadedLayers = template.layers.map(l => ({ ...l, isCustom: l.isCustom ?? true }));
      setLayers(loadedLayers);
      setSelectedLayerId(loadedLayers[0]?.id || null);
      setCanvasBg(template.canvasBg);
      setAspectRatio(template.aspectRatio);
    }
  };

  // State modification handlers
  const handleSelectLayer = (id) => {
    setSelectedLayerId(id);
  };

  const handleAddLayer = () => {
    const newId = `layer-${Date.now()}`;
    const initialConfig = {
      shape: 'brutal-box',
      text: '',
      fontFamily: 'Space Grotesk',
      fontSize: 22,
      textColor: '#000000',
      bgColor: '#4ade80',
      borderColor: '#000000',
      borderWidth: 4,
      borderRadius: 8,
      shadowColor: '#000000',
      shadowOffset: 4,
      rows: 3,
      cols: 3,
      gridGap: 8
    };

    const { html, css } = generateLayerCode(initialConfig);

    const newLayer = {
      id: newId,
      name: `New Layer (${layers.length + 1})`,
      visible: true,
      html,
      css,
      isCustom: false,
      visualConfig: initialConfig,
      opacity: 100,
      scale: 1,
      rotate: 0,
      translateX: 0,
      translateY: 0,
      blur: 0,
      hueRotate: 0,
      mixBlendMode: 'normal',
      parallaxFactor: 0
    };

    setLayers([newLayer, ...layers]);
    setSelectedLayerId(newId);
  };

  const handleDeleteLayer = (id) => {
    const filtered = layers.filter(layer => layer.id !== id);
    setLayers(filtered);
    if (selectedLayerId === id) {
      setSelectedLayerId(filtered[0]?.id || null);
    }
  };

  const handleCloneLayer = (id) => {
    const layerToClone = layers.find(l => l.id === id);
    if (!layerToClone) return;

    const index = layers.findIndex(l => l.id === id);
    const newId = `layer-clone-${Date.now()}`;
    const cloned = {
      ...layerToClone,
      id: newId,
      name: `${layerToClone.name} (Copy)`,
      translateX: layerToClone.translateX + 20, // offset slightly
      translateY: layerToClone.translateY + 20
    };

    const updated = [...layers];
    updated.splice(index + 1, 0, cloned);
    setLayers(updated);
    setSelectedLayerId(newId);
  };

  const handleToggleVisibility = (id) => {
    setLayers(layers.map(l => l.id === id ? { ...l, visible: !l.visible } : l));
  };

  const handleReorderLayers = (oldIndex, newIndex) => {
    const updated = [...layers];
    const [moved] = updated.splice(oldIndex, 1);
    updated.splice(newIndex, 0, moved);
    setLayers(updated);
  };

  const handleRenameLayer = (id, newName) => {
    setLayers(layers.map(l => l.id === id ? { ...l, name: newName } : l));
  };

  const handleLayerChange = (id, changes) => {
    setLayers(layers.map(l => l.id === id ? { ...l, ...changes } : l));
  };

  const handleLayerVisualConfigChange = (id, newConfig) => {
    setLayers(layers.map(l => {
      if (l.id === id) {
        const updatedConfig = { ...l.visualConfig, ...newConfig };
        const { html, css } = generateLayerCode(updatedConfig);
        return {
          ...l,
          visualConfig: updatedConfig,
          html,
          css
        };
      }
      return l;
    }));
  };

  const handleToggleCustomCode = (id) => {
    setLayers(layers.map(l => {
      if (l.id === id) {
        const isCustom = !l.isCustom;
        // If locking back, regenerate code from visual settings
        if (!isCustom) {
          const config = l.visualConfig || {
            shape: 'brutal-box',
            text: '',
            fontFamily: 'Space Grotesk',
            fontSize: 24,
            textColor: '#ffffff',
            bgColor: '#ff6b9d',
            borderColor: '#000000',
            borderWidth: 4,
            borderRadius: 8,
            shadowColor: '#000000',
            shadowOffset: 4,
            rows: 3,
            cols: 3,
            gridGap: 8
          };
          const { html, css } = generateLayerCode(config);
          return { ...l, isCustom, html, css, visualConfig: config };
        }
        return { ...l, isCustom };
      }
      return l;
    }));
  };

  const handleDropShape = (shapeType, dropX, dropY) => {
    const newId = `layer-${Date.now()}`;
    
    let bgColor = '#4ade80';
    let text = '';
    if (shapeType === 'circle') {
      bgColor = '#26e6e6';
    } else if (shapeType === 'triangle') {
      bgColor = '#FFDE4D';
    } else if (shapeType === 'star') {
      bgColor = '#A78BFA';
    } else if (shapeType === 'table') {
      bgColor = '#FF7E47';
    } else if (shapeType === 'none') {
      bgColor = 'transparent';
    }
    
    const initialConfig = {
      shape: shapeType,
      text,
      fontFamily: 'Space Grotesk',
      fontSize: 20,
      textColor: shapeType === 'none' ? '#26e6e6' : '#000000',
      bgColor,
      borderColor: '#000000',
      borderWidth: 3,
      borderRadius: 8,
      shadowColor: '#000000',
      shadowOffset: 4,
      rows: 3,
      cols: 3,
      gridGap: 6
    };

    const { html, css } = generateLayerCode(initialConfig);

    const newLayer = {
      id: newId,
      name: `${shapeType.toUpperCase()} Layer (${layers.length + 1})`,
      visible: true,
      html,
      css,
      isCustom: false,
      visualConfig: initialConfig,
      opacity: 100,
      scale: 1,
      rotate: 0,
      translateX: dropX,
      translateY: dropY,
      blur: 0,
      hueRotate: 0,
      mixBlendMode: 'normal',
      parallaxFactor: 0
    };

    setLayers([newLayer, ...layers]);
    setSelectedLayerId(newId);
  };

  // EXPORT 1: PNG Image
  const handleExportPng = () => {
    if (!canvasRef.current) return;

    // Temporarily deselect so dashed outline does not render in export
    const previousSelection = selectedLayerId;
    setSelectedLayerId(null);

    setTimeout(() => {
      htmlToImage.toPng(canvasRef.current, { 
        cacheBust: true,
        style: {
          boxShadow: 'none',
          border: 'none',
          transform: 'none'
        }
      })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `artverlay-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
        setSelectedLayerId(previousSelection);
      })
      .catch((err) => {
        console.error('Failed to export canvas image:', err);
        setSelectedLayerId(previousSelection);
      });
    }, 150);
  };

  // EXPORT 2: Single Self-Contained HTML File
  const handleExportHtml = () => {
    let ratioStyle = '1 / 1';
    let maxW = '600px';
    if (aspectRatio === '16:9') {
      ratioStyle = '16 / 9';
      maxW = '800px';
    } else if (aspectRatio === '9:16') {
      ratioStyle = '9 / 16';
      maxW = '380px';
    }

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Artverlay Showcase ✦ Generated Layer Art</title>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Lexend&family=Syne:wght@700;800&family=Space+Mono&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #0c0c0e;
      background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1.5px, transparent 1.5px);
      background-size: 24px 24px;
      overflow: hidden;
      font-family: 'Lexend', sans-serif;
    }
    
    #art-canvas {
      aspect-ratio: ${ratioStyle};
      width: 90vw;
      max-width: ${maxW};
      background: ${canvasBg};
      position: relative;
      overflow: hidden;
      box-shadow: 0px 30px 60px rgba(0,0,0,0.8), 0 0 0 6px #000;
      border: 6px solid #000;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .layer-wrapper {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: none;
      transition: opacity 0.2s, filter 0.2s, transform 0.05s ease-out;
    }

    /* Scoped Layer CSS variables & slider values */
    ${layers.map(layer => {
      if (!layer.visible) return '';

      // Transforms
      const sx = layer.scaleX ?? layer.scale ?? 1;
      const sy = layer.scaleY ?? layer.scale ?? 1;
      const skewX = layer.skewX || 0;
      const skewY = layer.skewY || 0;
      const rot = layer.rotate || 0;
      const tx = layer.translateX || 0;
      const ty = layer.translateY || 0;

      // Color filters
      const filtersList = [
        (layer.blur > 0) && `blur(${layer.blur}px)`,
        (layer.hueRotate > 0) && `hue-rotate(${layer.hueRotate}deg)`,
        (layer.brightness !== undefined && layer.brightness !== 100) && `brightness(${layer.brightness}%)`,
        (layer.contrast !== undefined && layer.contrast !== 100) && `contrast(${layer.contrast}%)`,
        (layer.grayscale > 0) && `grayscale(${layer.grayscale}%)`,
        (layer.saturate !== undefined && layer.saturate !== 100) && `saturate(${layer.saturate}%)`,
        (layer.invert > 0) && `invert(${layer.invert}%)`,
        (layer.sepia > 0) && `sepia(${layer.sepia}%)`
      ].filter(Boolean).join(' ');

      // Wrapper decorations
      const shadowX = layer.shadowOffsetX ?? 0;
      const shadowY = layer.shadowOffsetY ?? 0;
      const shadowBl = layer.shadowBlur ?? 0;
      const shadowCol = layer.shadowColor ?? '#000000';
      const boxShadowValue = (shadowX !== 0 || shadowY !== 0 || shadowBl !== 0)
        ? `${shadowX}px ${shadowY}px ${shadowBl}px ${shadowCol}`
        : 'none';

      return `
        #layer-${layer.id} {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
          transform-origin: center center;
          box-sizing: border-box;
          opacity: ${(layer.opacity ?? 100) / 100};
          mix-blend-mode: ${layer.mixBlendMode || 'normal'};
          filter: ${filtersList || 'none'};
          transform: translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${sx}, ${sy}) skew(${skewX}deg, ${skewY}deg);
          padding: ${layer.padding || 0}px;
          background-color: ${layer.wrapperBg || 'transparent'};
          border: ${layer.borderWidth > 0 ? `${layer.borderWidth}px ${layer.borderStyle || 'solid'} ${layer.borderColor || '#000'}` : 'none'};
          border-radius: ${layer.borderRadius || 0}px;
          box-shadow: ${boxShadowValue};
        }
        ${scopeCSS(layer.css, `#layer-${layer.id}`)}
      `;
    }).join('\n')}
  </style>
</head>
<body>

  <div id="art-canvas">
    ${[...layers].reverse().map(layer => {
      if (!layer.visible) return '';
      return `
        <div 
          id="layer-${layer.id}" 
          class="layer-wrapper" 
          data-parallax="${layer.parallaxFactor || 0}"
          data-tx="${layer.translateX || 0}"
          data-ty="${layer.translateY || 0}"
          data-r="${layer.rotate || 0}"
          data-sx="${layer.scaleX ?? layer.scale ?? 1}"
          data-sy="${layer.scaleY ?? layer.scale ?? 1}"
          data-skx="${layer.skewX || 0}"
          data-sky="${layer.skewY || 0}"
        >
          <div style="width:100%; height:100%; display:flex; justify-content:center; align-items:center;">
            ${layer.html || ''}
          </div>
        </div>
      `;
    }).join('\n')}
  </div>

  <!-- Smooth Mouse Parallax Engine -->
  <script>
    const canvas = document.getElementById('art-canvas');
    const layers = document.querySelectorAll('.layer-wrapper');
    
    if (${parallaxEnabled}) {
      window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        // Calculate offsets relative to canvas center
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        layers.forEach(layer => {
          const factor = parseFloat(layer.getAttribute('data-parallax') || 0);
          if (factor === 0) return;
          
          const tx = parseFloat(layer.getAttribute('data-tx') || 0);
          const ty = parseFloat(layer.getAttribute('data-ty') || 0);
          const r = parseFloat(layer.getAttribute('data-r') || 0);
          const sx = parseFloat(layer.getAttribute('data-sx') || 1);
          const sy = parseFloat(layer.getAttribute('data-sy') || 1);
          const skx = parseFloat(layer.getAttribute('data-skx') || 0);
          const sky = parseFloat(layer.getAttribute('data-sky') || 0);
          
          const px = x * factor * 50;
          const py = y * factor * 50;
          
          layer.style.transform = \`translate(calc(\${tx}px + \${px}px), calc(\${ty}px + \${py}px)) rotate(\${r}deg) scale(\${sx}, \${sy}) skew(\${skx}deg, \${sky}deg)\`;
        });
      });

      // Smoothly reset on mouse leave
      window.addEventListener('mouseleave', () => {
        layers.forEach(layer => {
          const tx = parseFloat(layer.getAttribute('data-tx') || 0);
          const ty = parseFloat(layer.getAttribute('data-ty') || 0);
          const r = parseFloat(layer.getAttribute('data-r') || 0);
          const sx = parseFloat(layer.getAttribute('data-sx') || 1);
          const sy = parseFloat(layer.getAttribute('data-sy') || 1);
          const skx = parseFloat(layer.getAttribute('data-skx') || 0);
          const sky = parseFloat(layer.getAttribute('data-sky') || 0);
          layer.style.transform = \`translate(\${tx}px, \${ty}px) rotate(\${r}deg) scale(\${sx}, \${sy}) skew(\${skx}deg, \${sky}deg)\`;
        });
      });
    }
  </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const link = document.createElement('a');
    link.download = `artverlay-${Date.now()}.html`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  // EXPORT 3: JSON Project state
  const handleExportJson = () => {
    const config = {
      version: '1.0',
      canvasBg,
      aspectRatio,
      parallaxEnabled,
      layers
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.download = `artverlay-project-${Date.now()}.json`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  // IMPORT: JSON Project state
  const handleImportJson = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        if (data.layers) setLayers(data.layers);
        if (data.canvasBg) setCanvasBg(data.canvasBg);
        if (data.aspectRatio) setAspectRatio(data.aspectRatio);
        if (data.parallaxEnabled !== undefined) setParallaxEnabled(data.parallaxEnabled);
        if (data.layers && data.layers.length > 0) {
          setSelectedLayerId(data.layers[0].id);
        }
        setSelectedTemplateId('custom');
      } catch (err) {
        alert('Invalid file format. Please import a valid Artverlay JSON project.');
      }
    };
    reader.readAsText(file);
  };

  const selectedLayer = layers.find(l => l.id === selectedLayerId);

  return (
    <div className="app-container">
      
      {/* HEADER NAVBAR */}
      <header className="app-header">
        {/* LOGO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'var(--brutal-yellow)',
            color: '#000',
            border: '3px solid #000',
            padding: '6px 14px',
            fontFamily: 'var(--font-art)',
            fontWeight: '900',
            fontSize: '22px',
            letterSpacing: '1px',
            transform: 'rotate(-2deg)',
            boxShadow: '3px 3px 0px #000'
          }}>
            ARTVERLAY ✦
          </div>
          <span className="app-logo-sub">
            HTML Overlay Art Studio
          </span>
        </div>

        {/* TOP CONTROLS & TEMPLATE SELECTOR */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: '#aaa' }}>Preset:</span>
            <select
              value={selectedTemplateId}
              onChange={handleLoadTemplate}
              className="neo-select"
              style={{
                width: '180px',
                borderWidth: '3px',
                background: 'var(--brutal-dark)',
                fontSize: '13px',
                padding: '6px 10px',
                cursor: 'pointer'
              }}
            >
              {ART_TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
              <option value="custom">✦ Custom Artwork ✦</option>
            </select>
          </div>

          <NeoButton 
            onClick={() => setShowHelp(!showHelp)} 
            color="white"
            style={{ padding: '6px 12px', fontSize: '12px', borderWidth: '3px' }}
            icon={<HelpCircle size={14} />}
          >
            How it works
          </NeoButton>
        </div>
      </header>

      {/* CORE CONTENT LAYOUT GRID */}
      <main 
        className="app-main-grid"
        style={{
          '--left-panel-width': leftCollapsed ? '50px' : '320px',
          '--right-panel-width': rightCollapsed ? '50px' : '360px'
        }}
      >
        
        {/* PANEL 1: LAYERS PANEL (LEFT - DESKTOP ONLY) */}
        {!isMobile && (
          leftCollapsed ? (
            <section 
              onClick={() => setLeftCollapsed(false)}
              style={{
                background: 'var(--brutal-yellow)',
                border: '4px solid #000',
                boxShadow: '4px 4px 0px #000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                padding: '20px 0',
                cursor: 'pointer',
                height: '100%',
                overflow: 'hidden',
                boxSizing: 'border-box'
              }}
              title="Click to Expand Left Panel"
            >
              <div style={{
                background: '#000',
                color: '#fff',
                border: '2px solid #000',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                ❯
              </div>
              <div style={{
                writingMode: 'vertical-rl',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-heading)',
                fontWeight: '900',
                letterSpacing: '2px',
                fontSize: '12.5px',
                color: '#000',
                transform: 'rotate(180deg)',
                userSelect: 'none'
              }}>
                ✦ LAYERS INDEX ✦
              </div>
            </section>
          ) : (
            <section className="app-column" style={{ position: 'relative', height: '100%' }}>
              <button
                onClick={() => setLeftCollapsed(true)}
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '-10px',
                  zIndex: 50,
                  background: 'var(--brutal-yellow)',
                  color: '#000',
                  border: '3px solid #000',
                  width: '24px',
                  height: '24px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '2px 2px 0px #000',
                  fontSize: '11px',
                  borderRadius: '0'
                }}
                title="Collapse Sidebar"
              >
                ❮
              </button>
              <LayerList
                layers={layers}
                selectedLayerId={selectedLayerId}
                onSelectLayer={handleSelectLayer}
                onAddLayer={handleAddLayer}
                onDeleteLayer={handleDeleteLayer}
                onCloneLayer={handleCloneLayer}
                onToggleVisibility={handleToggleVisibility}
                onReorderLayers={handleReorderLayers}
                onRenameLayer={handleRenameLayer}
              />
            </section>
          )
        )}

        {/* PANEL 2: INTERACTIVE PREVIEW & STYLING CANVAS (CENTER - ALWAYS VISIBLE) */}
        <section className="app-column sticky-canvas" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* HELP DOCUMENTATION OVERLAY */}
          {showHelp && (
            <div className="neo-card pink" style={{ position: 'relative', borderSize: '4px', zIndex: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '18px', color: '#000', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Info size={18} /> How Artverlay Works
                </h3>
                <button 
                  onClick={() => setShowHelp(false)}
                  style={{
                    background: '#000',
                    color: '#fff',
                    border: '2px solid #000',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    padding: '2px 8px',
                    cursor: 'pointer'
                  }}
                >
                  X Close
                </button>
              </div>
              <ul style={{ color: '#000', fontSize: '13px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', lineHeight: '1.4' }}>
                <li><strong>HTML Layering</strong>: Write standard divs, spans, or inline SVG elements. They stack seamlessly based on their list order (top-most in list sits on top).</li>
                <li><strong>Scoped CSS</strong>: Write styling declarations inside the Custom CSS panel. Artverlay automatically wraps and prefixes your styles so they don't affect other elements.</li>
                <li><strong>Visual Controllers</strong>: Use the sliders to quickly apply scale, opacity, translations, and CSS filters (blur, color-rotate).</li>
                <li><strong>Touch & Mouse Dragging</strong>: Click or tap-hold and drag directly on the canvas selection box to position layers, or drag the yellow corner resize handle!</li>
                <li><strong>Export & Share</strong>: Download your masterpiece as a completely self-contained interactive HTML file that retains animations and mouse parallax, or capture a PNG print!</li>
              </ul>
            </div>
          )}

          {/* DESKTOP DRAGGABLE TOOLBAR / TOOLBOX (DESKTOP ONLY) */}
          {!isMobile && (
            <div className="neo-card" style={{
              padding: '12px',
              backgroundColor: 'var(--brutal-yellow)',
              color: '#000',
              borderWidth: '4px',
              boxShadow: '4px 4px 0px #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  background: '#000',
                  color: '#fff',
                  padding: '4px 8px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '11px',
                  fontWeight: '900',
                  textTransform: 'uppercase'
                }}>
                  Toolbox
                </span>
                <span style={{ fontSize: '11px', fontWeight: 'bold' }}>
                  Drag a shape onto the canvas:
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { type: 'brutal-box', label: 'Badge', icon: '⧠', bg: 'var(--brutal-pink)' },
                  { type: 'circle', label: 'Circle', icon: '🟢', bg: 'var(--brutal-cyan)' },
                  { type: 'square', label: 'Square', icon: '🟦', bg: 'var(--brutal-green)' },
                  { type: 'triangle', label: 'Triangle', icon: '🔺', bg: 'var(--brutal-yellow)' },
                  { type: 'star', label: 'Star', icon: '⭐', bg: 'var(--brutal-purple)' },
                  { type: 'table', label: 'Grid Table', icon: '⊞', bg: 'var(--brutal-orange)' },
                  { type: 'none', label: 'Text Only', icon: '🅣', bg: '#fff' }
                ].map((item) => (
                  <div
                    key={item.type}
                    draggable="true"
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', item.type);
                      e.dataTransfer.effectAllowed = 'copy';
                    }}
                    style={{
                      backgroundColor: item.bg,
                      color: '#000',
                      border: '2.5px solid #000',
                      padding: '4px 10px',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '11px',
                      fontWeight: '800',
                      cursor: 'grab',
                      userSelect: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '2px 2px 0px #000',
                      transition: 'transform 0.1s'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'translate(-1px, -1px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'none'}
                    title="Drag me onto the canvas!"
                  >
                    <span style={{ fontSize: '12px' }}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MAIN CANVAS */}
          <div className="neo-card" style={{ padding: '10px', display: 'flex', flexDirection: 'column', background: 'var(--brutal-dark-card)' }}>
            {/* CANVAS VIEWPORT FRAME */}
            <div style={{
              overflow: 'auto',
              width: '100%',
              minHeight: isMobile ? '300px' : '380px',
              maxHeight: isMobile ? '400px' : '520px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: isMobile ? '12px' : '40px',
              background: '#0d0d11',
              border: '4px solid #000',
              boxShadow: 'inset 4px 4px 10px rgba(0,0,0,0.8)',
              position: 'relative',
              marginBottom: '12px'
            }}>
              <div style={{
                transform: `scale(${canvasZoom / 100})`,
                transformOrigin: 'center center',
                transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Canvas
                  layers={layers}
                  selectedLayerId={selectedLayerId}
                  canvasBg={canvasBg}
                  aspectRatio={aspectRatio}
                  parallaxEnabled={parallaxEnabled}
                  canvasRef={canvasRef}
                  zoom={canvasZoom}
                  onLayerChange={handleLayerChange}
                  onVisualConfigChange={handleLayerVisualConfigChange}
                  onDropShape={handleDropShape}
                />
              </div>
            </div>
            
            {/* CANVAS CONTROLS */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              borderTop: '3px solid #000',
              paddingTop: '12px',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              {/* Aspect Ratio & Parallax Toggle */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Layout size={16} style={{ color: 'var(--brutal-yellow)' }} />
                  <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Aspect:</span>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    className="neo-select"
                    style={{ width: '80px', padding: '2px 4px', fontSize: '11px', borderWidth: '2px' }}
                  >
                    <option value="1:1">1:1 Sq</option>
                    <option value="16:9">16:9 W</option>
                    <option value="9:16">9:16 P</option>
                  </select>
                </div>

                <div 
                  className="neo-switch-container" 
                  onClick={() => setParallaxEnabled(!parallaxEnabled)}
                  style={{ marginBottom: 0 }}
                >
                  <div className={`neo-switch ${parallaxEnabled ? 'active' : ''}`} style={{ width: '38px', height: '20px' }}>
                    <div className="neo-switch-handle" style={{ width: '12px', height: '12px', transform: parallaxEnabled ? 'translateX(18px)' : 'none' }}></div>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MousePointer size={13} /> Parallax
                  </span>
                </div>

                {/* Canvas Zoom Slider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ZoomIn size={15} style={{ color: 'var(--brutal-pink)' }} />
                  <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Zoom:</span>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    step="5"
                    value={canvasZoom}
                    onChange={(e) => setCanvasZoom(parseInt(e.target.value))}
                    className="neo-slider"
                    style={{ width: '80px', height: '10px' }}
                  />
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    background: '#000',
                    color: 'var(--brutal-pink)',
                    padding: '1px 5px',
                    border: '1.5px solid #000',
                    minWidth: '40px',
                    textAlign: 'center'
                  }}>
                    {canvasZoom}%
                  </span>
                </div>
              </div>

              {/* Canvas Background Input */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Canvas BG:</span>
                <input
                  type="text"
                  value={canvasBg}
                  onChange={(e) => setCanvasBg(e.target.value)}
                  className="neo-input"
                  style={{ width: '150px', padding: '3px 6px', fontSize: '11px', borderWidth: '2px', fontFamily: 'var(--font-mono)' }}
                  placeholder="color or linear-gradient"
                />
              </div>
            </div>
          </div>

          {/* MOBILE TABS SWITCHER (MOBILE ONLY) */}
          {isMobile && (
            <div style={{
              display: 'flex',
              border: '4px solid #000',
              backgroundColor: '#000',
              boxShadow: '4px 4px 0px #000',
              overflowX: 'auto',
              whiteSpace: 'nowrap'
            }}>
              {[
                { id: 'layers', label: '🥞 Layers', bg: 'var(--brutal-yellow)' },
                { id: 'sliders', label: '🎛️ Sliders', bg: 'var(--brutal-purple)' },
                { id: 'code', label: '💻 CSS Code', bg: 'var(--brutal-cyan)' },
                { id: 'exports', label: '📦 Exports & Tools', bg: 'var(--brutal-pink)' }
              ].map((tab) => {
                const isActive = activeMobileTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveMobileTab(tab.id)}
                    style={{
                      flex: 1,
                      padding: '12px 8px',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: '800',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      border: 'none',
                      borderRight: tab.id !== 'exports' ? '3px solid #000' : 'none',
                      backgroundColor: isActive ? tab.bg : 'var(--brutal-dark-card)',
                      color: isActive ? '#000' : '#fff',
                      transition: 'all 0.1s',
                      outline: 'none',
                      minWidth: '95px'
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* MOBILE CONDITIONAL PANEL RENDER (MOBILE ONLY) */}
          {isMobile && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {activeMobileTab === 'layers' && (
                <LayerList
                  layers={layers}
                  selectedLayerId={selectedLayerId}
                  onSelectLayer={handleSelectLayer}
                  onAddLayer={handleAddLayer}
                  onDeleteLayer={handleDeleteLayer}
                  onCloneLayer={handleCloneLayer}
                  onToggleVisibility={handleToggleVisibility}
                  onReorderLayers={handleReorderLayers}
                  onRenameLayer={handleRenameLayer}
                />
              )}

              {activeMobileTab === 'sliders' && selectedLayer && (
                <div className="neo-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <VisualSliders
                    layer={selectedLayer}
                    onChange={handleLayerChange}
                    onVisualConfigChange={handleLayerVisualConfigChange}
                    onToggleCustomCode={handleToggleCustomCode}
                  />
                </div>
              )}

              {activeMobileTab === 'sliders' && !selectedLayer && (
                <div className="neo-card" style={{ padding: '30px', textAlign: 'center', color: '#888', fontStyle: 'italic', border: '3px dashed #000' }}>
                  Select or create a layer to start designing!
                </div>
              )}

              {activeMobileTab === 'code' && selectedLayer && (
                <div className="neo-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <CodeEditor
                    layer={selectedLayer}
                    onChange={handleLayerChange}
                  />
                </div>
              )}

              {activeMobileTab === 'code' && !selectedLayer && (
                <div className="neo-card" style={{ padding: '30px', textAlign: 'center', color: '#888', fontStyle: 'italic', border: '3px dashed #000' }}>
                  Select or create a layer to start designing!
                </div>
              )}

              {activeMobileTab === 'exports' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Shape Tap-To-Add Toolbox Card */}
                  <div className="neo-card" style={{
                    padding: '12px',
                    backgroundColor: 'var(--brutal-yellow)',
                    color: '#000',
                    borderWidth: '4px',
                    boxShadow: '4px 4px 0px #000',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        background: '#000',
                        color: '#fff',
                        padding: '4px 8px',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '11px',
                        fontWeight: '900',
                        textTransform: 'uppercase'
                      }}>
                        Toolbox
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: 'bold' }}>
                        Tap a shape button to add to canvas center:
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {[
                        { type: 'brutal-box', label: 'Badge', icon: '⧠', bg: 'var(--brutal-pink)' },
                        { type: 'circle', label: 'Circle', icon: '🟢', bg: 'var(--brutal-cyan)' },
                        { type: 'square', label: 'Square', icon: '🟦', bg: 'var(--brutal-green)' },
                        { type: 'triangle', label: 'Triangle', icon: '🔺', bg: 'var(--brutal-yellow)' },
                        { type: 'star', label: 'Star', icon: '⭐', bg: 'var(--brutal-purple)' },
                        { type: 'table', label: 'Grid Table', icon: '⊞', bg: 'var(--brutal-orange)' },
                        { type: 'none', label: 'Text Only', icon: '🅣', bg: '#fff' }
                      ].map((item) => (
                        <button
                          key={item.type}
                          onClick={() => {
                            handleDropShape(item.type, 0, 0);
                            setActiveMobileTab('layers'); // focus back to layers so they see the selection
                          }}
                          style={{
                            backgroundColor: item.bg,
                            color: '#000',
                            border: '2.5px solid #000',
                            padding: '6px 12px',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '11px',
                            fontWeight: '800',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            boxShadow: '2px 2px 0px #000',
                            transition: 'transform 0.1s',
                            outline: 'none'
                          }}
                        >
                          <span style={{ fontSize: '12px' }}>{item.icon}</span>
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Exports card */}
                  <div className="neo-card yellow" style={{ 
                    color: '#000', 
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: '#000', borderBottom: '2px solid #000', paddingBottom: '4px' }}>
                      ✦ Export Masterpiece ✦
                    </h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                      <NeoButton
                        onClick={handleExportHtml}
                        color="pink"
                        style={{ fontSize: '11px', padding: '8px', height: '40px' }}
                        icon={<FileCode size={14} />}
                      >
                        Single HTML File
                      </NeoButton>

                      <NeoButton
                        onClick={handleExportPng}
                        color="cyan"
                        style={{ fontSize: '11px', padding: '8px', height: '40px' }}
                        icon={<ImageIcon size={14} />}
                      >
                        PNG Image
                      </NeoButton>

                      <NeoButton
                        onClick={handleExportJson}
                        color="white"
                        style={{ fontSize: '11px', padding: '8px', height: '40px' }}
                        icon={<Download size={14} />}
                      >
                        Project JSON
                      </NeoButton>

                      {/* Import JSON button wrapper */}
                      <label 
                        className="neo-btn green" 
                        style={{ 
                          fontSize: '11px', 
                          padding: '8px', 
                          height: '40px', 
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          margin: 0
                        }}
                      >
                        <FolderOpen size={14} />
                        <span>Import JSON</span>
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportJson}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* DESKTOP EXPORTS ACTION PANEL (DESKTOP ONLY) */}
          {!isMobile && (
            <div className="neo-card yellow" style={{ 
              color: '#000', 
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: '#000', borderBottom: '2px solid #000', paddingBottom: '4px' }}>
                ✦ Export Masterpiece ✦
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                <NeoButton
                  onClick={handleExportHtml}
                  color="pink"
                  style={{ fontSize: '12px', padding: '10px', height: '40px' }}
                  icon={<FileCode size={14} />}
                >
                  Single HTML File
                </NeoButton>

                <NeoButton
                  onClick={handleExportPng}
                  color="cyan"
                  style={{ fontSize: '12px', padding: '10px', height: '40px' }}
                  icon={<ImageIcon size={14} />}
                >
                  PNG Image
                </NeoButton>

                <NeoButton
                  onClick={handleExportJson}
                  color="white"
                  style={{ fontSize: '12px', padding: '10px', height: '40px' }}
                  icon={<Download size={14} />}
                >
                  Project JSON
                </NeoButton>

                {/* Import JSON button wrapper */}
                <label 
                  className="neo-btn green" 
                  style={{ 
                    fontSize: '12px', 
                    padding: '10px', 
                    height: '40px', 
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    margin: 0
                  }}
                >
                  <FolderOpen size={14} />
                  <span>Import JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJson}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>
          )}
        </section>

        {/* PANEL 3: HYBRID EDITOR: SLIDERS & CODE (RIGHT - DESKTOP ONLY) */}
        {!isMobile && (
          rightCollapsed ? (
            <section 
              onClick={() => setRightCollapsed(false)}
              style={{
                background: 'var(--brutal-pink)',
                border: '4px solid #000',
                boxShadow: '4px 4px 0px #000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                padding: '20px 0',
                cursor: 'pointer',
                height: '100%',
                overflow: 'hidden',
                boxSizing: 'border-box'
              }}
              title="Click to Expand Right Panel"
            >
              <div style={{
                background: '#000',
                color: '#fff',
                border: '2px solid #000',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                ❮
              </div>
              <div style={{
                writingMode: 'vertical-rl',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-heading)',
                fontWeight: '900',
                letterSpacing: '2px',
                fontSize: '12.5px',
                color: '#000',
                transform: 'rotate(180deg)',
                userSelect: 'none'
              }}>
                ✦ DESIGN EDITOR ✦
              </div>
            </section>
          ) : (
            <section className="app-column" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <button
                onClick={() => setRightCollapsed(true)}
                style={{
                  position: 'absolute',
                  top: '18px',
                  left: '-10px',
                  zIndex: 50,
                  background: 'var(--brutal-pink)',
                  color: '#000',
                  border: '3px solid #000',
                  width: '24px',
                  height: '24px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '2px 2px 0px #000',
                  fontSize: '11px',
                  borderRadius: '0'
                }}
                title="Collapse Sidebar"
              >
                ❯
              </button>
              {selectedLayer ? (
                <>
                  {/* SLIDERS CARD */}
                  <div className="neo-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <VisualSliders
                      layer={selectedLayer}
                      onChange={handleLayerChange}
                      onVisualConfigChange={handleLayerVisualConfigChange}
                      onToggleCustomCode={handleToggleCustomCode}
                    />
                  </div>

                  {/* CODE CARD */}
                  <div className="neo-card" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <CodeEditor
                      layer={selectedLayer}
                      onChange={handleLayerChange}
                    />
                  </div>
                </>
              ) : (
                <div className="neo-card" style={{ padding: '30px', textAlign: 'center', color: '#888', fontStyle: 'italic', border: '3px dashed #000' }}>
                  Select or create a layer to start designing!
                </div>
              )}
            </section>
          )
        )}

      </main>
    </div>
  );
}
