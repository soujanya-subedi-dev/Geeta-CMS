// src/pages/BlogDetail.jsx
import DetailLayout from "../layouts/DetailLayout";
import Comments from "../components/Comments";

export default function BlogDetail() {
  return (
    <DetailLayout
      title="First Blog"
      image="/img1.jpg"
      date="2025-09-22"
      author="Soujanya"
      content={<p>This is the blog content...</p>}
      comments={<Comments />}
    />
  );
}
