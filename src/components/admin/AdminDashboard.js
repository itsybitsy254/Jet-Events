import React, { useState, useEffect } from 'react';

function AdminDashboard({ onLogout }) {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    location: '',
    price: '',
    tickets: '',
    imageUrl: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log('Fetching events...'); // Debug log
        const response = await fetch('https://jet-events-db.onrender.com/events');
        if (!response.ok) throw new Error('Network response was not ok.');
        const data = await response.json();
        console.log('Fetched events:', data); // Debug log
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Error fetching events.');
      }
    };
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prevEvent => ({
      ...prevEvent,
      [name]: value
    }));
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://jet-events-db.onrender.com/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
      });
      if (!response.ok) throw new Error('Failed to add event.');
      alert('Event added successfully!');
      setNewEvent({
        title: '',
        date: '',
        location: '',
        price: '',
        tickets: '',
        imageUrl: ''
      });
      // Fetch updated events
      const updatedEventsResponse = await fetch('https://jet-events-db.onrender.com/events');
      if (!updatedEventsResponse.ok) throw new Error('Network response was not ok.');
      const updatedEvents = await updatedEventsResponse.json();
      console.log('Updated events:', updatedEvents); // Debug log
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error adding event:', error);
      alert('An error occurred while adding the event.');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`https://jet-events-db.onrender.com/events/${eventId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete event.');
      alert('Event deleted successfully!');
      // Fetch updated events
      const updatedEventsResponse = await fetch('https://jet-events-db.onrender.com/events');
      if (!updatedEventsResponse.ok) throw new Error('Network response was not ok.');
      const updatedEvents = await updatedEventsResponse.json();
      console.log('Updated events after deletion:', updatedEvents); // Debug log
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('An error occurred while deleting the event.');
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <button onClick={onLogout}>Logout</button>

      <h2>Add New Event</h2>
      <form onSubmit={handleAddEvent}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newEvent.title}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newEvent.location}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newEvent.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="tickets"
          placeholder="Tickets"
          value={newEvent.tickets}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={newEvent.imageUrl}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Event</button>
      </form>

      <h2>Manage Events</h2>
      <div className="events-list">
        {events.map(event => (
          <div key={event.id} className="event-item">
            <h3>{event.title}</h3>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <p>Price: ${event.price}</p>
            <p>Available Tickets: {event.tickets}</p>
            <img src={event.imageUrl} alt={event.title} className="event-image" />
            <button onClick={() => handleDeleteEvent(event.id)}>Delete Event</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
