import { useEffect, useState } from "react";

import Card from "../components/Card.jsx";
import ListLayout from "../layouts/ListLayout.jsx";
import api from "../api/client.js";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get("testimonials/");
        setTestimonials(data.results ?? data);
      } catch (err) {
        setError("Testimonials are not available at this time. Please check back soon.");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <ListLayout
      title="Voices of Confidence"
      description="Hear from our pilots, partners, and students about their experience with Geeta Aviation."
      items={testimonials}
      loading={loading}
      error={error}
      emptyMessage="There are no testimonials to display yet."
      renderCard={(testimonial) => {
        const summary = testimonial.message
          ? `${testimonial.message.slice(0, 140)}${testimonial.message.length > 140 ? "..." : ""}`
          : "";
        return (
          <Card
            title={testimonial.name}
            subtitle={testimonial.designation || "Geeta Aviation"}
            description={summary}
            image={testimonial.image}
            to={`/testimonials/${testimonial.id}`}
            actionText="Read Story"
          />
        );
      }}
    />
  );
};

export default Testimonials;
