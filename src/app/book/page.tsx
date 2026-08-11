"use client";

import { useState } from "react";
import Link from "next/link";
import { formatCurrency, generateWhatsAppLink } from "@/lib/utils";
import {
  getMinBookingDate,
  generateTimeSlots,
  calculateEndTime,
  canFitInDay,
  generateBookingCode,
  buildCustomerWhatsAppMessage,
  buildOwnerWhatsAppMessage,
} from "@/lib/booking";

const DEMO_SERVICES = [
  { id: "1", name: "Classic Haircut", price: 250, duration_minutes: 30 },
  { id: "2", name: "Hair Wash & Blow Dry", price: 200, duration_minutes: 30 },
  { id: "3", name: "Hair Styling", price: 350, duration_minutes: 45 },
  { id: "4", name: "Hair Coloring", price: 1200, duration_minutes: 90 },
  { id: "5", name: "Hair Spa", price: 600, duration_minutes: 60 },
  { id: "6", name: "Beard Grooming", price: 150, duration_minutes: 20 },
  { id: "7", name: "Clean Shave", price: 120, duration_minutes: 20 },
  { id: "8", name: "Basic Facial", price: 400, duration_minutes: 45 },
  { id: "9", name: "Premium Facial", price: 800, duration_minutes: 60 },
  { id: "10", name: "Head Massage", price: 250, duration_minutes: 20 },
  { id: "11", name: "Grooming Package", price: 500, duration_minutes: 60 },
  { id: "12", name: "Bridal / Party Package", price: 2500, duration_minutes: 120 },
];

const TIME_SLOTS = generateTimeSlots("10:00", "21:00", 60);

type Step = "services" | "datetime" | "details" | "confirm";

