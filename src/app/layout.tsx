import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Vijay Unisex Salon | Nehru Nagar, Bhilai",
  description: "Premium unisex salon in Nehru Nagar, Bhilai. Book haircut, facial, grooming, spa and more. Open daily 10 AM – 9 PM. Call 7879870725.",
  openGraph: {
    title: "Vijay Unisex Salon",
    description: "Your Style. Your Confidence. Your Salon.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#faf8f5] text-[#2c2118]">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
