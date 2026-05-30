import React, { useState } from 'react';
import { Eye, EyeOff, Plus, Trash2, Copy, ArrowUp, ArrowDown, Edit3, Check } from 'lucide-react';
import NeoButton from './NeoButton';

export default function LayerList({
  layers,
  selectedLayerId,
  onSelectLayer,
  onAddLayer,
  onDeleteLayer,
  onCloneLayer,
  onToggleVisibility,
  onReorderLayers,
  onRenameLayer
}) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const startEditing = (e, id, name) => {
    e.stopPropagation();
    setEditingId(id);
    setEditName(name);
  };

  const saveRename = (id) => {
    if (editName.trim()) {
      onRenameLayer(id, editName.trim());
    }
    setEditingId(null);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      saveRename(id);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  const moveLayer = (e, index, direction) => {
    e.stopPropagation();
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < layers.length) {
      onReorderLayers(index, newIndex);
    }
  };

  return (
    <div className="neo-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid #000', paddingBottom: '12px' }}>
        <h2 style={{ fontSize: '20px', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Layers</span>
          <span style={{ fontSize: '13px', background: 'var(--brutal-yellow)', color: '#000', padding: '2px 8px', border: '2px solid #000' }}>
            {layers.length}
          </span>
        </h2>
        <NeoButton
          onClick={onAddLayer}
          color="green"
          style={{ padding: '6px 12px', fontSize: '12px' }}
          icon={<Plus size={14} />}
        >
          Add
        </NeoButton>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '4px' }}>
        {layers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 10px', color: '#888', fontStyle: 'italic', border: '2px dashed #000' }}>
            No layers yet! Click "Add" above to create one.
          </div>
        ) : (
          /* Stacking order: rendered bottom-to-top on canvas, which is usually last-to-first index. We display from top (index 0 is foreground or background?)
             Let's say index 0 is top-most (foreground) in the list to feel intuitive, i.e., top of the list sits on top of bottom.
          */
          layers.map((layer, index) => {
            const isSelected = layer.id === selectedLayerId;
            return (
              <div
                key={layer.id}
                onClick={() => onSelectLayer(layer.id)}
                className={`neo-card hoverable ${isSelected ? 'yellow' : ''}`}
                style={{
                  padding: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                  backgroundColor: isSelected ? 'var(--brutal-yellow)' : 'var(--brutal-dark-card)',
                  borderColor: '#000',
                  borderWidth: '3px',
                  boxShadow: isSelected ? '2px 2px 0px #000' : '3px 3px 0px #000',
                  color: isSelected ? '#000' : '#fff',
                  transform: isSelected ? 'translate(1px, 1px)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                  {/* Visibility Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleVisibility(layer.id);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: isSelected ? '#000' : '#888',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '2px'
                    }}
                    title={layer.visible ? 'Hide layer' : 'Show layer'}
                  >
                    {layer.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>

                  {/* Name or Renamer */}
                  {editingId === layer.id ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onBlur={() => saveRename(layer.id)}
                      onKeyDown={(e) => handleKeyDown(e, layer.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="neo-input"
                      style={{
                        padding: '2px 6px',
                        fontSize: '13px',
                        backgroundColor: '#fff',
                        color: '#000',
                        borderWidth: '2px',
                        width: '100%'
                      }}
                      autoFocus
                    />
                  ) : (
                    <div 
                      style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', flex: 1 }}
                      title="Double click to rename"
                      onDoubleClick={(e) => startEditing(e, layer.id, layer.name)}
                    >
                      <span style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {layer.name}
                      </span>
                      <button 
                        onClick={(e) => startEditing(e, layer.id, layer.name)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          opacity: isSelected ? 0.7 : 0.3,
                          color: isSelected ? '#000' : '#fff'
                        }}
                      >
                        <Edit3 size={11} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Layer Control Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {/* Re-order arrows */}
                  <button
                    disabled={index === 0}
                    onClick={(e) => moveLayer(e, index, 'up')}
                    style={{
                      background: isSelected ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)',
                      border: '2px solid #000',
                      cursor: index === 0 ? 'not-allowed' : 'pointer',
                      padding: '2px',
                      color: isSelected ? '#000' : '#fff',
                      opacity: index === 0 ? 0.3 : 1
                    }}
                    title="Move Forward (Z-Index up)"
                  >
                    <ArrowUp size={12} />
                  </button>
                  <button
                    disabled={index === layers.length - 1}
                    onClick={(e) => moveLayer(e, index, 'down')}
                    style={{
                      background: isSelected ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)',
                      border: '2px solid #000',
                      cursor: index === layers.length - 1 ? 'not-allowed' : 'pointer',
                      padding: '2px',
                      color: isSelected ? '#000' : '#fff',
                      opacity: index === layers.length - 1 ? 0.3 : 1
                    }}
                    title="Move Backward (Z-Index down)"
                  >
                    <ArrowDown size={12} />
                  </button>

                  {/* Duplicate */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCloneLayer(layer.id);
                    }}
                    style={{
                      background: isSelected ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)',
                      border: '2px solid #000',
                      cursor: 'pointer',
                      padding: '2px',
                      color: isSelected ? '#000' : '#fff'
                    }}
                    title="Duplicate Layer"
                  >
                    <Copy size={12} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteLayer(layer.id);
                    }}
                    style={{
                      background: isSelected ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)',
                      border: '2px solid #000',
                      cursor: 'pointer',
                      padding: '2px',
                      color: isSelected ? '#000' : 'var(--brutal-pink)'
                    }}
                    title="Delete Layer"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
