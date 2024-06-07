import { useNavigate } from "react-router-dom";
import { deleteEvent } from "../../services/eventService.jsx";
import "./Events.css";

export const Event = ({ event, currentUser, getAndSetEvents, isMostImmediate }) => {
    const navigate = useNavigate();

    const handleUpdate = () => {
        navigate(`/events/edit/${event.id}`);
    };

    const handleDelete = () => {
        deleteEvent(event.id).then(() => {
            getAndSetEvents();
        });
    };

    return (
        <section className={`event ${isMostImmediate ? 'most-immediate' : ''}`}>
            <header className="event-info"></header>
            <div>{event.name}</div>
            <div>{event.date}</div>
            <div>{event.location}</div>
            <footer>
                {event.userId === currentUser.id && (
                    <div className="button-container">
                        <button className="btn btn-warning" onClick={handleUpdate}>Edit</button>
                        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    </div>
                )}
            </footer>
        </section>
    );
};
