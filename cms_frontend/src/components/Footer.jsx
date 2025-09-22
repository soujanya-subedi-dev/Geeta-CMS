function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-lg font-semibold">Geeta Aviation CMS</p>
          <p className="text-sm text-blue-100">Empowering aviation excellence through storytelling.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-blue-100">
          <a href="mailto:info@geetaaviation.com" className="hover:text-white">
            info@geetaaviation.com
          </a>
          <span className="hidden md:inline">|</span>
          <a href="tel:+11234567890" className="hover:text-white">
            +1 (123) 456-7890
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
