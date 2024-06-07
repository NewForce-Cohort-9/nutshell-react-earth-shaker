
import { useNavigate } from "react-router-dom";
import { updateEvent, deleteEvent } from "../../services/eventService.jsx";
import { Messages } from "../messages/Messages.jsx";

export const Event = ({ event, currentUser, getAndSetEvents }) => {
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
        <section className="event">
            <header className="event-info">#{event.id}</header>
            <div>{event.name}</div>
            <div>{event.date}</div>
            <div>{event.location}</div>
            <footer>
                <div className="button-container">
                    <button className="btn btn-warning" onClick={handleUpdate}>Edit</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
            </footer>
            <div>
                <Messages />
            </div>
        </section>
    );
};
