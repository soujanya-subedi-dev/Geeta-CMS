import { Link } from "react-router-dom";

const Card = ({ item, type }) => {
  // type = "blog" | "event" | "testimonial" | "notice"
  const title = item.title || item.name;
  const excerpt = item.excerpt || item.description || item.message || "";
  const image = item.featured_image || item.image || item.photo || null;
  const slug = item.slug || item.id;

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      {image && <img src={image} alt={title} className="mb-2 w-full h-48 object-cover rounded" />}
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="mb-2">{excerpt.length > 100 ? excerpt.slice(0, 100) + "..." : excerpt}</p>
      <Link to={`/${type}/${slug}`} className="text-blue-500 hover:underline">
        Read More
      </Link>
    </div>
  );
};

export default Card;
