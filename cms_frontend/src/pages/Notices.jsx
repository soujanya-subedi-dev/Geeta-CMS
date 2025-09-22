import { useEffect, useState } from "react";

import Card from "../components/Card.jsx";
import ListLayout from "../layouts/ListLayout.jsx";
import api from "../api/client.js";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get("notices/");
        setNotices(data.results ?? data);
      } catch (err) {
        setError("We cannot fetch notices right now. Please refresh and try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  return (
    <ListLayout
      title="Official Notices"
      description="Stay informed about policy changes, announcements, and operational advisories from Geeta Aviation."
      items={notices}
      loading={loading}
      error={error}
      emptyMessage="No notices have been posted yet."
      renderCard={(notice) => {
        const published = notice.published_date
          ? new Date(notice.published_date).toLocaleDateString(undefined, { dateStyle: "medium" })
          : "Upcoming";
        const summary = notice.description
          ? `${notice.description.slice(0, 140)}${notice.description.length > 140 ? "..." : ""}`
          : "";
        return (
          <Card
            title={notice.title}
            subtitle={`Published ${published}`}
            description={summary}
            image={undefined}
            to={`/notices/${notice.id}`}
            actionText="Read Notice"
          />
        );
      }}
    />
  );
};

export default Notices;
