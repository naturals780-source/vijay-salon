export type ServiceCategory = {
  id: string
  name: string
  slug: string
  description: string | null
  display_order: number
  is_active: boolean
}

export type Service = {
  id: string
  category_id: string | null
  name: string
  slug: string
  description: string | null
  price: number
  duration_minutes: number
  image_url: string | null
  is_featured: boolean
  is_active: boolean
  display_order: number
  service_categories?: ServiceCategory
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rejected' | 'rescheduled'

export type Booking = {
  id: string
  booking_code: string
  customer_name: string
  customer_mobile: string
  customer_gender: string | null
  booking_date: string
  start_time: string
  end_time: string
  total_duration_minutes: number
  total_price: number
  special_request: string | null
  status: BookingStatus
  notes: string | null
  created_at: string
  booking_services?: BookingService[]
}

export type BookingService = {
  id: string
  booking_id: string
  service_id: string | null
  service_name: string
  service_price: number
  service_duration: number
}

export type Offer = {
  id: string
  title: string
  description: string | null
  discount_text: string | null
  image_url: string | null
  start_date: string | null
  end_date: string | null
  is_active: boolean
  display_order: number
}

export type Review = {
  id: string
  customer_name: string
  rating: number
  comment: string | null
  is_approved: boolean
  is_featured: boolean
  created_at: string
}

export type GalleryItem = {
  id: string
  media_type: 'image' | 'video'
  url: string
  caption: string | null
  display_order: number
  is_active: boolean
}

export type SalonSettings = {
  opening_hours: { open: string; close: string; days: number[] }
  slot_interval_minutes: number
  max_concurrent_bookings: number
  min_advance_days: number
  cancel_reschedule_hours: number
  salon_name: string
  salon_phone: string
  salon_address: string
  about_text: string
}
