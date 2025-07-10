import React from 'react';
import './SeatButton.css';

export default function SeatButton({ seat, selected, onClick }) {
  return (
    <button
      className={`seat-btn${selected ? ' selected' : ''}${seat.booked ? ' booked' : ''}`}
      disabled={seat.booked}
      onClick={onClick}
    >
      {seat.label} {seat.booked ? '(Réservée)' : ''}
    </button>
  );
}
