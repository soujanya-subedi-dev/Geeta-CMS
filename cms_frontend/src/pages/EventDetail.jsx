import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import client from "../api/client.js";
import DetailLayout from "../layouts/DetailLayout.jsx";

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    client
      .get(`events/${id}/`)
      .then((response) => setEvent(response.data))
      .finally(() => setLoading(false));
  }, [id]);

  const meta = useMemo(() => {
    if (!event) return "";
    const date = new Date(event.date).toLocaleDateString();
    return `${date} • ${event.location}`;
  }, [event]);

  const formattedContent = useMemo(() => {
    if (!event?.description) return "";
    return event.description.replace(/\n/g, "<br />");
  }, [event]);

  if (loading) {
    return <div className="py-24 text-center text-gray-500">Loading event...</div>;
  }

  if (!event) {
    return <div className="py-24 text-center text-gray-500">Event not found.</div>;
  }

  const actions = event.registration_link
    ? [
        <a
          key="register"
          href={event.registration_link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2 text-white font-semibold hover:bg-blue-700"
        >
          Register now
        </a>,
      ]
    : null;

  return (
    <DetailLayout title={event.title} image={event.image} meta={meta} content={formattedContent} actions={actions} />
  );
}

export default EventDetail;
