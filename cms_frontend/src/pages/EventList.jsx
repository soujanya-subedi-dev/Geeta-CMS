import { useEffect, useState } from "react";
import API from "../api/axios";
import Card from "../components/Card";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("events/")
      .then(res => setEvents(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map(event => <Card key={event.id} item={event} type="events" />)}
    </div>
  );
};

export default EventList;
