import { useEffect, useState } from "react";

import Card from "../components/Card.jsx";
import ListLayout from "../layouts/ListLayout.jsx";
import api from "../api/client.js";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get("blog/");
        setBlogs(data.results ?? data);
      } catch (err) {
        setError("We were unable to load blog posts. Please try again shortly.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <ListLayout
      title="Insights & Stories"
      description="Stay updated with the latest news, operational insights, and success stories from Geeta Aviation."
      items={blogs}
      loading={loading}
      error={error}
      emptyMessage="No blog articles have been published yet."
      renderCard={(blog) => {
        const summary = blog.content
          ? `${blog.content.slice(0, 160)}${blog.content.length > 160 ? "..." : ""}`
          : "";

        return (
          <Card
            title={blog.title}
            subtitle={`By ${blog.author}`}
          description={summary}
            image={blog.image}
            to={`/blog/${blog.slug}`}
            actionText="Read Article"
          />
        );
      }}
    />
  );
};

export default Blog;
