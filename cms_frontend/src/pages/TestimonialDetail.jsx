import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import client from "../api/client.js";
import DetailLayout from "../layouts/DetailLayout.jsx";

function TestimonialDetail() {
  const { id } = useParams();
  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    client
      .get(`testimonials/${id}/`)
      .then((response) => setTestimonial(response.data))
      .finally(() => setLoading(false));
  }, [id]);

  const meta = useMemo(() => {
    if (!testimonial) return "";
    return testimonial.designation || "Geeta Aviation";
  }, [testimonial]);

  const formattedContent = useMemo(() => {
    if (!testimonial?.message) return "";
    return testimonial.message.replace(/\n/g, "<br />");
  }, [testimonial]);

  if (loading) {
    return <div className="py-24 text-center text-gray-500">Loading testimonial...</div>;
  }

  if (!testimonial) {
    return <div className="py-24 text-center text-gray-500">Testimonial not found.</div>;
  }

  const actions = testimonial.video_link
    ? [
        <a
          key="watch"
          href={testimonial.video_link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-lg bg-amber-500 px-5 py-2 text-white font-semibold hover:bg-amber-600"
        >
          Watch video
        </a>,
      ]
    : null;

  return (
    <DetailLayout
      title={testimonial.name}
      image={testimonial.image}
      meta={meta}
      content={formattedContent}
      actions={actions}
    />
  );
}

export default TestimonialDetail;
