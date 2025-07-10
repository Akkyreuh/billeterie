import React from 'react';
import './Input.css';

export default function Input({ label, type = 'text', value, onChange, className = '', ...props }) {
  return (
    <div className={`input-group ${className}`}>
      {label && <label>{label}</label>}
      <input type={type} value={value} onChange={onChange} {...props} />
    </div>
  );
}
