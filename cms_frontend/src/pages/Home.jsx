import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import client from "../api/client.js";
import CardList from "../components/CardList.jsx";

function Section({ title, subtitle, items, renderMeta, getTitle, getDescription, getImage, seeAllLink }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        {seeAllLink && (
          <Link to={seeAllLink} className="text-sm text-blue-600 hover:text-blue-800">
            See all
          </Link>
        )}
      </div>
      <CardList
        items={items}
        renderMeta={renderMeta}
        getTitle={getTitle}
        getDescription={getDescription}
        getImage={getImage}
      />
    </section>
  );
}

function Home() {
  const [data, setData] = useState({ blogs: [], events: [], testimonials: [], notices: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .get("home/summary/")
      .then((response) => setData(response.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-500">Loading homepage...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800 p-12 text-white shadow-xl">
        <h1 className="text-3xl font-semibold">Welcome to Geeta Aviation CMS</h1>
        <p className="mt-3 max-w-2xl text-blue-100">
          Stay informed with the latest blogs, upcoming events, student testimonials, and important notices from the Geeta
          Aviation community.
        </p>
        <div className="mt-6 flex gap-3">
          <Link to="/blogs" className="rounded-full bg-white px-5 py-2 text-blue-700 font-medium">
            Explore Blogs
          </Link>
          <Link to="/events" className="rounded-full border border-white px-5 py-2 text-white font-medium">
            Upcoming Events
          </Link>
        </div>
      </div>

      <Section
        title="Latest Blogs"
        subtitle="Fresh insights from our writers"
        items={data.blogs}
        getTitle={(item) => item.title}
        getDescription={(item) => {
          const plain = item.content ? item.content.replace(/<[^>]+>/g, "") : "";
          return plain.length > 140 ? `${plain.slice(0, 140)}...` : plain;
        }}
        renderMeta={(item) => new Date(item.created_at).toLocaleDateString()}
        getImage={(item) => item.featured_image}
        seeAllLink="/blogs"
      />

      <Section
        title="Upcoming Events"
        subtitle="Join our upcoming programs and workshops"
        items={data.events}
        getTitle={(item) => item.title}
        getDescription={(item) => item.description?.slice(0, 140)}
        renderMeta={(item) => new Date(item.start).toLocaleString()}
        seeAllLink="/events"
      />

      <Section
        title="Testimonials"
        subtitle="Hear from our students and partners"
        items={data.testimonials}
        getTitle={(item) => item.name}
        getDescription={(item) => item.message.slice(0, 140)}
        getImage={(item) => item.image}
        seeAllLink="/testimonials"
      />

      <Section
        title="Latest Notices"
        subtitle="Important updates from the administration"
        items={data.notices}
        getTitle={(item) => item.title}
        getDescription={(item) => item.description.slice(0, 160)}
        renderMeta={(item) => new Date(item.published_date).toLocaleDateString()}
        seeAllLink="/notices"
      />
    </div>
  );
}

export default Home;
