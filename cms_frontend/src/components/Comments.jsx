import { useEffect, useState } from "react";

import client from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

function Comments({ blogSlug }) {
  const { isAuthenticated, user, isAdmin } = useAuth();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  const loadComments = () => {
    if (!blogSlug) return;
    client
      .get(`blogs/${blogSlug}/comments/`)
      .then((response) => setComments(response.data))
      .catch(() => setComments([]));
  };

  useEffect(() => {
    loadComments();
  }, [blogSlug]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!content.trim()) {
      setFeedback("Please enter a comment.");
      return;
    }
    try {
      setSubmitting(true);
      setFeedback("");
      await client.post(`blogs/${blogSlug}/comments/`, { content });
      setContent("");
      setFeedback("Comment submitted for moderation.");
      if (isAdmin) {
        loadComments();
      }
    } catch (error) {
      setFeedback("Unable to submit comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900">Comments</h3>
        <p className="text-sm text-gray-600">Join the discussion with our community.</p>
      </div>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl shadow-sm p-6">
          {feedback && <p className="text-sm text-blue-600">{feedback}</p>}
          <div className="flex flex-col gap-2">
            <label htmlFor="comment" className="text-sm font-medium text-gray-700">
              Share your thoughts
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={4}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
              placeholder="Write your comment"
              required
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Posting as {user?.username}</span>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Comment"}
            </button>
          </div>
        </form>
      ) : (
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-6 text-sm text-blue-800">
          Please log in to share your comment.
        </div>
      )}

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <article key={comment.id} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{comment.user || "Community member"}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.created_at).toLocaleString()}
                  </p>
                </div>
                {isAdmin && (
                  <span className="text-xs font-medium uppercase text-gray-500">
                    {comment.approved ? "Approved" : comment.rejected ? "Rejected" : "Pending"}
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm text-gray-700 whitespace-pre-line">{comment.content}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default Comments;
