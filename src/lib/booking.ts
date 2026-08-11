import { addDays, format, parse, isBefore, isAfter, addMinutes } from 'date-fns'

export function getMinBookingDate(minAdvanceDays = 2): string {
  return format(addDays(new Date(), minAdvanceDays), 'yyyy-MM-dd')
}

export function generateTimeSlots(
  openTime: string, // "10:00"
  closeTime: string, // "21:00"
  intervalMinutes: number = 60
): string[] {
  const slots: string[] = []
  let current = parse(openTime, 'HH:mm', new Date())
  const end = parse(closeTime, 'HH:mm', new Date())

  while (isBefore(current, end)) {
    slots.push(format(current, 'HH:mm'))
    current = addMinutes(current, intervalMinutes)
  }
  return slots
}

export function calculateEndTime(startTime: string, durationMinutes: number): string {
  const start = parse(startTime, 'HH:mm', new Date())
  const end = addMinutes(start, durationMinutes)
  return format(end, 'HH:mm')
}

export function canFitInDay(
  startTime: string,
  durationMinutes: number,
  closeTime: string
): boolean {
  const end = calculateEndTime(startTime, durationMinutes)
  const endParsed = parse(end, 'HH:mm', new Date())
  const closeParsed = parse(closeTime, 'HH:mm', new Date())
  return !isAfter(endParsed, closeParsed)
}

export function generateBookingCode(): string {
  const date = format(new Date(), 'yyyyMMdd')
  const random = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `VUS-${date}-${random}`
}

export function buildCustomerWhatsAppMessage(booking: {
  booking_code: string
  customer_name: string
  services: string[]
  booking_date: string
  start_time: string
  total_price: number
  salon_phone: string
}) {
  return `Hello ${booking.customer_name}!

Your booking at *Vijay Unisex Salon* is confirmed.

*Booking ID:* ${booking.booking_code}
*Services:* ${booking.services.join(', ')}
*Date:* ${booking.booking_date}
*Time:* ${booking.start_time}
*Total:* ₹${booking.total_price}

Salon Contact: ${booking.salon_phone}

Please arrive 5-10 minutes early.
For cancellation or reschedule (at least 6 hours prior), contact us.

Thank you!`
}

export function buildOwnerWhatsAppMessage(booking: {
  booking_code: string
  customer_name: string
  customer_mobile: string
  customer_gender?: string | null
  services: string[]
  booking_date: string
  start_time: string
  total_price: number
  special_request?: string | null
}) {
  return `*New Booking - Vijay Unisex Salon*

*ID:* ${booking.booking_code}
*Customer:* ${booking.customer_name}
*Mobile:* ${booking.customer_mobile}
*Gender:* ${booking.customer_gender || 'N/A'}
*Services:* ${booking.services.join(', ')}
*Date:* ${booking.booking_date}
*Time:* ${booking.start_time}
*Amount:* ₹${booking.total_price}
*Request:* ${booking.special_request || 'None'}

Please confirm in Admin Dashboard.`
}
