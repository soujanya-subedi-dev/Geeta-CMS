import { useEffect, useState } from "react";

import Card from "../components/Card.jsx";
import ListLayout from "../layouts/ListLayout.jsx";
import api from "../api/client.js";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get("events/");
        setEvents(data.results ?? data);
      } catch (err) {
        setError("Unable to load events at the moment. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <ListLayout
      title="Events & Engagements"
      description="Discover upcoming events, seminars, and engagement opportunities hosted by Geeta Aviation."
      items={events}
      loading={loading}
      error={error}
      emptyMessage="No events have been scheduled yet."
      renderCard={(event) => {
        const dateLabel = event.date
          ? new Date(event.date).toLocaleDateString(undefined, { dateStyle: "medium" })
          : "Date to be announced";
        const summary = event.description
          ? `${event.description.slice(0, 140)}${event.description.length > 140 ? "..." : ""}`
          : "";

        return (
          <Card
            title={event.title}
            subtitle={dateLabel}
            description={summary}
            image={event.image}
            to={`/events/${event.id}`}
            actionText="View Event"
          />
        );
      }}
    />
  );
};

export default Events;
