import React, { useEffect, useState } from 'react';
import SeatButton from '../components/SeatButton';
import Button from '../components/Button';
import './Booking.css';

export default function Booking({ event, user, token }) {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (event) {
      setLoading(true);
      fetch(`http://localhost:8080/api/events/${event.id}`)
        .then(res => res.json())
        .then(data => {
          setSeats(data.seats || []);
          setSelectedSeats([]);
          setLoading(false);
        })
        .catch(() => {
          setError('Erreur lors du chargement des places.');
          setLoading(false);
        });
    }
  }, [event]);

  const handleReserve = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('http://localhost:8080/api/bookings/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: user.id,
          eventId: event.id,
          seatIds: selectedSeats
        })
      });
      if (!res.ok) throw new Error('Erreur lors de la réservation');
      const data = await res.json();
      setResult(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (!event) return <div>Sélectionnez un événement.</div>;

  return (
    <div className="booking-page">
      <h2>Réserver des places</h2>
      {error && <div className="error">{error}</div>}
      {loading && <div>Chargement...</div>}
      <div className="seats-list">
        {seats.map(seat => (
          <SeatButton
            key={seat.id}
            seat={seat}
            selected={selectedSeats.includes(seat.id)}
            onClick={() => {
              if (!seat.booked) {
                setSelectedSeats(sel => sel.includes(seat.id)
                  ? sel.filter(id => id !== seat.id)
                  : [...sel, seat.id]);
              }
            }}
          />
        ))}
      </div>
      {selectedSeats.length > 0 && (
        <Button onClick={handleReserve} disabled={loading}>
          Réserver {selectedSeats.length} place(s)
        </Button>
      )}
      {result && <div className="success">Réservation confirmée !</div>}
    </div>
  );
}
