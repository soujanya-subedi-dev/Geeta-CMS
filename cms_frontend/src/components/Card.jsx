import { Link } from "react-router-dom";

function Card({ title, description, image, meta, to, actionLabel }) {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      {image ? (
        <img
          src={image}
          alt={title}
          className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="h-48 w-full bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 flex items-center justify-center">
          <span className="text-blue-800 font-semibold text-xl">Geeta Aviation</span>
        </div>
      )}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-blue-700">{meta}</p>
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700">{title}</h3>
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
        {to && (
          <Link
            to={to}
            className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            {actionLabel || "Read more"}
          </Link>
        )}
      </div>
    </div>
  );
}

export default Card;
