import React, { useRef, useState, useEffect } from 'react';

/**
 * Helper to scope CSS to a specific layer container ID
 * This ensures that styles written for a layer do not leak globally.
 */
export const scopeCSS = (cssText, prefix) => {
  if (!cssText) return '';
  
  let result = '';
  let buffer = '';
  let depth = 0;
  let inKeyframes = false;
  
  for (let i = 0; i < cssText.length; i++) {
    const char = cssText[i];
    
    if (char === '{') {
      depth++;
      if (depth === 1) {
        const selectorText = buffer.trim();
        buffer = '';
        
        if (selectorText.toLowerCase().startsWith('@keyframes') || selectorText.toLowerCase().includes('keyframes')) {
          inKeyframes = true;
          result += selectorText + ' {';
        } else if (inKeyframes) {
          result += selectorText + ' {';
        } else if (selectorText.startsWith('@') || selectorText.startsWith(':root')) {
          result += selectorText + ' {';
        } else {
          const scoped = selectorText
            .split(',')
            .map(sel => {
              const trimmed = sel.trim();
              if (!trimmed) return '';
              if (trimmed.startsWith(prefix)) return trimmed;
              return `${prefix} ${trimmed}`;
            })
            .join(', ');
          result += scoped + ' {';
        }
      } else {
        result += buffer + '{';
        buffer = '';
      }
    } else if (char === '}') {
      depth--;
      result += buffer + '}';
      buffer = '';
      
      if (depth === 0) {
        inKeyframes = false;
      }
    } else {
      buffer += char;
    }
  }
  
  result += buffer;
  return result;
};

