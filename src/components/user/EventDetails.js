import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jet-events-db.onrender.com/events/${id}`)
      .then(response => response.json())
      .then(data => setEvent(data))
      .catch(error => {
        console.error('Error fetching event details:', error);
        setError('Error fetching event details.');
      });
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!event) return <p>Loading...</p>;

  return (
    <div className="event-details-container">
      <h1 className="event-title">{event.title}</h1>
      <img src={event.imageUrl} alt={event.title} className="event-image" />
      <div className="event-info">
        <p className="event-description">{event.description}</p>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Price:</strong> ${event.price}</p>
        <p><strong>Tickets Available:</strong> {event.tickets}</p>
      </div>
      <Link to={`/buy/${event.id}`}>
        <button className="buy-button">Buy Tickets</button>
      </Link>
    </div>
  );
};

export default EventDetails;