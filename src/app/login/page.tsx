"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }
      setLoading(false);
    });
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f5]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <header className="bg-white border-b border-[#e8e0d5]">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="font-semibold text-[#6b4c3b]">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-2">Welcome, Admin</h2>
        <p className="text-[#8b7355] mb-8">
          Logged in as: {user?.email}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#e8e0d5]">
            <h3 className="font-semibold mb-2">Bookings</h3>
            <p className="text-sm text-[#8b7355]">Manage appointments</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#e8e0d5]">
            <h3 className="font-semibold mb-2">Services</h3>
            <p className="text-sm text-[#8b7355]">Add / Edit services</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#e8e0d5]">
            <h3 className="font-semibold mb-2">Settings</h3>
            <p className="text-sm text-[#8b7355]">Salon settings</p>
          </div>
        </div>

        <div className="mt-10">
          <Link href="/" className="text-[#6b4c3b] hover:underline">
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
