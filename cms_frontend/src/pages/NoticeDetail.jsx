import { Alert } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import DetailLayout from "../layouts/DetailLayout.jsx";
import api from "../api/client.js";

const NoticeDetail = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotice = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get(`notices/${id}/`);
        setNotice(data);
      } catch (err) {
        setError("This notice is no longer available.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [id]);

  const meta = useMemo(() => {
    if (!notice) return [];
    const published = notice.published_date
      ? new Date(notice.published_date).toLocaleDateString(undefined, { dateStyle: "long" })
      : undefined;
    return [published && `Published ${published}`].filter(Boolean);
  }, [notice]);

  const links = useMemo(() => {
    if (!notice?.attachment) return [];
    return [
      {
        label: "Download Attachment",
        href: notice.attachment,
      },
    ];
  }, [notice]);

  const htmlContent = useMemo(() => {
    if (!notice?.description) return "";
    return notice.description.replace(/\n/g, "<br />");
  }, [notice]);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <DetailLayout
      title={notice?.title}
      meta={meta}
      content={htmlContent}
      links={links}
      loading={loading}
    />
  );
};

export default NoticeDetail;
