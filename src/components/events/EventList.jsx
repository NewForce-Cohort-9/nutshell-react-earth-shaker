import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllEvents } from "../../services/eventService.jsx";
import "./Events.css";
import { Event } from "./Events.jsx";

export const EventList = ({ currentUser }) => {
    const [allEvents, setAllEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);

    const getAndSetEvents = () => {
        getAllEvents().then((eventsArray) => {
            // Sort events by date
            const sortedEvents = eventsArray.sort((firstEvent, secondEvent) => new Date(firstEvent.date) - new Date(secondEvent.date));
            setAllEvents(sortedEvents);
            setFilteredEvents(sortedEvents);

            // Get the current date (year, month, day)
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            // Separate events
            const upcoming = sortedEvents.filter(event => new Date(event.date) >= today);
            const past = sortedEvents.filter(event => new Date(event.date) < today);

            setUpcomingEvents(upcoming);
            setPastEvents(past);
        });
    };

    useEffect(() => {
        getAndSetEvents();
    }, [currentUser]);

    useEffect(() => {
        const foundEvents = allEvents.filter((event) =>
            event.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEvents(foundEvents);

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const upcoming = foundEvents.filter(event => new Date(event.date) >= today);
        const past = foundEvents.filter(event => new Date(event.date) < today);

        setUpcomingEvents(upcoming);
        setPastEvents(past);
    }, [searchTerm, allEvents]);

    return (
        <div className="events-container">
            <h2>Events</h2>
            <Link to="/events/new" className="btn btn-primary">Create New Event</Link>
            <input
                type="text"
                placeholder="Search events..."
                onChange={(event) => setSearchTerm(event.target.value)}
            />
            <section>
                <h3>Upcoming Events</h3>
                <article className="events">
                    {upcomingEvents.map((eventObject, index) => (
                        <Event
                            event={eventObject}
                            currentUser={currentUser}
                            getAndSetEvents={getAndSetEvents}
                            key={eventObject.id}
                            isMostImmediate={index === 0}
                        />
                    ))}
                </article>
            </section>
            <section>
                <h3>Past Events</h3>
                <article className="events">
                    {pastEvents.map(eventObject => (
                        <Event
                            event={eventObject}
                            currentUser={currentUser}
                            getAndSetEvents={getAndSetEvents}
                            key={eventObject.id}
                        />
                    ))}
                </article>
            </section>
        </div>
    );
};