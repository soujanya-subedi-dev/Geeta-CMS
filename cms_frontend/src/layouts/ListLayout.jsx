// src/layouts/ListLayout.jsx
import CardList from "../components/CardList";

export default function ListLayout({ title, items }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <CardList items={items} />
    </div>
  );
}
