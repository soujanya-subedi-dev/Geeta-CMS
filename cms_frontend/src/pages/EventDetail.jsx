import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import client from "../api/client.js";
import DetailLayout from "../layouts/DetailLayout.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function EventDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", age: "", interested: true });
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    client
      .get(`events/${id}/`)
      .then((response) => setEvent(response.data))
      .finally(() => setLoading(false));
  }, [id]);

  const meta = useMemo(() => {
    if (!event) return "";
    const start = new Date(event.start).toLocaleString();
    const end = event.end ? ` – ${new Date(event.end).toLocaleString()}` : "";
    return `${start}${end}${event.location ? ` • ${event.location}` : ""}`;
  }, [event]);

  const formattedContent = useMemo(() => {
    if (!event?.description) return "";
    return event.description.replace(/\n/g, "<br />");
  }, [event]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (submission) => {
    submission.preventDefault();
    if (!isAuthenticated) {
      setFeedback("Please log in to register for events.");
      return;
    }
    try {
      setSubmitting(true);
      setFeedback("");
      await client.post(`events/${id}/register/`, {
        name: form.name,
        contact: form.contact,
        age: form.age ? Number(form.age) : null,
        interested: form.interested,
      });
      setFeedback("Registration received! We'll be in touch soon.");
      setForm({ name: "", contact: "", age: "", interested: true });
    } catch (error) {
      setFeedback("Unable to submit registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="py-24 text-center text-gray-500">Loading event...</div>;
  }

  if (!event) {
    return <div className="py-24 text-center text-gray-500">Event not found.</div>;
  }

  const actions = [
    <button
      key="register"
      type="button"
      onClick={() => setRegisterOpen((prev) => !prev)}
      className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2 text-white font-semibold hover:bg-blue-700"
    >
      {registerOpen ? "Close" : "Register"}
    </button>,
  ];

  return (
    <DetailLayout title={event.title} meta={meta} content={formattedContent} actions={actions}>
      {registerOpen && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          {feedback && <p className="text-sm text-blue-600">{feedback}</p>}
          {!isAuthenticated && (
            <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
              Please log in before submitting the registration form.
            </p>
          )}
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
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact" className="text-sm font-medium text-gray-700">
                Contact
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                value={form.contact}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="age" className="text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
                min="0"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="interested"
                checked={form.interested}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300"
              />
              I would like to receive more information.
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting || !isAuthenticated}
              className="rounded-lg bg-emerald-600 px-5 py-2 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Registration"}
            </button>
          </div>
        </form>
      )}
    </DetailLayout>
  );
}

export default EventDetail;
