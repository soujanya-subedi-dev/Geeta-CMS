import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import client from "../api/client.js";
import DetailLayout from "../layouts/DetailLayout.jsx";

function NoticeDetail() {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    client
      .get(`notices/${id}/`)
      .then((response) => setNotice(response.data))
      .finally(() => setLoading(false));
  }, [id]);

  const meta = useMemo(() => {
    if (!notice) return "";
    return `Published ${new Date(notice.published_date).toLocaleDateString()}`;
  }, [notice]);

  const formattedContent = useMemo(() => {
    if (!notice?.description) return "";
    return notice.description.replace(/\n/g, "<br />");
  }, [notice]);

  if (loading) {
    return <div className="py-24 text-center text-gray-500">Loading notice...</div>;
  }

  if (!notice) {
    return <div className="py-24 text-center text-gray-500">Notice not found.</div>;
  }

  const actions = notice.attachment
    ? [
        <a
          key="download"
          href={notice.attachment}
          className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2 text-white font-semibold hover:bg-blue-700"
        >
          Download attachment
        </a>,
      ]
    : null;

  return (
    <DetailLayout
      title={notice.title}
      meta={meta}
      content={formattedContent}
      actions={actions}
    />
  );
}

export default NoticeDetail;
