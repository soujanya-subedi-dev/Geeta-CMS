import { useEffect, useState } from "react";

import client from "../api/client.js";
import CardList from "../components/CardList.jsx";
import ListLayout from "../layouts/ListLayout.jsx";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .get("testimonials/")
      .then((response) => setTestimonials(response.data.results || response.data))
      .finally(() => setLoading(false));
  }, []);

  const getDescription = (item) => {
    if (!item.message) return "";
    return item.message.length > 160 ? `${item.message.slice(0, 160)}...` : item.message;
  };

  return (
    <ListLayout
      title="Voices of Geeta Aviation"
      subtitle="Hear from our students, partners, and industry experts about their experiences."
    >
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-500">Loading testimonials...</div>
      ) : (
        <CardList
          items={testimonials}
          renderMeta={(item) => item.designation}
          getDescription={getDescription}
          getImage={(item) => item.image}
          getTitle={(item) => item.name}
          getLink={(item) => `/testimonials/${item.id}`}
          actionLabel="Read story"
        />
      )}
    </ListLayout>
  );
}

export default Testimonials;
