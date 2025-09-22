import { Alert } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import DetailLayout from "../layouts/DetailLayout.jsx";
import api from "../api/client.js";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get(`events/${id}/`);
        setEvent(data);
      } catch (err) {
        setError("The requested event could not be found.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const meta = useMemo(() => {
    if (!event) return [];
    const date = event.date
      ? new Date(event.date).toLocaleDateString(undefined, { dateStyle: "long" })
      : "Date to be announced";
    return [date, event.location && `Location: ${event.location}`].filter(Boolean);
  }, [event]);

  const links = useMemo(() => {
    if (!event?.registration_link) return [];
    return [
      {
        label: "Register Now",
        href: event.registration_link,
      },
    ];
  }, [event]);

  const htmlContent = useMemo(() => {
    if (!event?.description) return "";
    return event.description.replace(/\n/g, "<br />");
  }, [event]);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <DetailLayout
      title={event?.title}
      meta={meta}
      image={event?.image}
      content={htmlContent}
      links={links}
      loading={loading}
    />
  );
};

export default EventDetail;
