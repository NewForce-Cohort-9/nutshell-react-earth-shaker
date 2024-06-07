
import { useEffect, useState } from "react";
import "./Form.css";
import { updateEvent, getEventById } from "../../services/eventService.jsx";
import { useNavigate, useParams } from "react-router-dom";

export const EventEditForm = ({currentUser}) => {
    const { eventId } = useParams();
    const [event, setEvent] = useState({ name: "", date: "", location: "" });
    const navigate = useNavigate();

    useEffect(() => {
        getEventById(eventId).then((eventData) => {
            setEvent(eventData);
        });
    }, [eventId]);

    const handleSave = (e) => {
        e.preventDefault();

        if (event.name && event.date && event.location) {
            updateEvent(event).then(() => {
                navigate("/events");
            });
        } else {
            window.alert("Please fill out all fields");
        }
    };

    return (
        <form>
            <h2>Edit Event</h2>
            <fieldset>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Event name"
                        value={event.name}
                        onChange={(e) => {
                            const eventCopy = { ...event };
                            eventCopy.name = e.target.value;
                            setEvent(eventCopy);
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="YYYY-MM-DD"
                        value={event.date}
                        onChange={(e) => {
                            const eventCopy = { ...event };
                            eventCopy.date = e.target.value;
                            setEvent(eventCopy);
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Location</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Event location"
                        value={event.location}
                        onChange={(e) => {
                            const eventCopy = { ...event };
                            eventCopy.location = e.target.value;
                            setEvent(eventCopy);
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button className="form-btn btn-info" onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
            </fieldset>
        </form>
    );
};
