import React, { useState } from 'react';
import { 
  Sliders, 
  Sparkles, 
  Palette, 
  Activity, 
  ChevronDown, 
  ChevronRight,
  Maximize2,
  Minimize2,
  Shapes
} from 'lucide-react';

const BLEND_MODES = [
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity'
];

const BORDER_STYLES = [
  'solid',
  'dashed',
  'dotted',
  'double',
  'groove',
  'ridge',
  'none'
];

const FONTS_LIST = [
  'Space Grotesk',
  'Lexend',
  'Syne',
  'Space Mono',
  'sans-serif'
];

const SHAPE_TYPES = [
  { value: 'brutal-box', label: '✦ Brutalist Badge' },
  { value: 'circle', label: '🔴 Circle Shape' },
  { value: 'square', label: '🟦 Square / Box' },
  { value: 'triangle', label: '🔺 Triangle' },
  { value: 'star', label: '⭐ Cyber Star' },
  { value: 'table', label: '⊞ Grid Table' },
  { value: 'none', label: '🅣 Text Only' }
];

export default function VisualSliders({ 
  layer, 
  onChange,
  onVisualConfigChange
}) {
  const [sections, setSections] = useState({
    shape: true, // open by default for high visual friendly usage
    layout: true,
    filters: false,
    decorations: false,
    parallax: false
  });

  if (!layer) {
    return (
      <div style={{ textAlign: 'center', padding: '24px', color: '#888', fontStyle: 'italic' }}>
        Select a layer to adjust settings.
      </div>
    );
  }

  const toggleSection = (sec) => {
    setSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  const handleSliderChange = (field, value) => {
    onChange(layer.id, { [field]: value });
  };

  const handleVisualConfigChange = (field, value) => {
    if (onVisualConfigChange) {
      onVisualConfigChange(layer.id, { [field]: value });
    }
  };

  // Safe fallback getter for shape WYSIWYG
  const vConfig = layer.visualConfig || {
    shape: 'none',
    text: layer.name || '',
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

  // Safe fallback getters
  const scaleX = layer.scaleX ?? layer.scale ?? 1.0;
  const scaleY = layer.scaleY ?? layer.scale ?? 1.0;
  const rotate = layer.rotate ?? 0;
  const skewX = layer.skewX ?? 0;
  const skewY = layer.skewY ?? 0;
  const translateX = layer.translateX ?? 0;
  const translateY = layer.translateY ?? 0;

  const opacity = layer.opacity ?? 100;
  const blur = layer.blur ?? 0;
  const hueRotate = layer.hueRotate ?? 0;
  const brightness = layer.brightness ?? 100;
  const contrast = layer.contrast ?? 100;
  const grayscale = layer.grayscale ?? 0;
  const saturate = layer.saturate ?? 100;
  const invert = layer.invert ?? 0;
  const sepia = layer.sepia ?? 0;

  const padding = layer.padding ?? 0;
  const wrapperBg = layer.wrapperBg ?? 'transparent';
  const borderWidth = layer.borderWidth ?? 0;
  const borderColor = layer.borderColor ?? '#000000';
  const borderStyle = layer.borderStyle ?? 'solid';
  const borderRadius = layer.borderRadius ?? 0;
  const shadowOffsetX = layer.shadowOffsetX ?? 0;
  const shadowOffsetY = layer.shadowOffsetY ?? 0;
  const shadowBlur = layer.shadowBlur ?? 0;
  const shadowColor = layer.shadowColor ?? '#000000';

  const parallaxFactor = layer.parallaxFactor ?? 0;
  const mixBlendMode = layer.mixBlendMode ?? 'normal';

  // Section Header Renderer Helper
  const renderHeader = (id, title, icon, color) => {
    const isOpen = sections[id];
    return (
      <div 
        onClick={() => toggleSection(id)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: isOpen ? color : 'var(--brutal-dark-card)',
          color: isOpen ? '#000' : '#fff',
          border: '3px solid #000',
          padding: '8px 12px',
          cursor: 'pointer',
          userSelect: 'none',
          boxShadow: isOpen ? '2px 2px 0px #000' : '4px 4px 0px #000',
          transition: 'all 0.1s',
          transform: isOpen ? 'translate(2px, 2px)' : 'none'
        }}
      >
        <span style={{ 
          fontFamily: 'var(--font-heading)', 
          fontWeight: '800', 
          fontSize: '12.5px', 
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {icon}
          {title}
        </span>
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

      {/* SECTION 0: BASE SHAPE GENERATOR (WYSIWYG) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {renderHeader('shape', '0. Shape Generator (WYSIWYG)', <Shapes size={14} />, 'var(--brutal-purple)')}
        
        {sections.shape && (
          <div style={{ 
            border: '3px solid #000', 
            borderTop: 'none',
            padding: '14px', 
            background: 'rgba(255,255,255,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginTop: '-8px'
          }}>
            {/* SUB-CATEGORY 1: SHAPE & TEXT */}
            <div style={{ border: '2px solid var(--brutal-purple)', padding: '10px', background: 'rgba(167,139,250,0.04)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '10px', color: 'var(--brutal-purple)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                ✦ 1. Shape & Text Content
              </span>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label className="neo-slider-label"><span>Shape Type</span></label>
                <select 
                  value={vConfig.shape} 
                  onChange={(e) => handleVisualConfigChange('shape', e.target.value)} 
                  className="neo-select" 
                  style={{ borderWidth: '2px', fontSize: '11px', padding: '6px' }}
                >
                  {SHAPE_TYPES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label className="neo-slider-label"><span>Display Text</span></label>
                <input 
                  type="text" 
                  value={vConfig.text} 
                  onChange={(e) => handleVisualConfigChange('text', e.target.value)} 
                  className="neo-input" 
                  style={{ borderWidth: '2px', padding: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}
                  placeholder="e.g. TEXT ART ✦" 
                />
              </div>
            </div>

            {/* SUB-CATEGORY 2: COLORS & TYPOGRAPHY */}
            <div style={{ border: '2px solid var(--brutal-pink)', padding: '10px', background: 'rgba(255,107,157,0.04)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '10px', color: 'var(--brutal-pink)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                ✦ 2. Colors & Typography
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label className="neo-slider-label"><span>Font Style</span></label>
                  <select 
                    value={vConfig.fontFamily} 
                    onChange={(e) => handleVisualConfigChange('fontFamily', e.target.value)} 
                    className="neo-select" 
                    style={{ borderWidth: '2px', fontSize: '11.5px', padding: '5px' }}
                  >
                    {FONTS_LIST.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div className="neo-slider-container" style={{ marginBottom: 0 }}>
                  <div className="neo-slider-label"><span>Font Size</span><span>{vConfig.fontSize}px</span></div>
                  <input 
                    type="range" 
                    min="10" 
                    max="80" 
                    value={vConfig.fontSize} 
                    onChange={(e) => handleVisualConfigChange('fontSize', parseInt(e.target.value))} 
                    className="neo-slider" 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label className="neo-slider-label"><span>Text Color</span></label>
                  <input 
                    type="color" 
                    value={vConfig.textColor} 
                    onChange={(e) => handleVisualConfigChange('textColor', e.target.value)} 
                    style={{ width: '100%', height: '30px', border: '2px solid #000', cursor: 'pointer', background: 'none', padding: 0 }} 
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label className="neo-slider-label"><span>Inner Bg Color</span></label>
                  <input 
                    type="color" 
                    value={vConfig.bgColor} 
                    onChange={(e) => handleVisualConfigChange('bgColor', e.target.value)} 
                    style={{ width: '100%', height: '30px', border: '2px solid #000', cursor: 'pointer', background: 'none', padding: 0 }} 
                  />
                </div>
              </div>
            </div>

            {/* SUB-CATEGORY 3: SHAPE BORDERS, SHADOW & GRID */}
            <div style={{ border: '2px solid var(--brutal-green)', padding: '10px', background: 'rgba(74,222,128,0.04)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '10px', color: 'var(--brutal-green)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                ✦ 3. Shape Borders & Shadows
              </span>

              <div className="neo-slider-container" style={{ marginBottom: 0 }}>
                <div className="neo-slider-label"><span>Border Width</span><span>{vConfig.borderWidth}px</span></div>
                <input 
                  type="range" 
                  min="0" 
                  max="20" 
                  value={vConfig.borderWidth} 
                  onChange={(e) => handleVisualConfigChange('borderWidth', parseInt(e.target.value))} 
                  className="neo-slider" 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label className="neo-slider-label"><span>Border Color</span></label>
                  <input 
                    type="color" 
                    value={vConfig.borderColor} 
                    onChange={(e) => handleVisualConfigChange('borderColor', e.target.value)} 
                    style={{ width: '100%', height: '30px', border: '2px solid #000', cursor: 'pointer', background: 'none', padding: 0 }} 
                  />
                </div>
                <div className="neo-slider-container" style={{ marginBottom: 0 }}>
                  <div className="neo-slider-label"><span>Corner Radius</span><span>{vConfig.borderRadius}px</span></div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={vConfig.borderRadius} 
                    onChange={(e) => handleVisualConfigChange('borderRadius', parseInt(e.target.value))} 
                    className="neo-slider" 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="neo-slider-container" style={{ marginBottom: 0 }}>
                  <div className="neo-slider-label"><span>Shadow Offset</span><span>{vConfig.shadowOffset}px</span></div>
                  <input 
                    type="range" 
                    min="0" 
                    max="30" 
                    value={vConfig.shadowOffset} 
                    onChange={(e) => handleVisualConfigChange('shadowOffset', parseInt(e.target.value))} 
                    className="neo-slider" 
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label className="neo-slider-label"><span>Shadow Color</span></label>
                  <input 
                    type="color" 
                    value={vConfig.shadowColor} 
                    onChange={(e) => handleVisualConfigChange('shadowColor', e.target.value)} 
                    style={{ width: '100%', height: '30px', border: '2px solid #000', cursor: 'pointer', background: 'none', padding: 0 }} 
                  />
                </div>
              </div>

              {/* Conditional Grid Table configurations */}
              {(vConfig.shape === 'table' || vConfig.shape === 'grid') && (
                <div style={{ border: '2.5px dashed var(--brutal-orange)', padding: '10px', background: 'rgba(255,126,71,0.05)', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
                  <span style={{ fontSize: '10px', color: 'var(--brutal-orange)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    ⊞ Table Grid Details
                  </span>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div className="neo-slider-container" style={{ marginBottom: 0 }}>
                      <div className="neo-slider-label"><span>Rows</span><span>{vConfig.rows ?? 3}</span></div>
                      <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        value={vConfig.rows ?? 3} 
                        onChange={(e) => handleVisualConfigChange('rows', parseInt(e.target.value))} 
                        className="neo-slider" 
                      />
                    </div>
                    <div className="neo-slider-container" style={{ marginBottom: 0 }}>
                      <div className="neo-slider-label"><span>Cols</span><span>{vConfig.cols ?? 3}</span></div>
                      <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        value={vConfig.cols ?? 3} 
                        onChange={(e) => handleVisualConfigChange('cols', parseInt(e.target.value))} 
                        className="neo-slider" 
                      />
                    </div>
                  </div>

                  <div className="neo-slider-container" style={{ marginBottom: 0 }}>
                    <div className="neo-slider-label"><span>Cell Gap</span><span>{vConfig.gridGap ?? 8}px</span></div>
                    <input 
                      type="range" 
                      min="0" 
                      max="40" 
                      value={vConfig.gridGap ?? 8} 
                      onChange={(e) => handleVisualConfigChange('gridGap', parseInt(e.target.value))} 
                      className="neo-slider" 
                    />
                  </div>
                </div>
              )}
            </div>

          </div>
        )}
      </div>

      {/* SECTION 1: LAYOUT & TRANSFORMS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {renderHeader('layout', '1. Layout & Transforms', <Sliders size={14} />, 'var(--brutal-yellow)')}
        
        {sections.layout && (
          <div style={{ 
            border: '3px solid #000', 
            borderTop: 'none',
            padding: '14px', 
            background: 'rgba(255,255,255,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '-8px'
          }}>
            {/* Scale X */}
            <div className="neo-slider-container">
              <div className="neo-slider-label"><span>Width Scale (Scale X)</span><span>x{scaleX.toFixed(2)}</span></div>
              <input type="range" min="0.1" max="3.0" step="0.05" value={scaleX} onChange={(e) => handleSliderChange('scaleX', parseFloat(e.target.value))} className="neo-slider" />
            </div>

            {/* Scale Y */}
            <div className="neo-slider-container">
              <div className="neo-slider-label"><span>Height Scale (Scale Y)</span><span>x{scaleY.toFixed(2)}</span></div>
              <input type="range" min="0.1" max="3.0" step="0.05" value={scaleY} onChange={(e) => handleSliderChange('scaleY', parseFloat(e.target.value))} className="neo-slider" />
            </div>

            {/* Rotation */}
            <div className="neo-slider-container">
              <div className="neo-slider-label"><span>Rotation Angle</span><span>{rotate}°</span></div>
              <input type="range" min="-180" max="180" value={rotate} onChange={(e) => handleSliderChange('rotate', parseInt(e.target.value))} className="neo-slider" />
            </div>

            {/* Skew X & Skew Y */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="neo-slider-container" style={{ marginBottom: 0 }}>
                <div className="neo-slider-label"><span>Skew X</span><span>{skewX}°</span></div>
                <input type="range" min="-45" max="45" value={skewX} onChange={(e) => handleSliderChange('skewX', parseInt(e.target.value))} className="neo-slider" />
              </div>
              <div className="neo-slider-container" style={{ marginBottom: 0 }}>
                <div className="neo-slider-label"><span>Skew Y</span><span>{skewY}°</span></div>
                <input type="range" min="-45" max="45" value={skewY} onChange={(e) => handleSliderChange('skewY', parseInt(e.target.value))} className="neo-slider" />
              </div>
            </div>

            {/* Offset X */}
            <div className="neo-slider-container">
              <div className="neo-slider-label"><span>Translate X (Horizontal)</span><span>{translateX}px</span></div>
              <input type="range" min="-300" max="300" value={translateX} onChange={(e) => handleSliderChange('translateX', parseInt(e.target.value))} className="neo-slider" />
            </div>

            {/* Offset Y */}
            <div className="neo-slider-container">
              <div className="neo-slider-label"><span>Translate Y (Vertical)</span><span>{translateY}px</span></div>
              <input type="range" min="-300" max="300" value={translateY} onChange={(e) => handleSliderChange('translateY', parseInt(e.target.value))} className="neo-slider" />
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: CSS COLOR FILTERS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {renderHeader('filters', '2. CSS Color Filters', <Sparkles size={14} />, 'var(--brutal-pink)')}
        
        {sections.filters && (
          <div style={{ 
            border: '3px solid #000', 
            borderTop: 'none',
            padding: '14px', 
            background: 'rgba(255,255,255,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '-8px'
          }}>
            {/* Opacity */}
            <div className="neo-slider-container">
              <div className="neo-slider-label"><span>Opacity</span><span>{opacity}%</span></div>
              <input type="range" min="0" max="100" value={opacity} onChange={(e) => handleSliderChange('opacity', parseInt(e.target.value))} className="neo-slider" />
            </div>

            {/* Blur */}
            <div className="neo-slider-container">
              <div className="neo-slider-label"><span>Blur Filter</span><span>{blur}px</span></div>
              <input type="range" min="0" max="40" value={blur} onChange={(e) => handleSliderChange('blur', parseInt(e.target.value))} className="neo-slider" />
            </div>

            {/* Hue Rotate */}
            <div className="neo-slider-container">
              <div className="neo-slider-label"><span>Hue Rotation</span><span>{hueRotate}°</span></div>
              <input type="range" min="0" max="360" value={hueRotate} onChange={(e) => handleSliderChange('hueRotate', parseInt(e.target.value))} className="neo-slider" />
            </div>

            {/* Brightness */}
            <div className="neo-slider-container">
              <div className="neo-slider-label"><span>Brightness</span><span>{brightness}%</span></div>
              <input type="range" min="0" max="200" value={brightness} onChange={(e) => handleSliderChange('brightness', parseInt(e.target.value))} className="neo-slider" />
            </div>

            {/* Contrast */}
            <div className="neo-slider-container">
              <div className="neo-slider-label"><span>Contrast</span><span>{contrast}%</span></div>
              <input type="range" min="0" max="200" value={contrast} onChange={(e) => handleSliderChange('contrast', parseInt(e.target.value))} className="neo-slider" />
            </div>

            {/* Grayscale */}
            <div className="neo-slider-container">
              <div className="neo-slider-label"><span>Grayscale</span><span>{grayscale}%</span></div>
              <input type="range" min="0" max="100" value={grayscale} onChange={(e) => handleSliderChange('grayscale', parseInt(e.target.value))} className="neo-slider" />
            </div>

            {/* Saturation */}
            <div className="neo-slider-container">
              <div className="neo-slider-label"><span>Saturate</span><span>{saturate}%</span></div>
              <input type="range" min="0" max="300" value={saturate} onChange={(e) => handleSliderChange('saturate', parseInt(e.target.value))} className="neo-slider" />
            </div>

            {/* Invert */}
            <div className="neo-slider-container">
              <div className="neo-slider-label"><span>Invert Colors</span><span>{invert}%</span></div>
              <input type="range" min="0" max="100" value={invert} onChange={(e) => handleSliderChange('invert', parseInt(e.target.value))} className="neo-slider" />
            </div>

            {/* Sepia */}
            <div className="neo-slider-container">
              <div className="neo-slider-label"><span>Sepia</span><span>{sepia}%</span></div>
              <input type="range" min="0" max="100" value={sepia} onChange={(e) => handleSliderChange('sepia', parseInt(e.target.value))} className="neo-slider" />
            </div>
          </div>
        )}
      </div>

      {/* SECTION 3: WRAPPER DECORATIONS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {renderHeader('decorations', '3. Borders & Backgrounds', <Palette size={14} />, 'var(--brutal-green)')}
        
        {sections.decorations && (
          <div style={{ 
            border: '3px solid #000', 
            borderTop: 'none',
            padding: '14px', 
            background: 'rgba(255,255,255,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '-8px'
          }}>
            {/* Wrapper Padding */}
            <div className="neo-slider-container">
              <div className="neo-slider-label"><span>Wrapper Padding</span><span>{padding}px</span></div>
              <input type="range" min="0" max="80" value={padding} onChange={(e) => handleSliderChange('padding', parseInt(e.target.value))} className="neo-slider" />
            </div>

            {/* Wrapper Background */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label className="neo-slider-label"><span>Wrapper Bg (Color or Gradient)</span></label>
              <input 
                type="text" 
                value={wrapperBg} 
                onChange={(e) => handleSliderChange('wrapperBg', e.target.value)} 
                className="neo-input" 
                style={{ borderWidth: '2px', padding: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}
                placeholder="transparent / #ff007f / gradient" 
              />
            </div>

            {/* Borders */}
            <div style={{ border: '2px dashed #444', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '10px', color: 'var(--brutal-green)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Border Decoration
              </span>
              <div className="neo-slider-container" style={{ marginBottom: 0 }}>
                <div className="neo-slider-label"><span>Border Width</span><span>{borderWidth}px</span></div>
                <input type="range" min="0" max="24" value={borderWidth} onChange={(e) => handleSliderChange('borderWidth', parseInt(e.target.value))} className="neo-slider" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label className="neo-slider-label"><span>Border Color</span></label>
                  <input type="color" value={borderColor} onChange={(e) => handleSliderChange('borderColor', e.target.value)} style={{ width: '100%', height: '30px', border: '2px solid #000', cursor: 'pointer', background: 'none', padding: 0 }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label className="neo-slider-label"><span>Border Style</span></label>
                  <select value={borderStyle} onChange={(e) => handleSliderChange('borderStyle', e.target.value)} className="neo-select" style={{ borderWidth: '2px', fontSize: '11px', padding: '4px' }}>
                    {BORDER_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="neo-slider-container" style={{ marginBottom: 0 }}>
                <div className="neo-slider-label"><span>Corner Radius</span><span>{borderRadius}px</span></div>
                <input type="range" min="0" max="100" value={borderRadius} onChange={(e) => handleSliderChange('borderRadius', parseInt(e.target.value))} className="neo-slider" />
              </div>
            </div>

            {/* Custom Box Shadow */}
            <div style={{ border: '2px dashed #444', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '10px', color: 'var(--brutal-green)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Box Shadow Offset
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="neo-slider-container" style={{ marginBottom: 0 }}>
                  <div className="neo-slider-label"><span>Offset X</span><span>{shadowOffsetX}px</span></div>
                  <input type="range" min="-30" max="30" value={shadowOffsetX} onChange={(e) => handleSliderChange('shadowOffsetX', parseInt(e.target.value))} className="neo-slider" />
                </div>
                <div className="neo-slider-container" style={{ marginBottom: 0 }}>
                  <div className="neo-slider-label"><span>Offset Y</span><span>{shadowOffsetY}px</span></div>
                  <input type="range" min="-30" max="30" value={shadowOffsetY} onChange={(e) => handleSliderChange('shadowOffsetY', parseInt(e.target.value))} className="neo-slider" />
                </div>
              </div>
              <div className="neo-slider-container" style={{ marginBottom: 0 }}>
                <div className="neo-slider-label"><span>Blur Radius</span><span>{shadowBlur}px</span></div>
                <input type="range" min="0" max="40" value={shadowBlur} onChange={(e) => handleSliderChange('shadowBlur', parseInt(e.target.value))} className="neo-slider" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label className="neo-slider-label"><span>Shadow Color</span></label>
                <input type="color" value={shadowColor} onChange={(e) => handleSliderChange('shadowColor', e.target.value)} style={{ width: '100%', height: '30px', border: '2px solid #000', cursor: 'pointer', background: 'none', padding: 0 }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 4: PARALLAX & BLEND */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {renderHeader('parallax', '4. Parallax & Blend Mode', <Activity size={14} />, 'var(--brutal-cyan)')}
        
        {sections.parallax && (
          <div style={{ 
            border: '3px solid #000', 
            borderTop: 'none',
            padding: '14px', 
            background: 'rgba(255,255,255,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '-8px'
          }}>
            {/* Parallax Depth */}
            <div className="neo-slider-container" style={{ border: '2px solid var(--brutal-cyan)', padding: '10px', background: 'rgba(38,230,230,0.04)', marginBottom: 0 }}>
              <div className="neo-slider-label" style={{ color: 'var(--brutal-cyan)' }}>
                <span>Parallax Depth (Speed)</span>
                <span>{parallaxFactor > 0 ? `+${parallaxFactor}` : parallaxFactor}</span>
              </div>
              <input type="range" min="-8" max="8" step="0.5" value={parallaxFactor} onChange={(e) => handleSliderChange('parallaxFactor', parseFloat(e.target.value))} className="neo-slider" />
              <span style={{ fontSize: '9px', color: '#888', marginTop: '4px', textTransform: 'uppercase' }}>
                0 = Static • &lt;0 = Background (slow) • &gt;0 = Foreground (fast)
              </span>
            </div>

            {/* Mix Blend Mode */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label className="neo-slider-label"><span>Mix Blend Mode</span></label>
              <select
                value={mixBlendMode}
                onChange={(e) => handleSliderChange('mixBlendMode', e.target.value)}
                className="neo-select"
                style={{ borderWidth: '2px' }}
              >
                {BLEND_MODES.map((mode) => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
