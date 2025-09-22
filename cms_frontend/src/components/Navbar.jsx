import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { useAuth } from "../context/AuthContext.jsx";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Blogs", path: "/blogs" },
  { label: "Events", path: "/events" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Notices", path: "/notices" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  return (
    <header className="bg-white/90 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-primary-600">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-white font-bold">
              GA
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-lg text-gray-900">Geeta Aviation</span>
              <span className="text-sm text-gray-500">Aviation CMS</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `transition-colors hover:text-blue-700 ${
                    isActive ? "text-blue-700" : "text-gray-600"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `transition-colors hover:text-blue-700 ${
                    isActive ? "text-blue-700" : "text-emerald-600"
                  }`
                }
              >
                Admin Panel
              </NavLink>
            )}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600">Hello, {user?.first_name || user?.username}</span>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-full border border-blue-200 px-3 py-1 text-sm text-blue-700 hover:bg-blue-50"
                >
                  Login
                </Link>
                <Link to="/signup" className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {open ? <CloseIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `block text-base font-medium transition-colors ${
                    isActive ? "text-blue-700" : "text-gray-700"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `block text-base font-medium transition-colors ${
                    isActive ? "text-blue-700" : "text-emerald-600"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                Admin Panel
              </NavLink>
            )}
            <div className="border-t border-gray-200 pt-3 space-y-2">
              {isAuthenticated ? (
                <>
                  <p className="text-sm text-gray-500">Signed in as {user?.username}</p>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-center text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg border border-blue-200 px-3 py-2 text-center text-blue-700 hover:bg-blue-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg bg-blue-600 px-3 py-2 text-center text-white hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
