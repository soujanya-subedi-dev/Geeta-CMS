import { Alert, Avatar, Button, Stack, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";

import api from "../api/client.js";

const formatDate = (value) =>
  new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

const Comments = ({ blogId, initialComments }) => {
  const [comments, setComments] = useState(initialComments);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: null, message: "" });

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const isAuthenticated = useMemo(() => Boolean(localStorage.getItem("accessToken")), []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.message.trim()) {
      setFeedback({ type: "error", message: "Please share your thoughts before submitting." });
      return;
    }
    if (!isAuthenticated && !form.email.trim()) {
      setFeedback({ type: "error", message: "Email is required for guest comments." });
      return;
    }

    setSubmitting(true);
    setFeedback({ type: null, message: "" });

    try {
      const payload = { blog: blogId, message: form.message };
      if (form.name) payload.name = form.name;
      if (form.email) payload.email = form.email;
      const { data } = await api.post("comments/", payload);
      setComments((prev) => [data, ...prev]);
      setForm({ name: "", email: "", message: "" });
      setFeedback({ type: "success", message: "Comment posted successfully." });
    } catch (error) {
      const message = error.response?.data?.detail || "Unable to post comment. Please try again.";
      setFeedback({ type: "error", message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Stack spacing={4} className="mt-10">
      <div>
        <Typography variant="h5" className="font-semibold text-gray-900 mb-3">
          Comments
        </Typography>
        {feedback.type && <Alert severity={feedback.type}>{feedback.message}</Alert>}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@example.com"
              fullWidth
              required={!isAuthenticated}
            />
          </Stack>
          <TextField
            label="Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Share your insights with the Geeta Aviation community..."
            fullWidth
            multiline
            minRows={4}
          />
          <div className="flex items-center justify-between gap-4">
            <Typography variant="body2" className="text-gray-500">
              {isAuthenticated
                ? "You are commenting as an authenticated member."
                : "Login for quicker submissions or provide your email as a guest."}
            </Typography>
            <Button type="submit" variant="contained" color="primary" disabled={submitting}>
              {submitting ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </form>
      </div>
      <Stack spacing={3}>
        {comments.length === 0 && (
          <Typography variant="body2" className="text-gray-500">
            Be the first to share your experience.
          </Typography>
        )}
        {comments.map((comment) => (
          <Stack
            key={comment.id}
            direction="row"
            spacing={2}
            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100"
          >
            <Avatar className="bg-blue-100 text-blue-900 font-semibold">
              {(comment.display_name || comment.name || comment.email || "G").charAt(0).toUpperCase()}
            </Avatar>
            <Stack spacing={1}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1} className="items-start sm:items-center">
                <Typography variant="subtitle2" className="text-gray-900 font-semibold">
                  {comment.display_name || comment.name || comment.email || "Guest"}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  {formatDate(comment.created_at)}
                </Typography>
              </Stack>
              <Typography variant="body2" className="text-gray-700 leading-relaxed">
                {comment.message}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

Comments.propTypes = {
  blogId: PropTypes.number.isRequired,
  initialComments: PropTypes.arrayOf(PropTypes.object),
};

Comments.defaultProps = {
  initialComments: [],
};

export default Comments;
