import { useEffect, useState } from "react";

import client from "../api/client.js";
import CardList from "../components/CardList.jsx";
import ListLayout from "../layouts/ListLayout.jsx";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .get("blogs/")
      .then((response) => setBlogs(response.data.results || response.data))
      .finally(() => setLoading(false));
  }, []);

  const getExcerpt = (item) => {
    const plain = item.content ? item.content.replace(/<[^>]+>/g, "") : "";
    return plain.length > 160 ? `${plain.slice(0, 160)}...` : plain;
  };

  return (
    <ListLayout
      title="Geeta Aviation Insights"
      subtitle="Explore stories, updates, and expert advice from the Geeta Aviation community."
    >
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-500">Loading posts...</div>
      ) : (
        <CardList
          items={blogs}
          renderMeta={(item) => new Date(item.created_at).toLocaleDateString()}
          getDescription={getExcerpt}
          getImage={(item) => item.featured_image}
          getTitle={(item) => item.title}
          getLink={(item) => `/blogs/${item.slug}`}
        />
      )}
    </ListLayout>
  );
}

export default Blog;
