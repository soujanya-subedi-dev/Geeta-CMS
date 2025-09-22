import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const NoticeDetail = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    API.get(`notices/${id}/`)
      .then(res => setNotice(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!notice) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{notice.title}</h1>
      <p><strong>Published:</strong> {notice.published_date}</p>
      {notice.expires_at && <p><strong>Expires:</strong> {notice.expires_at}</p>}
      {notice.file && <a href={notice.file} target="_blank" className="text-blue-500 hover:underline">Download File</a>}
    </div>
  );
};

export default NoticeDetail;
