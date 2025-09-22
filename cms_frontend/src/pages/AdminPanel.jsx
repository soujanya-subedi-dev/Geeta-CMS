import { useEffect, useMemo, useState } from "react";
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";

import client from "../api/client.js";

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "blogs", label: "Blogs" },
  { key: "events", label: "Events" },
  { key: "testimonials", label: "Testimonials" },
  { key: "notices", label: "Notices" },
  { key: "comments", label: "Comments" },
  { key: "registrations", label: "Event Registrations" },
];

const initialForms = {
  blogs: { title: "", content: "", featured_image: null },
  events: { title: "", description: "", start: "", end: "", location: "" },
  testimonials: { name: "", designation: "", message: "", video_link: "" },
  notices: { title: "", description: "", published_date: "" },
};

function AdminHome() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900">Administrator tools</h2>
      <p className="text-sm text-gray-600">
        Use the navigation to manage all content types. Only approved comments are shown publicly; pending comments appear in the
        moderation tab.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tabs
          .filter((tab) => tab.key !== "overview")
          .map((tab) => (
            <Link
              key={tab.key}
              to={tab.key}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-300"
            >
              <h3 className="text-lg font-semibold text-gray-900">{tab.label}</h3>
              <p className="mt-2 text-sm text-gray-500">Manage {tab.label.toLowerCase()}.</p>
            </Link>
          ))}
      </div>
    </div>
  );
}

function AdminPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState({ blogs: [], events: [], testimonials: [], notices: [], comments: [], registrations: [] });
  const [forms, setForms] = useState(initialForms);
  const [editing, setEditing] = useState({ blogs: null, events: null, testimonials: null, notices: null });
  const [selectedEventForRegistrations, setSelectedEventForRegistrations] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    navigate(activeTab === "overview" ? "." : activeTab, { replace: true });
    setMessage("");
  }, [activeTab, navigate]);

  useEffect(() => {
    const path = location.pathname.replace(/.*admin\/?/, "");
    const resolved = path ? path.replace(/\/$/, "") : "overview";
    if (tabs.some((tab) => tab.key === resolved) && resolved !== activeTab) {
      setActiveTab(resolved);
    }
  }, [location.pathname, activeTab]);

  const fetchers = useMemo(
    () => ({
      blogs: () =>
        client.get("blogs/").then((response) => setData((prev) => ({ ...prev, blogs: response.data.results || response.data }))),
      events: () =>
        client.get("events/").then((response) => setData((prev) => ({ ...prev, events: response.data.results || response.data }))),
      testimonials: () =>
        client
          .get("testimonials/")
          .then((response) => setData((prev) => ({ ...prev, testimonials: response.data.results || response.data }))),
      notices: () =>
        client.get("notices/").then((response) => setData((prev) => ({ ...prev, notices: response.data.results || response.data }))),
      comments: () =>
        client.get("comments/").then((response) => setData((prev) => ({ ...prev, comments: response.data.results || response.data }))),
      registrations: () => {
        if (!selectedEventForRegistrations) {
          setData((prev) => ({ ...prev, registrations: [] }));
          return Promise.resolve();
        }
        return client
          .get(`events/${selectedEventForRegistrations}/registrations/`)
          .then((response) => setData((prev) => ({ ...prev, registrations: response.data })));
      },
    }),
    [selectedEventForRegistrations],
  );

  useEffect(() => {
    if (activeTab === "overview") return;
    if (activeTab === "registrations") {
      fetchers.events();
    }
    if (fetchers[activeTab]) {
      fetchers[activeTab]();
    }
  }, [activeTab, fetchers]);

  useEffect(() => {
    if (activeTab === "registrations" && selectedEventForRegistrations) {
      fetchers.registrations();
    }
  }, [activeTab, selectedEventForRegistrations, fetchers]);

  const handleFormChange = (tab, event) => {
    const { name, value } = event.target;
    setForms((prev) => ({ ...prev, [tab]: { ...prev[tab], [name]: value } }));
  };

  const resetForm = (tab) => {
    setForms((prev) => ({ ...prev, [tab]: initialForms[tab] }));
    setEditing((prev) => ({ ...prev, [tab]: null }));
  };

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    const payload = { title: forms.blogs.title, content: forms.blogs.content };
    try {
      if (editing.blogs) {
        await client.put(`blogs/${editing.blogs.slug}/`, payload);
        setMessage("Blog updated successfully.");
      } else {
        await client.post("blogs/", payload);
        setMessage("Blog created successfully.");
      }
      resetForm("blogs");
      fetchers.blogs();
    } catch (error) {
      setMessage("Failed to save blog.");
    }
  };

  const handleEventSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      title: forms.events.title,
      description: forms.events.description,
      start: forms.events.start,
      end: forms.events.end || null,
      location: forms.events.location,
    };
    try {
      if (editing.events) {
        await client.put(`events/${editing.events.id}/`, payload);
        setMessage("Event updated.");
      } else {
        await client.post("events/", payload);
        setMessage("Event created.");
      }
      resetForm("events");
      fetchers.events();
    } catch (error) {
      setMessage("Failed to save event.");
    }
  };

  const handleTestimonialSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      name: forms.testimonials.name,
      designation: forms.testimonials.designation,
      message: forms.testimonials.message,
      video_link: forms.testimonials.video_link,
    };
    try {
      if (editing.testimonials) {
        await client.put(`testimonials/${editing.testimonials.id}/`, payload);
        setMessage("Testimonial updated.");
      } else {
        await client.post("testimonials/", payload);
        setMessage("Testimonial created.");
      }
      resetForm("testimonials");
      fetchers.testimonials();
    } catch (error) {
      setMessage("Failed to save testimonial.");
    }
  };

  const handleNoticeSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      title: forms.notices.title,
      description: forms.notices.description,
      published_date: forms.notices.published_date,
    };
    try {
      if (editing.notices) {
        await client.put(`notices/${editing.notices.id}/`, payload);
        setMessage("Notice updated.");
      } else {
        await client.post("notices/", payload);
        setMessage("Notice created.");
      }
      resetForm("notices");
      fetchers.notices();
    } catch (error) {
      setMessage("Failed to save notice.");
    }
  };

  const handleDelete = async (tab, item) => {
    const endpoints = {
      blogs: () => client.delete(`blogs/${item.slug}/`),
      events: () => client.delete(`events/${item.id}/`),
      testimonials: () => client.delete(`testimonials/${item.id}/`),
      notices: () => client.delete(`notices/${item.id}/`),
    };
    try {
      await endpoints[tab]();
      setMessage(`${tab.slice(0, -1)} removed.`);
      fetchers[tab]();
    } catch (error) {
      setMessage("Unable to delete record.");
    }
  };

  const handleEdit = (tab, item) => {
    setEditing((prev) => ({ ...prev, [tab]: item }));
    if (tab === "blogs") {
      setForms((prev) => ({ ...prev, blogs: { title: item.title, content: item.content } }));
    } else if (tab === "events") {
      setForms((prev) => ({
        ...prev,
        events: {
          title: item.title,
          description: item.description,
          start: item.start?.slice(0, 16) || "",
          end: item.end ? item.end.slice(0, 16) : "",
          location: item.location || "",
        },
      }));
    } else if (tab === "testimonials") {
      setForms((prev) => ({
        ...prev,
        testimonials: {
          name: item.name,
          designation: item.designation || "",
          message: item.message,
          video_link: item.video_link || "",
        },
      }));
    } else if (tab === "notices") {
      setForms((prev) => ({
        ...prev,
        notices: {
          title: item.title,
          description: item.description,
          published_date: item.published_date,
        },
      }));
    }
  };

  const handleCommentAction = async (commentId, action) => {
    try {
      await client.post(`comments/${commentId}/${action}/`);
      setMessage(`Comment ${action}d.`);
      fetchers.comments();
    } catch (error) {
      setMessage("Unable to update comment status.");
    }
  };

  const renderBlogs = () => (
    <div className="space-y-6">
      <form onSubmit={handleBlogSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {editing.blogs ? "Edit blog" : "Create blog"}
          </h2>
          {editing.blogs && (
            <button type="button" onClick={() => resetForm("blogs")} className="text-sm text-gray-500 hover:text-gray-700">
              Cancel edit
            </button>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">Title</span>
            <input
              name="title"
              value={forms.blogs.title}
              onChange={(event) => handleFormChange("blogs", event)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
              required
            />
          </label>
        </div>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">Content</span>
          <textarea
            name="content"
            rows={6}
            value={forms.blogs.content}
            onChange={(event) => handleFormChange("blogs", event)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
            required
          />
        </label>
        <div className="flex justify-end">
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700">
            {editing.blogs ? "Update" : "Create"}
          </button>
        </div>
      </form>
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Updated</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.blogs.map((blog) => (
              <tr key={blog.id}>
                <td className="px-4 py-3 text-sm text-gray-700">{blog.title}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{new Date(blog.updated_at).toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-sm">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit("blogs", blog)}
                      className="rounded-lg border border-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete("blogs", blog)}
                      className="rounded-lg border border-red-200 px-3 py-1 text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <form onSubmit={handleEventSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">{editing.events ? "Edit event" : "Create event"}</h2>
          {editing.events && (
            <button type="button" onClick={() => resetForm("events")} className="text-sm text-gray-500 hover:text-gray-700">
              Cancel edit
            </button>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">Title</span>
            <input
              name="title"
              value={forms.events.title}
              onChange={(event) => handleFormChange("events", event)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
              required
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">Location</span>
            <input
              name="location"
              value={forms.events.location}
              onChange={(event) => handleFormChange("events", event)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
            />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">Start</span>
            <input
              type="datetime-local"
              name="start"
              value={forms.events.start}
              onChange={(event) => handleFormChange("events", event)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
              required
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">End</span>
            <input
              type="datetime-local"
              name="end"
              value={forms.events.end}
              onChange={(event) => handleFormChange("events", event)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
            />
          </label>
        </div>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">Description</span>
          <textarea
            name="description"
            rows={5}
            value={forms.events.description}
            onChange={(event) => handleFormChange("events", event)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
            required
          />
        </label>
        <div className="flex justify-end">
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700">
            {editing.events ? "Update" : "Create"}
          </button>
        </div>
      </form>
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Start</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Location</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.events.map((event) => (
              <tr key={event.id}>
                <td className="px-4 py-3 text-sm text-gray-700">{event.title}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{new Date(event.start).toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{event.location}</td>
                <td className="px-4 py-3 text-right text-sm">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit("events", event)}
                      className="rounded-lg border border-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete("events", event)}
                      className="rounded-lg border border-red-200 px-3 py-1 text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTestimonials = () => (
    <div className="space-y-6">
      <form
        onSubmit={handleTestimonialSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {editing.testimonials ? "Edit testimonial" : "Create testimonial"}
          </h2>
          {editing.testimonials && (
            <button
              type="button"
              onClick={() => resetForm("testimonials")}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel edit
            </button>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">Name</span>
            <input
              name="name"
              value={forms.testimonials.name}
              onChange={(event) => handleFormChange("testimonials", event)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
              required
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">Designation</span>
            <input
              name="designation"
              value={forms.testimonials.designation}
              onChange={(event) => handleFormChange("testimonials", event)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
            />
          </label>
        </div>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">Message</span>
          <textarea
            name="message"
            rows={4}
            value={forms.testimonials.message}
            onChange={(event) => handleFormChange("testimonials", event)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">Video link</span>
          <input
            name="video_link"
            value={forms.testimonials.video_link}
            onChange={(event) => handleFormChange("testimonials", event)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
          />
        </label>
        <div className="flex justify-end">
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700">
            {editing.testimonials ? "Update" : "Create"}
          </button>
        </div>
      </form>
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Designation</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.testimonials.map((testimonial) => (
              <tr key={testimonial.id}>
                <td className="px-4 py-3 text-sm text-gray-700">{testimonial.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{testimonial.designation}</td>
                <td className="px-4 py-3 text-right text-sm">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit("testimonials", testimonial)}
                      className="rounded-lg border border-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete("testimonials", testimonial)}
                      className="rounded-lg border border-red-200 px-3 py-1 text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderNotices = () => (
    <div className="space-y-6">
      <form onSubmit={handleNoticeSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">{editing.notices ? "Edit notice" : "Create notice"}</h2>
          {editing.notices && (
            <button type="button" onClick={() => resetForm("notices")} className="text-sm text-gray-500 hover:text-gray-700">
              Cancel edit
            </button>
          )}
        </div>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">Title</span>
          <input
            name="title"
            value={forms.notices.title}
            onChange={(event) => handleFormChange("notices", event)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">Description</span>
          <textarea
            name="description"
            rows={4}
            value={forms.notices.description}
            onChange={(event) => handleFormChange("notices", event)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">Published date</span>
          <input
            type="date"
            name="published_date"
            value={forms.notices.published_date}
            onChange={(event) => handleFormChange("notices", event)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
            required
          />
        </label>
        <div className="flex justify-end">
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700">
            {editing.notices ? "Update" : "Create"}
          </button>
        </div>
      </form>
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Published</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.notices.map((notice) => (
              <tr key={notice.id}>
                <td className="px-4 py-3 text-sm text-gray-700">{notice.title}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{notice.published_date}</td>
                <td className="px-4 py-3 text-right text-sm">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit("notices", notice)}
                      className="rounded-lg border border-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete("notices", notice)}
                      className="rounded-lg border border-red-200 px-3 py-1 text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderComments = () => (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Comment</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Author</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.comments.map((comment) => (
            <tr key={comment.id}>
              <td className="px-4 py-3 text-sm text-gray-700">{comment.content}</td>
              <td className="px-4 py-3 text-sm text-gray-500">{comment.user}</td>
              <td className="px-4 py-3 text-sm text-gray-500">
                {comment.approved ? "Approved" : comment.rejected ? "Rejected" : "Pending"}
              </td>
              <td className="px-4 py-3 text-right text-sm">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleCommentAction(comment.id, "approve")}
                    className="rounded-lg border border-emerald-200 px-3 py-1 text-emerald-600 hover:bg-emerald-50"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCommentAction(comment.id, "reject")}
                    className="rounded-lg border border-red-200 px-3 py-1 text-red-600 hover:bg-red-50"
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderRegistrations = () => (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium text-gray-700">Select event</label>
        <select
          className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
          value={selectedEventForRegistrations || ""}
          onChange={(event) => {
            const value = event.target.value || null;
            setSelectedEventForRegistrations(value ? Number(value) : null);
          }}
        >
          <option value="">Choose an event</option>
          {data.events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => fetchers.registrations()}
          className="rounded-lg border border-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-50"
        >
          Load registrations
        </button>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Contact</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Interested</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.registrations.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-500">
                  No registrations yet.
                </td>
              </tr>
            ) : (
              data.registrations.map((registration) => (
                <tr key={registration.id}>
                  <td className="px-4 py-3 text-sm text-gray-700">{registration.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{registration.contact}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{registration.interested ? "Yes" : "No"}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(registration.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 space-y-6">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeTab === tab.key ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {message && <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">{message}</div>}

      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="blogs" element={renderBlogs()} />
        <Route path="events" element={renderEvents()} />
        <Route path="testimonials" element={renderTestimonials()} />
        <Route path="notices" element={renderNotices()} />
        <Route path="comments" element={renderComments()} />
        <Route path="registrations" element={renderRegistrations()} />
      </Routes>
    </section>
  );
}

export default AdminPanel;
