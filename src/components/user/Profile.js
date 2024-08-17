import React, { useEffect, useState } from 'react';

const Profile = ({ currentUser, handleLogout }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      // Fetch the user's bookings
      fetch(`https://jet-events-db.onrender.com/bookings?userId=${currentUser.id}`)
        .then(response => response.json())
        .then(bookings => {
          // Extract event IDs from bookings
          const bookedEventIds = bookings.map(booking => booking.eventId);

          if (bookedEventIds.length) {
            // Fetch details for the booked events
            fetch('https://jet-events-db.onrender.com/events')
              .then(response => response.json())
              .then(eventsData => {
                // Filter events based on booked event IDs
                const bookedEvents = eventsData.filter(event =>
                  bookedEventIds.includes(event.id)
                );
                setEvents(bookedEvents);
              })
              .catch(error => {
                console.error('Error fetching events:', error);
                setError('Error fetching events.');
              });
          }
        })
        .catch(error => {
          console.error('Error fetching bookings:', error);
          setError('Error fetching bookings.');
        });
    }
  }, [currentUser]);

  const handleDeleteAccount = async () => {
    if (currentUser) {
      try {
        // Make an API call to delete the user's account
        const response = await fetch(`https://jet-events-db.onrender.com/users/${currentUser.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Your account has been deleted.');
          handleLogout(); // Log out the user after deletion
        } else {
          throw new Error('Failed to delete account.');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('An error occurred while deleting your account.');
      }
    }
  };

  if (!currentUser) return <p>Please log in to view your profile.</p>;
  if (error) return <p>{error}</p>;
  if (!events.length) return <p>No booked events found.</p>;

  return (
    <div className="profile-container">
      <h1>Welcome, {currentUser.name}!</h1>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <button onClick={handleDeleteAccount} className="delete-account-button">Delete Account</button>

      <h2>Your Booked Events</h2>
      <div className="events-list">
        {events.map(event => (
          <div key={event.id} className="event-item">
            <h3>{event.title}</h3>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <p>Price: ${event.price}</p>
            <p>Available Tickets: {event.tickets}</p>
            <img src={event.imageUrl} alt={event.title} className="event-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
