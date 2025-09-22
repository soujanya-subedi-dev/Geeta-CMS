function ListLayout({ title, subtitle, children, actionSlot }) {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="mt-2 text-base text-gray-600 max-w-3xl">{subtitle}</p>}
          </div>
          {actionSlot && <div className="flex-shrink-0">{actionSlot}</div>}
        </header>
        {children}
      </div>
    </section>
  );
}

export default ListLayout;
