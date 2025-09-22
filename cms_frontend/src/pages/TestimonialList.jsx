import { useEffect, useState } from "react";
import API from "../api/axios";
import Card from "../components/Card";

const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    API.get("testimonials/")
      .then(res => setTestimonials(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {testimonials.map(t => <Card key={t.id} item={t} type="testimonials" />)}
    </div>
  );
};

export default TestimonialList;
