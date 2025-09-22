import { Alert } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import DetailLayout from "../layouts/DetailLayout.jsx";
import api from "../api/client.js";

const TestimonialDetail = () => {
  const { id } = useParams();
  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTestimonial = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get(`testimonials/${id}/`);
        setTestimonial(data);
      } catch (err) {
        setError("We couldn't load this testimonial. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonial();
  }, [id]);

  const meta = useMemo(() => {
    if (!testimonial) return [];
    const published = testimonial.created_at
      ? new Date(testimonial.created_at).toLocaleDateString(undefined, { dateStyle: "medium" })
      : undefined;
    return [testimonial.designation, published && `Shared on ${published}`].filter(Boolean);
  }, [testimonial]);

  const links = useMemo(() => {
    if (!testimonial?.video_link) return [];
    return [
      {
        label: "Watch Video",
        href: testimonial.video_link,
      },
    ];
  }, [testimonial]);

  const htmlContent = useMemo(() => {
    if (!testimonial?.message) return "";
    return testimonial.message.replace(/\n/g, "<br />");
  }, [testimonial]);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <DetailLayout
      title={testimonial?.name}
      meta={meta}
      image={testimonial?.image}
      content={htmlContent}
      links={links}
      loading={loading}
    />
  );
};

export default TestimonialDetail;
