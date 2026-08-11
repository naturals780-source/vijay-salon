import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <header className="bg-white border-b border-[#e8e0d5]">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center">
          <Link href="/" className="text-[#6b4c3b] font-medium">← Home</Link>
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 capitalize">about</h1>
        <p className="text-[#8b7355] mb-8">
          This page will load dynamic content from Supabase once connected.
          See README for full setup.
        </p>
        <Link href="/book" className="bg-[#6b4c3b] text-white px-6 py-3 rounded-full">
          Book Appointment
        </Link>
      </div>
    </div>
  );
}
