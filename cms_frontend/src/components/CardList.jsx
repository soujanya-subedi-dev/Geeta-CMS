import Card from "./Card.jsx";

function CardList({ items, renderMeta, getDescription, getImage, getTitle, getLink, actionLabel }) {
  if (!items?.length) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-500">
        No content available yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card
          key={item.id || item.slug}
          title={getTitle(item)}
          description={getDescription?.(item)}
          image={getImage?.(item)}
          meta={renderMeta?.(item)}
          to={getLink?.(item)}
          actionLabel={actionLabel}
        />
      ))}
    </div>
  );
}

export default CardList;
