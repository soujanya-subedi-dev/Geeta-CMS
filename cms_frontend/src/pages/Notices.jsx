import { useEffect, useState } from "react";

import client from "../api/client.js";
import CardList from "../components/CardList.jsx";
import ListLayout from "../layouts/ListLayout.jsx";

function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .get("notices/")
      .then((response) => setNotices(response.data.results || response.data))
      .finally(() => setLoading(false));
  }, []);

  const getDescription = (item) => {
    if (!item.description) return "";
    return item.description.length > 160 ? `${item.description.slice(0, 160)}...` : item.description;
  };

  return (
    <ListLayout
      title="Latest Notices"
      subtitle="Stay informed with important updates, policies, and announcements from Geeta Aviation."
    >
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-500">Loading notices...</div>
      ) : (
        <CardList
          items={notices}
          renderMeta={(item) => new Date(item.published_date).toLocaleDateString()}
          getDescription={getDescription}
          getTitle={(item) => item.title}
          getLink={(item) => `/notices/${item.id}`}
          actionLabel="View notice"
        />
      )}
    </ListLayout>
  );
}

export default Notices;
