import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

function Sidebar() {
  const { isAuthenticated, user, isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <aside className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full bg-blue-600 px-4 py-2 text-white shadow-lg transition hover:bg-blue-700"
      >
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <div className="w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Quick Links</h2>
            <p className="text-sm text-gray-500">
              {isAuthenticated ? `Logged in as ${user?.username || "User"}` : "Access your account"}
            </p>
          </div>
          <div className="space-y-2">
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="block rounded-lg border border-blue-100 px-3 py-2 text-center text-blue-700 hover:bg-blue-50"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block rounded-lg border border-blue-100 px-3 py-2 text-center text-blue-700 hover:bg-blue-50"
                >
                  Sign Up
                </Link>
              </>
            )}
            {isAuthenticated && (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="w-full rounded-lg border border-red-100 px-3 py-2 text-center text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            )}
            {isAdmin && (
              <>
                <Link
                  to="/admin"
                  className="block rounded-lg border border-emerald-100 px-3 py-2 text-center text-emerald-600 hover:bg-emerald-50"
                >
                  Admin Panel
                </Link>
                <Link
                  to="/admin/blogs"
                  className="block rounded-lg border border-gray-200 px-3 py-2 text-center text-gray-700 hover:bg-gray-50"
                >
                  Manage Blogs
                </Link>
                <Link
                  to="/admin/events"
                  className="block rounded-lg border border-gray-200 px-3 py-2 text-center text-gray-700 hover:bg-gray-50"
                >
                  Manage Events
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
