import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <div className="font-bold text-xl"><Link to="/">Geeta CMS</Link></div>
      <div className="flex gap-4">
        <Link to="/blogs" className="hover:underline">Blogs</Link>
        <Link to="/events" className="hover:underline">Events</Link>
        <Link to="/testimonials" className="hover:underline">Testimonials</Link>
        <Link to="/notices" className="hover:underline">Notices</Link>
        {user ? (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        ) : (
          <>
            <Link to="/login" className="bg-green-500 px-3 py-1 rounded">Login</Link>
            <Link to="/signup" className="bg-yellow-500 px-3 py-1 rounded">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
