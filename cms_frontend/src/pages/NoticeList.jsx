import { useEffect, useState } from "react";
import API from "../api/axios";
import Card from "../components/Card";

const NoticeList = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    API.get("notices/")
      .then(res => setNotices(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notices.map(n => <Card key={n.id} item={n} type="notices" />)}
    </div>
  );
};

export default NoticeList;
