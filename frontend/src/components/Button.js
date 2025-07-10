import React from 'react';
import './Button.css';

export default function Button({ children, onClick, type = 'button', className = '', ...props }) {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
