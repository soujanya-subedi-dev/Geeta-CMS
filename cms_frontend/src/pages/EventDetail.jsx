import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    API.get(`events/${id}/`)
      .then(res => setEvent(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      {event.image && <img src={event.image} alt={event.title} className="mb-4 w-full rounded" />}
      <p className="mb-2">{event.description}</p>
      <p><strong>Start:</strong> {new Date(event.start_datetime).toLocaleString()}</p>
      {event.end_datetime && <p><strong>End:</strong> {new Date(event.end_datetime).toLocaleString()}</p>}
      {event.location && <p><strong>Location:</strong> {event.location}</p>}
    </div>
  );
};

export default EventDetail;
