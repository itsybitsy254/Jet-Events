import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BuyTickets = ({ currentUser }) => {
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

  const handleBuyTickets = async () => {
    if (!event) {
      console.error('Event information is missing.');
      setError('Event information is missing.');
      return;
    }

    if (!currentUser) {
      console.error('User information is missing.');
      setError('User information is missing! Create an Account.');
      return;
    }

    if (event.tickets > 0) {
      try {
        // Post a new booking to the bookings database
        const bookingResponse = await fetch('https://jet-events-db.onrender.com/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: currentUser.id, // Ensure this matches how you identify users
            eventId: event.id,
            eventTitle: event.title,
            date: event.date,
            location: event.location,
            price: event.price,
          }),
        });

        if (!bookingResponse.ok) {
          const bookingError = await bookingResponse.text();
          console.error('Failed to create booking:', bookingError);
          throw new Error('Failed to create booking.');
        }

        // Update the number of tickets available for the event
        const eventResponse = await fetch(`https://jet-events-db.onrender.com/events/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tickets: event.tickets - 1,
          }),
        });

        if (!eventResponse.ok) {
          const eventError = await eventResponse.text();
          console.error('Failed to update event tickets:', eventError);
          throw new Error('Failed to update event tickets.');
        }

        // Update local state to reflect the ticket purchase
        setEvent(prevEvent => ({
          ...prevEvent,
          tickets: prevEvent.tickets - 1,
        }));
        alert(`You have successfully purchased a ticket for ${event.title}.`);
      } catch (error) {
        console.error('Error processing ticket purchase:', error);
        setError('An error occurred while processing your ticket purchase.');
      }
    } else {
      alert('Sorry, no tickets available.');
    }
  };

  if (error) return <p>{error}</p>;
  if (!event) return <p>Loading...</p>;

  return (
    <div className="buy-tickets-container">
      <h1>Buy Tickets for {event.title}</h1>
      <img src={event.imageUrl} alt={event.title} className="event-image" />
      <p>Date: {event.date}</p>
      <p>Location: {event.location}</p>
      <p>Price: ${event.price}</p>
      <p>Tickets Available: {event.tickets}</p>
      <button onClick={handleBuyTickets} className="buy-button">Buy Tickets</button>
    </div>
  );
};

export default BuyTickets;
