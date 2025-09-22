import { useEffect, useState } from "react";

import client from "../api/client.js";

function Comments({ blogId }) {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!blogId) return;
    client
      .get("comments/", { params: { blog: blogId } })
      .then((response) => setComments(response.data))
      .catch(() => setComments([]));
  }, [blogId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("All fields are required.");
      return;
    }
    try {
      setSubmitting(true);
      setError("");
      const { data } = await client.post("comments/", {
        blog: blogId,
        ...form,
      });
      setComments((prev) => [data, ...prev]);
      setForm({ name: "", email: "", message: "" });
    } catch (submissionError) {
      setError("Unable to submit comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900">Comments</h3>
        <p className="text-sm text-gray-600">Share your thoughts with the Geeta Aviation community.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl shadow-sm p-6">
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
            placeholder="Share your thoughts"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-2 transition disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Post Comment"}
          </button>
        </div>
      </form>
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500">No comments yet. Be the first to share!</p>
        ) : (
          comments.map((comment) => (
            <article key={comment.id} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{comment.name}</p>
                  <p className="text-xs text-gray-500">{comment.email}</p>
                </div>
                <p className="text-xs text-gray-400">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
              <p className="mt-3 text-sm text-gray-700 whitespace-pre-line">{comment.message}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default Comments;