export default function BookPage() {
  const [step, setStep] = useState<Step>("services");
  const [selected, setSelected] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [request, setRequest] = useState("");
  const [bookingCode, setBookingCode] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedServices = DEMO_SERVICES.filter((s) => selected.includes(s.id));
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration_minutes, 0);

  const minDate = getMinBookingDate(2);
  const availableSlots = TIME_SLOTS.filter((slot) =>
    canFitInDay(slot, totalDuration, "21:00")
  );

  const toggleService = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!name || !mobile || !date || !time || selected.length === 0) return;
    setLoading(true);
    // Simulate booking (in production this calls Supabase API)
    const code = generateBookingCode();
    setBookingCode(code);
    setStep("confirm");
    setLoading(false);
  };

  if (step === "confirm") {
    const customerMsg = buildCustomerWhatsAppMessage({
      booking_code: bookingCode,
      customer_name: name,
      services: selectedServices.map((s) => s.name),
      booking_date: date,
      start_time: time,
      total_price: totalPrice,
      salon_phone: "7879870725",
    });
    const ownerMsg = buildOwnerWhatsAppMessage({
      booking_code: bookingCode,
      customer_name: name,
      customer_mobile: mobile,
      customer_gender: gender,
      services: selectedServices.map((s) => s.name),
      booking_date: date,
      start_time: time,
      total_price: totalPrice,
      special_request: request,
    });

    return (
      <div className="min-h-screen bg-[#faf8f5] py-12 px-4">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
            ✓
          </div>
          <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-[#8b7355] mb-6">
            Booking ID: <strong>{bookingCode}</strong>
          </p>
          <div className="text-left bg-[#faf8f5] rounded-xl p-4 mb-6 space-y-2 text-sm">
            <p><span className="text-[#8b7355]">Name:</span> {name}</p>
            <p><span className="text-[#8b7355]">Mobile:</span> {mobile}</p>
            <p><span className="text-[#8b7355]">Services:</span> {selectedServices.map(s => s.name).join(", ")}</p>
            <p><span className="text-[#8b7355]">Date:</span> {date}</p>
            <p><span className="text-[#8b7355]">Time:</span> {time}</p>
            <p><span className="text-[#8b7355]">Duration:</span> {totalDuration} min</p>
            <p><span className="text-[#8b7355]">Total:</span> <strong>{formatCurrency(totalPrice)}</strong></p>
          </div>
          <div className="space-y-3">
            <a
              href={generateWhatsAppLink(mobile, customerMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-600 text-white py-3 rounded-full font-medium"
            >
              Send Confirmation to Customer WhatsApp
            </a>
            <a
              href={generateWhatsAppLink("7879870725", ownerMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#6b4c3b] text-white py-3 rounded-full font-medium"
            >
              Notify Owner on WhatsApp
            </a>
            <Link href="/" className="block text-[#6b4c3b] mt-4">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <header className="bg-white border-b border-[#e8e0d5] sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-[#6b4c3b] font-medium">← Home</Link>
          <span className="font-semibold">Book Appointment</span>
          <div className="w-12" />
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {(["services", "datetime", "details"] as Step[]).map((s, i) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full ${
                step === s || (["datetime", "details"].includes(step) && i === 0) || (step === "details" && i <= 1)
                  ? "bg-[#6b4c3b]"
                  : "bg-[#e8e0d5]"
              }`}
            />
          ))}
        </div>

        {step === "services" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Select Services</h2>
            <p className="text-[#8b7355] mb-6">You can choose multiple services</p>
            <div className="space-y-3">
              {DEMO_SERVICES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleService(s.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition ${
                    selected.includes(s.id)
                      ? "border-[#6b4c3b] bg-[#f5f0eb]"
                      : "border-[#e8e0d5] bg-white"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{s.name}</p>
                      <p className="text-sm text-[#8b7355]">{s.duration_minutes} min</p>
                    </div>
                    <p className="font-semibold text-[#6b4c3b]">{formatCurrency(s.price)}</p>
                  </div>
                </button>
              ))}
            </div>
            {selected.length > 0 && (
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e8e0d5] p-4">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{formatCurrency(totalPrice)}</p>
                    <p className="text-sm text-[#8b7355]">{totalDuration} min · {selected.length} service(s)</p>
                  </div>
                  <button
                    onClick={() => setStep("datetime")}
                    className="bg-[#6b4c3b] text-white px-6 py-3 rounded-full font-medium"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {step === "datetime" && (
          <div>
            <button onClick={() => setStep("services")} className="text-sm text-[#6b4c3b] mb-4">
              ← Back
            </button>
            <h2 className="text-2xl font-bold mb-2">Select Date & Time</h2>
            <p className="text-[#8b7355] mb-2">
              Appointments must be booked at least <strong>2 days in advance</strong>
            </p>
            <p className="text-sm text-[#8b7355] mb-6">
              Total duration: {totalDuration} minutes
            </p>

            <label className="block mb-2 font-medium">Date</label>
            <input
              type="date"
              min={minDate}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setTime("");
              }}
              className="w-full p-3 rounded-xl border border-[#e8e0d5] mb-6"
            />

            {date && (
              <>
                <label className="block mb-2 font-medium">Available Time Slots</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={`py-3 rounded-xl border-2 text-sm font-medium ${
                        time === slot
                          ? "border-[#6b4c3b] bg-[#6b4c3b] text-white"
                          : "border-[#e8e0d5] bg-white"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </>
            )}

            {date && time && (
              <button
                onClick={() => setStep("details")}
                className="mt-8 w-full bg-[#6b4c3b] text-white py-3.5 rounded-full font-medium"
              >
                Continue
              </button>
            )}
          </div>
        )}

        {step === "details" && (
          <div>
            <button onClick={() => setStep("datetime")} className="text-sm text-[#6b4c3b] mb-4">
              ← Back
            </button>
            <h2 className="text-2xl font-bold mb-6">Your Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Full Name *</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#e8e0d5]"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Mobile Number *</label>
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="w-full p-3 rounded-xl border border-[#e8e0d5]"
                  placeholder="10-digit mobile"
                  type="tel"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#e8e0d5]"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Special Request (optional)</label>
                <textarea
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#e8e0d5]"
                  rows={3}
                  placeholder="Any preference or note..."
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-[#f5f0eb] rounded-xl text-sm space-y-1">
              <p><strong>Services:</strong> {selectedServices.map(s => s.name).join(", ")}</p>
              <p><strong>Date:</strong> {date} · <strong>Time:</strong> {time}</p>
              <p><strong>Duration:</strong> {totalDuration} min · <strong>Total:</strong> {formatCurrency(totalPrice)}</p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!name || mobile.length < 10 || loading}
              className="mt-6 w-full bg-[#6b4c3b] text-white py-3.5 rounded-full font-medium disabled:opacity-50"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
            <p className="text-xs text-center text-[#8b7355] mt-4">
              By booking you agree to our Terms. Cancel/reschedule at least 6 hours prior.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
