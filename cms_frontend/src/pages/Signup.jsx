import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

function Signup() {
  const { signup, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    bio: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError("");
      await signup({
        username: form.username,
        email: form.email,
        password: form.password,
        first_name: form.first_name,
        last_name: form.last_name,
        profile: { phone: form.phone, bio: form.bio },
      });
      navigate("/", { replace: true });
    } catch (signupError) {
      setError("Unable to create account. Please review your details and try again.");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-12">
      <div className="w-full max-w-2xl rounded-3xl border border-blue-100 bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-900">Create your account</h1>
        <p className="mt-2 text-sm text-gray-600">Join the Geeta Aviation community to comment and register for events.</p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
          {error && <p className="sm:col-span-2 text-sm text-red-600">{error}</p>}
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="first_name" className="text-sm font-medium text-gray-700">
              First name
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              value={form.first_name}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="last_name" className="text-sm font-medium text-gray-700">
              Last name
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              value={form.last_name}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="sm:col-span-2 flex flex-col gap-2">
            <label htmlFor="bio" className="text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={form.bio}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
              placeholder="Tell us a little about yourself"
            />
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
