import { Container } from "@mui/material";
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Blog from "./pages/Blog.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";
import EventDetail from "./pages/EventDetail.jsx";
import Events from "./pages/Events.jsx";
import NoticeDetail from "./pages/NoticeDetail.jsx";
import Notices from "./pages/Notices.jsx";
import TestimonialDetail from "./pages/TestimonialDetail.jsx";
import Testimonials from "./pages/Testimonials.jsx";

const RootLayout = () => (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Navbar />
    <main className="flex-1">
      <Container maxWidth="lg" className="py-12">
        <Outlet />
      </Container>
    </main>
    <Footer />
  </div>
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Navigate to="/blog" replace /> },
      { path: "/blog", element: <Blog /> },
      { path: "/blog/:slug", element: <BlogDetail /> },
      { path: "/events", element: <Events /> },
      { path: "/events/:id", element: <EventDetail /> },
      { path: "/testimonials", element: <Testimonials /> },
      { path: "/testimonials/:id", element: <TestimonialDetail /> },
      { path: "/notices", element: <Notices /> },
      { path: "/notices/:id", element: <NoticeDetail /> },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
