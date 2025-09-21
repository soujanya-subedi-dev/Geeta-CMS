import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EventList from "./pages/EventList";
import EventDetail from "./pages/EventDetail";
import TestimonialList from "./pages/TestimonialList";
import TestimonialDetail from "./pages/TestimonialDetail";
import NoticeList from "./pages/NoticeList";
import NoticeDetail from "./pages/NoticeDetail";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />

            <Route path="/events" element={<EventList />} />
            <Route path="/events/:id" element={<EventDetail />} />

            <Route path="/testimonials" element={<TestimonialList />} />
            <Route path="/testimonials/:id" element={<TestimonialDetail />} />

            <Route path="/notices" element={<NoticeList />} />
            <Route path="/notices/:id" element={<NoticeDetail />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
