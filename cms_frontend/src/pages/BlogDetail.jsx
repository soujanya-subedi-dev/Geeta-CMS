import { Alert } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import Comments from "../components/Comments.jsx";
import DetailLayout from "../layouts/DetailLayout.jsx";
import api from "../api/client.js";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get(`blog/${slug}/`);
        setBlog(data);
      } catch (err) {
        setError("Unable to load this article. It may have been unpublished or removed.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const meta = useMemo(() => {
    if (!blog) return [];
    const published = blog.created_at ? new Date(blog.created_at).toLocaleDateString() : undefined;
    const updated =
      blog.updated_at && blog.updated_at !== blog.created_at
        ? new Date(blog.updated_at).toLocaleDateString()
        : undefined;
    return [blog.author && `By ${blog.author}`, published && `Published ${published}`, updated && `Updated ${updated}`].filter(
      Boolean
    );
  }, [blog]);

  const htmlContent = useMemo(() => {
    if (!blog?.content) return "";
    return blog.content.replace(/\n/g, "<br />");
  }, [blog]);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <DetailLayout
      title={blog?.title}
      meta={meta}
      image={blog?.image}
      content={htmlContent}
      loading={loading}
    >
      {blog && <Comments blogId={blog.id} initialComments={blog.comments ?? []} />}
    </DetailLayout>
  );
};

export default BlogDetail;
