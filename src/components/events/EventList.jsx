import { useEffect, useState } from 'react';
import { getAllEvents } from '../../services/eventService.jsx';
import './Events.css';
import { Messages } from '../messages/Messages.jsx';

export const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEvents().then(data => {
      setEvents(data);
    });
  }, []);

  if (events.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <section className="events-list">
      <div>
      < Messages />
      </div>
      {events.map(event => (
        <div key={event.id} className="event">
          <header className="event-header">{event.name}</header>
          <div>
            <span className="event-info">Date: </span>
            {event.date}
          </div>
          <div>
            <span className="event-info">Location: </span>
            {event.location}
          </div>
        </div>
      ))}
    </section>
  );
};
