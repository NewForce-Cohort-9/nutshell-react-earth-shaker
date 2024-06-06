import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllEvents } from '../../services/eventService.jsx';
import './Events.css';


export const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    getAllEvents().then(data => {
      const eventObject = data.find(event => event.id.toString() === eventId);
      setEvent(eventObject);
    });
  }, [eventId]);

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <section className="event">
      <header className="event-header">{event.name}</header>
      <div>
        <span className="event-info">Date: </span>
        {event.date}
      </div>
      <div>
        <span className="event-info">Location: </span>
        {event.location}
      </div>
    </section>
  );
};
