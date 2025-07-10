import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import './Events.css';

export default function Events({ onSelectEvent }) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(() => setError('Erreur lors du chargement des événements.'));
  }, []);

  return (
    <div className="events-page">
      <h2>Événements disponibles</h2>
      {error && <div className="error">{error}</div>}
      <div className="events-list">
        {events.map(event => (
          <EventCard key={event.id} event={event} onSelect={onSelectEvent} />
        ))}
      </div>
    </div>
  );
}
