// src/components/Card.jsx
import { Link } from "react-router-dom";

export default function Card({ title, description, image, link }) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
      {image && <img src={image} alt={title} className="w-full h-48 object-cover" />}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        {link && (
          <Link to={link} className="text-blue-600 hover:underline text-sm">
            Read more →
          </Link>
        )}
      </div>
    </div>
  );
}
