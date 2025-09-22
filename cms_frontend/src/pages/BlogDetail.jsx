import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import client from "../api/client.js";
import Comments from "../components/Comments.jsx";
import DetailLayout from "../layouts/DetailLayout.jsx";

function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    client
      .get(`blogs/${slug}/`)
      .then((response) => setBlog(response.data))
      .finally(() => setLoading(false));
  }, [slug]);

  const meta = useMemo(() => {
    if (!blog) return "";
    const created = new Date(blog.created_at).toLocaleDateString();
    return `Written by ${blog.author || "Geeta Aviation"} • ${created}`;
  }, [blog]);

  const formattedContent = useMemo(() => {
    if (!blog?.content) return "";
    return blog.content.replace(/\n/g, "<br />");
  }, [blog]);

  if (loading) {
    return <div className="py-24 text-center text-gray-500">Loading article...</div>;
  }

  if (!blog) {
    return <div className="py-24 text-center text-gray-500">Blog post not found.</div>;
  }

  return (
    <DetailLayout title={blog.title} image={blog.featured_image} meta={meta} content={formattedContent}>
      <Comments blogSlug={blog.slug} />
    </DetailLayout>
  );
}

export default BlogDetail;
