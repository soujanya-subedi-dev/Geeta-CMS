function DetailLayout({ title, image, meta, content, actions, children }) {
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <header className="space-y-4">
          {meta && <p className="text-sm uppercase tracking-wide text-blue-700">{meta}</p>}
          <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
        </header>
        {image && (
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img src={image} alt={title} className="w-full object-cover" />
          </div>
        )}
        <article className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
          <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: content }} />
          {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
        </article>
        {children}
      </div>
    </section>
  );
}

export default DetailLayout;
