// src/layouts/DetailLayout.jsx
export default function DetailLayout({ title, image, date, author, content, link, comments }) {
  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      {image && <img src={image} alt={title} className="w-full rounded-lg mb-4" />}
      <p className="text-sm text-gray-500 mb-4">
        {date} {author && `• By ${author}`}
      </p>
      <div className="prose max-w-none mb-6">{content}</div>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
        >
          Visit Link
        </a>
      )}

      {comments && comments}
    </div>
  );
}
