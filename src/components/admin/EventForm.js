import React, { useState } from 'react';

function EventForm({ refreshEvents }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tickets, setTickets] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = { title, date, description, price, tickets, imageUrl };
    fetch('https://jet-events-db.onrender.com/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent),
    })
      .then(response => response.json())
      .then(() => {
        setTitle('');
        setDate('');
        setDescription('');
        setPrice('');
        setTickets('');
        setImageUrl('');
        refreshEvents();
      })
      .catch(error => console.error('Error adding event:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h3>Add New Event</h3>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <textarea
        placeholder="Event Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Number of Tickets"
        value={tickets}
        onChange={(e) => setTickets(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <button type="submit">Add Event</button>
    </form>
  );
}

export default EventForm;
