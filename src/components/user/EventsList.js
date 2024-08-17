import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './EventsList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('https://jet-events-db.onrender.com/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="events-list">
      <h1 className="events-header">Available Events</h1>
      <input
        type="text"
        placeholder="Search events..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <ul>
        {filteredEvents.map(event => (
          <li key={event.id} className="event-item">
            <h2>{event.title}</h2>
            <img src={event.imageUrl} alt={event.title} className="event-image" />
            <button onClick={() => openModal(event)} className="details-button">View Details</button>
          </li>
        ))}
      </ul>
      {isModalOpen && selectedEvent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>×</button>
            <h1>{selectedEvent.title}</h1>
            <img src={selectedEvent.imageUrl} alt={selectedEvent.title} className="modal-image" />
            <p>{selectedEvent.description}</p>
            <p><strong>Date:</strong> {selectedEvent.date}</p>
            <p><strong>Location:</strong> {selectedEvent.location}</p>
            <p><strong>Price:</strong> ${selectedEvent.price}</p>
            <p><strong>Tickets Available:</strong> {selectedEvent.tickets}</p>
            <Link to={`/buy/${selectedEvent.id}`} className="buy-button">Buy Tickets</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
