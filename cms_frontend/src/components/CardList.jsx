// src/components/CardList.jsx
import Card from "./Card";

export default function CardList({ items }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {items.map((item, idx) => (
        <Card
          key={idx}
          title={item.title}
          description={item.description}
          image={item.image}
          link={item.link}
        />
      ))}
    </div>
  );
}
