import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[#e8e0d5]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg text-[#6b4c3b]">
            Vijay Unisex Salon
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/services" className="hover:text-[#6b4c3b]">Services</Link>
            <Link href="/gallery" className="hover:text-[#6b4c3b]">Gallery</Link>
            <Link href="/offers" className="hover:text-[#6b4c3b]">Offers</Link>
            <Link href="/about" className="hover:text-[#6b4c3b]">About</Link>
            <Link href="/contact" className="hover:text-[#6b4c3b]">Contact</Link>
            <Link
              href="/book"
              className="bg-[#6b4c3b] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#4a3428] transition"
            >
              Book Appointment
            </Link>
          </nav>
          <Link
            href="/book"
            className="md:hidden bg-[#6b4c3b] text-white px-3 py-1.5 rounded-full text-sm"
          >
            Book
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-[#f5f0eb] to-[#e8e0d5] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-[#c9a66b] font-medium tracking-widest uppercase text-sm mb-4">
            Nehru Nagar, Bhilai
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-[#2c2118] leading-tight mb-6">
            Your Style. Your Confidence.<br />Your Salon.
          </h1>
          <p className="text-[#8b7355] text-lg mb-10 max-w-xl mx-auto">
            Premium unisex salon experience. Expert haircuts, grooming, facials and spa treatments in a modern, relaxing space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-[#6b4c3b] text-white px-8 py-3.5 rounded-full font-medium hover:bg-[#4a3428] transition shadow-lg"
            >
              Book an Appointment
            </Link>
            <Link
              href="/services"
              className="border-2 border-[#6b4c3b] text-[#6b4c3b] px-8 py-3.5 rounded-full font-medium hover:bg-[#6b4c3b] hover:text-white transition"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-12 bg-white border-y border-[#e8e0d5]">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-[#c9a66b] text-sm uppercase tracking-wider mb-1">Open Daily</p>
            <p className="font-semibold text-lg">10:00 AM – 9:00 PM</p>
          </div>
          <div>
            <p className="text-[#c9a66b] text-sm uppercase tracking-wider mb-1">Call / WhatsApp</p>
            <a href="tel:7879870725" className="font-semibold text-lg hover:text-[#6b4c3b]">
              7879870725
            </a>
          </div>
          <div>
            <p className="text-[#c9a66b] text-sm uppercase tracking-wider mb-1">Location</p>
            <p className="font-semibold text-lg">Nehru Nagar, Bhilai</p>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2c2118] mb-3">Our Services</h2>
            <p className="text-[#8b7355]">Premium care for every style</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Classic Haircut", price: "₹250", duration: "30 min" },
              { name: "Hair Wash & Blow Dry", price: "₹200", duration: "30 min" },
              { name: "Beard Grooming", price: "₹150", duration: "20 min" },
              { name: "Basic Facial", price: "₹400", duration: "45 min" },
              { name: "Hair Spa", price: "₹600", duration: "60 min" },
              { name: "Grooming Package", price: "₹500", duration: "60 min" },
            ].map((s) => (
              <div
                key={s.name}
                className="bg-white rounded-2xl border border-[#e8e0d5] p-6 hover:shadow-lg transition"
              >
                <div className="h-40 bg-[#f5f0eb] rounded-xl mb-4 flex items-center justify-center text-[#c9a66b]">
                  <span className="text-sm">Service Image</span>
                </div>
                <h3 className="font-semibold text-lg mb-1">{s.name}</h3>
                <p className="text-[#8b7355] text-sm mb-3">{s.duration}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#6b4c3b]">{s.price}</span>
                  <Link
                    href="/book"
                    className="text-sm bg-[#6b4c3b] text-white px-4 py-1.5 rounded-full hover:bg-[#4a3428]"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-block border-2 border-[#6b4c3b] text-[#6b4c3b] px-8 py-3 rounded-full font-medium hover:bg-[#6b4c3b] hover:text-white transition"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#6b4c3b] text-white text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Ready for a new look?</h2>
        <p className="mb-8 opacity-90">Book your appointment at least 2 days in advance</p>
        <Link
          href="/book"
          className="inline-block bg-white text-[#6b4c3b] px-8 py-3.5 rounded-full font-semibold hover:bg-[#f5f0eb] transition"
        >
          Book Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[#2c2118] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-3">Vijay Unisex Salon</h3>
            <p className="text-sm opacity-80">Nehru Nagar, Bhilai, India</p>
            <p className="text-sm opacity-80 mt-1">Open every day 10 AM – 9 PM</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Contact</h3>
            <a href="tel:7879870725" className="block text-sm opacity-80 hover:opacity-100">
              Call: 7879870725
            </a>
            <a
              href="https://wa.me/917879870725"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm opacity-80 hover:opacity-100 mt-1"
            >
              WhatsApp: 7879870725
            </a>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <div className="flex flex-col gap-1 text-sm opacity-80">
              <Link href="/services" className="hover:opacity-100">Services</Link>
              <Link href="/book" className="hover:opacity-100">Book Appointment</Link>
              <Link href="/terms" className="hover:opacity-100">Terms & Conditions</Link>
              <Link href="/login" className="hover:opacity-100">Admin Login</Link>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 text-center text-sm opacity-60">
          © {new Date().getFullYear()} Vijay Unisex Salon. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

