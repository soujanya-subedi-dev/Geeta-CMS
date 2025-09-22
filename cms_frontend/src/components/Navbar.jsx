// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "Events", path: "/events" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Notices", path: "/notices" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Geeta CMS</Link>
      <ul className="flex gap-6">
        {links.map((link) => (
          <li key={link.path}>
            <Link to={link.path} className="hover:text-gray-300">{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
