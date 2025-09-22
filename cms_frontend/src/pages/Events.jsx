import { useEffect, useState } from "react";

import client from "../api/client.js";
import CardList from "../components/CardList.jsx";
import ListLayout from "../layouts/ListLayout.jsx";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .get("events/")
      .then((response) => setEvents(response.data.results || response.data))
      .finally(() => setLoading(false));
  }, []);

  const getDescription = (item) => {
    if (!item.description) return "";
    return item.description.length > 160 ? `${item.description.slice(0, 160)}...` : item.description;
  };

  return (
    <ListLayout
      title="Aviation Events"
      subtitle="Discover upcoming seminars, workshops, and networking events hosted by Geeta Aviation."
    >
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-500">Loading events...</div>
      ) : (
        <CardList
          items={events}
          renderMeta={(item) => `${new Date(item.start).toLocaleString()}${item.location ? ` • ${item.location}` : ""}`}
          getDescription={getDescription}
          getTitle={(item) => item.title}
          getLink={(item) => `/events/${item.id}`}
          actionLabel="View event"
        />
      )}
    </ListLayout>
  );
}

export default Events;
