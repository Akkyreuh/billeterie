import React from 'react';
import './EventCard.css';

export default function EventCard({ event, onSelect }) {
  return (
    <div className="event-card" onClick={() => onSelect(event)}>
      <h3>{event.name}</h3>
      <p>{event.date}</p>
      <p>{event.location}</p>
      <p>{event.description}</p>
    </div>
  );
}
