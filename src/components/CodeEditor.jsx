import React, { useState } from 'react';
import { Code, Eye } from 'lucide-react';

export default function CodeEditor({ layer, onChange }) {
  const [activeTab, setActiveTab] = useState('html'); // 'html' | 'css'

  if (!layer) {
    return (
      <div style={{ textAlign: 'center', padding: '24px', color: '#888', fontStyle: 'italic' }}>
        Select a layer to write HTML & CSS code.
      </div>
    );
  }

  const handleCodeChange = (field, value) => {
    onChange(layer.id, { [field]: value });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #000', paddingBottom: '6px' }}>
        <h3 style={{
          fontSize: '13px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: 'var(--brutal-pink)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Code size={14} /> Layer Code Studio
        </h3>
        
        {layer.isCustom && (
          <span style={{ fontSize: '9px', background: 'var(--brutal-pink)', color: '#000', padding: '2px 6px', fontWeight: 'bold', border: '1px solid #000' }}>
            Custom Code Active 🔓
          </span>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', border: '3px solid #000', background: '#000', gap: '3px', padding: '2px' }}>
        <button
          onClick={() => setActiveTab('html')}
          style={{
            flex: 1,
            padding: '8px',
            fontFamily: 'var(--font-heading)',
            fontWeight: '700',
            fontSize: '11px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            border: 'none',
            backgroundColor: activeTab === 'html' ? 'var(--brutal-pink)' : '#1e1e24',
            color: activeTab === 'html' ? '#000' : '#888',
            transition: 'all 0.1s'
          }}
        >
          Custom HTML
        </button>
        <button
          onClick={() => setActiveTab('css')}
          style={{
            flex: 1,
            padding: '8px',
            fontFamily: 'var(--font-heading)',
            fontWeight: '700',
            fontSize: '11px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            border: 'none',
            backgroundColor: activeTab === 'css' ? 'var(--brutal-cyan)' : '#1e1e24',
            color: activeTab === 'css' ? '#000' : '#888',
            transition: 'all 0.1s'
          }}
        >
          Custom CSS
        </button>
      </div>

      {/* Code editors are always active and visible */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '260px' }}>
        {activeTab === 'html' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', height: '100%', flex: 1 }}>
            <span style={{ fontSize: '11px', color: '#aaa', textTransform: 'uppercase' }}>
              HTML Markup (Directly Editable):
            </span>
            <textarea
              value={layer.html}
              onChange={(e) => handleCodeChange('html', e.target.value)}
              className="neo-textarea"
              style={{ flex: 1, minHeight: '200px', color: 'var(--brutal-cyan)' }}
              placeholder="e.g. <div class='circle'></div>"
            />
            <span style={{ fontSize: '10px', color: '#666', fontStyle: 'italic' }}>
              💡 Pro tip: Editing HTML directly sets the layer to "Custom Code Active" mode.
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', height: '100%', flex: 1 }}>
            <span style={{ fontSize: '11px', color: '#aaa', textTransform: 'uppercase' }}>
              Scoped CSS styles (Directly Editable):
            </span>
            <textarea
              value={layer.css}
              onChange={(e) => handleCodeChange('css', e.target.value)}
              className="neo-textarea"
              style={{ flex: 1, minHeight: '200px', color: 'var(--brutal-pink)' }}
              placeholder="e.g. .circle { width: 100px; height: 100px; background: red; }"
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', background: '#1a1a22', padding: '8px', border: '1px solid #333' }}>
              <span style={{ fontSize: '10px', color: '#888', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Scoped Mounting details:
              </span>
              <span style={{ fontSize: '9px', color: '#aaa', lineHeight: '1.4' }}>
                Styles are compiled under the wrapper ID <code>#layer-{layer.id}</code> automatically. Keyframe animations can also be added here.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
