import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";

const BlogDetail = () => {
  const { slug } = useParams();
  const { user } = useContext(AuthContext);
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");

  const fetchBlog = async () => {
    try {
      const res = await API.get(`blogs/${slug}/`);
      setBlog(res.data);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchBlog(); }, [slug]);

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await API.post("comments/", { blog: blog.id, text: comment });
      setComment("");
      fetchBlog();
    } catch (err) { console.log(err); alert("Login required to comment"); }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      {blog.featured_image && <img src={blog.featured_image} alt={blog.title} className="mb-4 w-full rounded"/>}
      <p className="mb-4">{blog.content}</p>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Comments</h2>
        <form onSubmit={handleComment} className="flex flex-col gap-2 mb-4">
          <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Write a comment" className="border p-2 rounded"/>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
        </form>

        {blog.comments.length === 0 && <p>No comments yet</p>}
        {blog.comments.map(c => (
          <div key={c.id} className="border p-2 rounded mb-2">
            <p className="font-bold">{c.user || "Anonymous"}</p>
            <p>{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogDetail;