export default function Canvas({
  layers,
  selectedLayerId,
  canvasBg,
  aspectRatio,
  parallaxEnabled,
  canvasRef,
  zoom = 100,
  onLayerChange,
  onVisualConfigChange,
  onDropShape
}) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [editingTextLayerId, setEditingTextLayerId] = useState(null);
  const [tempText, setTempText] = useState('');

  // Parse aspect ratio style
  let ratioStyle = '1 / 1';
  let canvasSize = { width: '450px', height: '450px' };
  let W = 450;
  let H = 450;
  
  if (aspectRatio === '16:9') {
    ratioStyle = '16 / 9';
    canvasSize = { width: '600px', height: '337.5px' };
    W = 600;
    H = 337.5;
  } else if (aspectRatio === '9:16') {
    ratioStyle = '9 / 16';
    canvasSize = { width: '280px', height: '498px' };
    W = 280;
    H = 498;
  }

  // Mouse move handler for Parallax
  const handleMouseMove = (e) => {
    if (!parallaxEnabled || !containerRef.current || isDragging) return;

    const rect = containerRef.current.getBoundingClientRect();
    // Normalize coordinates: center is (0,0), range is -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly reset mouse parallax position to center
    if (parallaxEnabled) {
      setMousePos({ x: 0, y: 0 });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Drag and Drop (Toolbar elements dropping onto the Canvas)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!containerRef.current || !onDropShape) return;

    const shapeType = e.dataTransfer.getData('text/plain');
    if (!shapeType) return;

    const rect = containerRef.current.getBoundingClientRect();
    const scaleFactor = zoom / 100;

    // Convert mouse coordinates relative to canvas bounding box
    const mouseX = (e.clientX - rect.left) / scaleFactor;
    const mouseY = (e.clientY - rect.top) / scaleFactor;

    // Center is (nativeWidth / 2, nativeHeight / 2)
    const nativeWidth = rect.width / scaleFactor;
    const nativeHeight = rect.height / scaleFactor;

    // Coordinates relative to canvas center
    const dropX = Math.round(mouseX - nativeWidth / 2);
    const dropY = Math.round(mouseY - nativeHeight / 2);

    onDropShape(shapeType, dropX, dropY);
  };

  // On-Canvas Layer click-and-drag repositioning (supports touch on mobile)
  const handleLayerDragStart = (e, layer) => {
    const isTouch = e.type === 'touchstart';
    if (isTouch) {
      // Prevent scrolling the page while dragging objects
      e.preventDefault();
    } else {
      e.preventDefault();
    }
    e.stopPropagation();
    if (!onLayerChange) return;

    setIsDragging(true);
    const scaleFactor = zoom / 100;
    
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;
    const startX = clientX;
    const startY = clientY;
    const initialTx = layer.translateX || 0;
    const initialTy = layer.translateY || 0;

    const handleMove = (moveEvt) => {
      const currentTouch = moveEvt.type === 'touchmove';
      const currentX = currentTouch ? moveEvt.touches[0].clientX : moveEvt.clientX;
      const currentY = currentTouch ? moveEvt.touches[0].clientY : moveEvt.clientY;

      const dx = (currentX - startX) / scaleFactor;
      const dy = (currentY - startY) / scaleFactor;

      onLayerChange(layer.id, {
        translateX: Math.round(initialTx + dx),
        translateY: Math.round(initialTy + dy)
      });
    };

    const handleEnd = () => {
      setIsDragging(false);
      if (isTouch) {
        window.removeEventListener('touchmove', handleMove);
        window.removeEventListener('touchend', handleEnd);
      } else {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleEnd);
      }
    };

    if (isTouch) {
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    } else {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
    }
  };

  // Drag-to-Resize on Canvas handle listener (supports touch on mobile)
  const handleLayerResizeStart = (e, layer, canvasW, canvasH) => {
    const isTouch = e.type === 'touchstart';
    if (isTouch) {
      e.preventDefault();
    } else {
      e.preventDefault();
    }
    e.stopPropagation();
    if (!onLayerChange) return;

    setIsDragging(true);
    const scaleFactor = zoom / 100;

    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;
    const startX = clientX;
    const startY = clientY;
    
    // Initial scales
    const initialScaleX = layer.scaleX ?? layer.scale ?? 1.0;
    const initialScaleY = layer.scaleY ?? layer.scale ?? 1.0;

    const handleMove = (moveEvt) => {
      const currentTouch = moveEvt.type === 'touchmove';
      const currentX = currentTouch ? moveEvt.touches[0].clientX : moveEvt.clientX;
      const currentY = currentTouch ? moveEvt.touches[0].clientY : moveEvt.clientY;

      const dx = currentX - startX;
      const dy = currentY - startY;

      // Convert to native canvas space delta
      const nativeDx = dx / scaleFactor;
      const nativeDy = dy / scaleFactor;

      const halfW = canvasW / 2;
      const halfH = canvasH / 2;

      // Shift key toggles to Freeform resizing, proportional by default
      if (moveEvt.shiftKey) {
        const newScaleX = Math.max(0.1, Math.min(3.0, initialScaleX + (nativeDx / halfW)));
        const newScaleY = Math.max(0.1, Math.min(3.0, initialScaleY + (nativeDy / halfH)));
        
        onLayerChange(layer.id, {
          scaleX: parseFloat(newScaleX.toFixed(2)),
          scaleY: parseFloat(newScaleY.toFixed(2))
        });
      } else {
        // Proportional resize change factor based on drag vector
        const changeFactor = 1 + ((nativeDx / halfW) + (nativeDy / halfH)) / 2;
        const newScaleX = Math.max(0.1, Math.min(3.0, initialScaleX * changeFactor));
        const newScaleY = Math.max(0.1, Math.min(3.0, initialScaleY * changeFactor));

        onLayerChange(layer.id, {
          scaleX: parseFloat(newScaleX.toFixed(2)),
          scaleY: parseFloat(newScaleY.toFixed(2))
        });
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
      if (isTouch) {
        window.removeEventListener('touchmove', handleMove);
        window.removeEventListener('touchend', handleEnd);
      } else {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleEnd);
      }
    };

    if (isTouch) {
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    } else {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
    }
  };

  // On-Canvas Double Click to edit text
  const handleDoubleClick = (e, layer) => {
    e.preventDefault();
    e.stopPropagation();
    
    const textVal = layer.visualConfig?.text ?? (layer.name || '');
    setEditingTextLayerId(layer.id);
    setTempText(textVal);
  };

  const finishEditingText = (layer) => {
    if (editingTextLayerId === null) return;
    setEditingTextLayerId(null);
    
    const textVal = tempText.trim() || '';
    
    if (onVisualConfigChange) {
      const originalConfig = layer.visualConfig || {
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
      
      onVisualConfigChange(layer.id, {
        ...originalConfig,
        text: textVal
      });
    } else if (onLayerChange) {
      onLayerChange(layer.id, { name: textVal });
    }
  };

  return (
    <div 
      style={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '20px',
        overflow: 'hidden'
      }}
    >
      <div
        ref={(el) => {
          containerRef.current = el;
          if (canvasRef) canvasRef.current = el;
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="neo-card"
        style={{
          aspectRatio: ratioStyle,
          width: '100%',
          maxWidth: aspectRatio === '9:16' ? canvasSize.width : '650px',
          background: canvasBg || '#1e1e24',
          position: 'relative',
          overflow: 'hidden',
          padding: 0,
          borderWidth: '5px',
          boxShadow: '8px 8px 0px #000',
          transition: 'box-shadow 0.2s',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* Render visible layers stacked on top of each other */}
        {[...layers].reverse().map((layer) => {
          if (!layer.visible) return null;

          const isSelected = layer.id === selectedLayerId;
          const parallaxX = mousePos.x * (layer.parallaxFactor || 0) * 50;
          const parallaxY = mousePos.y * (layer.parallaxFactor || 0) * 50;

          // Build dynamic transforms (supporting Scale X/Y and Skew X/Y)
          const tx = (layer.translateX || 0) + parallaxX;
          const ty = (layer.translateY || 0) + parallaxY;
          const rot = layer.rotate || 0;
          const sx = layer.scaleX ?? layer.scale ?? 1;
          const sy = layer.scaleY ?? layer.scale ?? 1;
          const skewX = layer.skewX || 0;
          const skewY = layer.skewY || 0;

          const combinedTransform = `
            translate(calc(${tx}px), calc(${ty}px))
            rotate(${rot}deg)
            scale(${sx}, ${sy})
            skew(${skewX}deg, ${skewY}deg)
          `;

          // Build CSS filters list dynamically
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

          // Build custom box shadow
          const shadowX = layer.shadowOffsetX ?? 0;
          const shadowY = layer.shadowOffsetY ?? 0;
          const shadowBl = layer.shadowBlur ?? 0;
          const shadowCol = layer.shadowColor ?? '#000000';
          const boxShadowValue = (shadowX !== 0 || shadowY !== 0 || shadowBl !== 0)
            ? `${shadowX}px ${shadowY}px ${shadowBl}px ${shadowCol}`
            : 'none';

          const inlineStyle = {
            position: 'absolute',
            opacity: (layer.opacity ?? 100) / 100,
            mixBlendMode: layer.mixBlendMode || 'normal',
            filter: filtersList || 'none',
            transform: combinedTransform,
            transformOrigin: 'center center',
            transition: isDragging ? 'opacity 0.2s, filter 0.2s' : 'opacity 0.2s, filter 0.2s, transform 0.05s ease-out',
            pointerEvents: 'none', /* Ensure layers are transparent to clicks for parallax */
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',

            // Advanced Wrapper Decoration styles
            padding: `${layer.padding || 0}px`,
            backgroundColor: layer.wrapperBg || 'transparent',
            border: (layer.borderWidth > 0) ? `${layer.borderWidth}px ${layer.borderStyle || 'solid'} ${layer.borderColor || '#000'}` : 'none',
            borderRadius: `${layer.borderRadius || 0}px`,
            boxShadow: boxShadowValue
          };

          return (
            <div 
              key={layer.id} 
              id={`layer-${layer.id}`} 
              style={inlineStyle}
            >
              {/* Scope style block specific to this layer */}
              <style>
                {scopeCSS(layer.css, `#layer-${layer.id}`)}
              </style>
              
              {/* Inject Custom HTML inside tight inline-flex container */}
              <div 
                style={{ 
                  position: 'relative', 
                  display: 'inline-flex', 
                  justifyContent: 'center', 
                  alignItems: 'center' 
                }}
              >
                <div 
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  dangerouslySetInnerHTML={{ __html: layer.html || '' }} 
                />

                 {/* Show subtle visual helper border fitting closely around this inline-flex element */}
                {isSelected && (
                  <>
                    <div 
                      style={{
                        position: 'absolute',
                        inset: '-6px',
                        border: '3px dashed var(--brutal-yellow)',
                        boxShadow: '0 0 0 3px #000, inset 0 0 6px rgba(255,222,77,0.3)',
                        pointerEvents: 'auto', /* ENABLE MOUSE INTERACTION ONLY ON SELECTION BOUNDS */
                        cursor: isDragging ? 'grabbing' : 'grab',
                        zIndex: 9999
                      }} 
                      onMouseDown={(e) => handleLayerDragStart(e, layer)}
                      onTouchStart={(e) => handleLayerDragStart(e, layer)}
                      onDoubleClick={(e) => handleDoubleClick(e, layer)}
                      title="Drag to Reposition • Double Click to Edit Text"
                    />
                    
                    {/* Corner Resize Handle at the bottom-right of the visual boundaries */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-12px',
                        right: '-12px',
                        width: '16px',
                        height: '16px',
                        backgroundColor: 'var(--brutal-yellow)',
                        border: '3px solid #000',
                        cursor: 'se-resize',
                        pointerEvents: 'auto',
                        zIndex: 10000,
                        boxShadow: '2px 2px 0px #000',
                        transition: 'transform 0.1s'
                      }}
                      onMouseDown={(e) => handleLayerResizeStart(e, layer, W, H)}
                      onTouchStart={(e) => handleLayerResizeStart(e, layer, W, H)}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                      onMouseLeave={(e) => e.target.style.transform = 'none'}
                      title="Drag to Resize (Hold Shift for Freeform)"
                    />
                  </>
                )}
              </div>

              {/* Centered Inline Text Editor Overlay */}
              {editingTextLayerId === layer.id && (
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10001,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    padding: '8px',
                    pointerEvents: 'auto'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <input 
                    type="text" 
                    value={tempText}
                    onChange={(e) => setTempText(e.target.value)}
                    onBlur={() => finishEditingText(layer)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        finishEditingText(layer);
                      } else if (e.key === 'Escape') {
                        setEditingTextLayerId(null);
                      }
                    }}
                    autoFocus
                    style={{
                      backgroundColor: '#ffffff',
                      color: '#000000',
                      border: '3px solid #000000',
                      padding: '4px 10px',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '13px',
                      fontWeight: '800',
                      boxShadow: '3px 3px 0px #000000',
                      textAlign: 'center',
                      width: '85%',
                      maxWidth: '220px',
                      outline: 'none'
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Dynamic Art helper overlays */}
        <div style={{
          position: 'absolute',
          inset: 0,
          border: '2px solid rgba(0,0,0,0.1)',
          pointerEvents: 'none',
          boxSizing: 'border-box'
        }} />
      </div>
    </div>
  );
}
