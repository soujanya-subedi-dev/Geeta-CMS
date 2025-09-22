import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const TestimonialDetail = () => {
  const { id } = useParams();
  const [testimonial, setTestimonial] = useState(null);

  useEffect(() => {
    API.get(`testimonials/${id}/`)
      .then(res => setTestimonial(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!testimonial) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{testimonial.name}</h1>
      {testimonial.photo && <img src={testimonial.photo} alt={testimonial.name} className="mb-4 w-48 h-48 object-cover rounded-full" />}
      <p>{testimonial.message}</p>
    </div>
  );
};

export default TestimonialDetail;
