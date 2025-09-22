// src/pages/Blog.jsx
import ListLayout from "../layouts/ListLayout";

export default function Blog() {
  const blogPosts = [
    { title: "First Blog", description: "Intro blog", image: "/img1.jpg", link: "/blog/1" },
    { title: "Second Blog", description: "Another blog", image: "/img2.jpg", link: "/blog/2" },
  ];

  return <ListLayout title="Blog" items={blogPosts} />;
}
