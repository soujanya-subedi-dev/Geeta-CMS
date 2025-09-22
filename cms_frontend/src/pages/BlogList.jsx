import { useEffect, useState } from "react";
import API from "../api/axios";
import Card from "../components/Card";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get("blogs/")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {blogs.map((blog) => (
        <Card key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
