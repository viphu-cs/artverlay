import React from 'react';

/**
 * NeoButton - Reusable Neo-Brutalist button component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.color - 'yellow' | 'pink' | 'cyan' | 'green' | 'purple' | 'dark' | 'white'
 * @param {string} props.className - Additional class names
 * @param {boolean} props.fullWidth - If true, button stretches to 100% width
 * @param {React.ReactNode} props.icon - Optional prefix icon
 * @param {boolean} props.disabled - Disabled state
 * @param {Function} props.onClick - Click handler
 */
export default function NeoButton({
  children,
  color = 'yellow',
  className = '',
  fullWidth = false,
  icon = null,
  disabled = false,
  onClick,
  ...rest
}) {
  const colorClass = color ? `neo-btn ${color}` : 'neo-btn';
  const widthStyle = fullWidth ? { width: '100%', justifyContent: 'center' } : {};

  return (
    <button
      className={`${colorClass} ${className}`}
      style={widthStyle}
      disabled={disabled}
      onClick={onClick}
      type="button"
      {...rest}
    >
      {icon && <span className="neo-btn-icon-wrapper" style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  );
}
