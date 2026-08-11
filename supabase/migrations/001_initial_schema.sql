-- Vijay Unisex Salon - Complete Database Schema
-- Run this in Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- SALON SETTINGS (opening hours, capacity, etc.)
-- =============================================
CREATE TABLE IF NOT EXISTS salon_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Default settings
INSERT INTO salon_settings (key, value) VALUES
  ('opening_hours', '{"open": "10:00", "close": "21:00", "days": [0,1,2,3,4,5,6]}'),
  ('slot_interval_minutes', '60'),
  ('max_concurrent_bookings', '2'),
  ('min_advance_days', '2'),
  ('cancel_reschedule_hours', '6'),
  ('salon_name', '"Vijay Unisex Salon"'),
  ('salon_phone', '"7879870725"'),
  ('salon_address', '"Nehru Nagar, Bhilai, India"'),
  ('about_text', '"Welcome to Vijay Unisex Salon – a premium destination for modern hair, grooming, and beauty services. We combine skilled professionals, quality products, and a relaxing atmosphere to help you look and feel your best."')
ON CONFLICT (key) DO NOTHING;

-- =============================================
-- SERVICE CATEGORIES
-- =============================================
CREATE TABLE IF NOT EXISTS service_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- SERVICES
-- =============================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES service_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  duration_minutes INT NOT NULL DEFAULT 30,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_services_active ON services(is_active);
CREATE INDEX idx_services_category ON services(category_id);
CREATE INDEX idx_services_featured ON services(is_featured);

-- =============================================
-- SERVICE MEDIA (additional images/videos)
-- =============================================
CREATE TABLE IF NOT EXISTS service_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  url TEXT NOT NULL,
  caption TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- CUSTOMERS (for booking history, no auth required)
-- =============================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_customers_mobile ON customers(mobile);

-- =============================================
-- BOOKINGS
-- =============================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_code TEXT UNIQUE NOT NULL, -- e.g. VUS-20260811-ABC12
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_mobile TEXT NOT NULL,
  customer_gender TEXT,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  total_duration_minutes INT NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  special_request TEXT,
  status TEXT NOT NULL DEFAULT 'pending' 
    CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'rejected', 'rescheduled')),
  notes TEXT, -- admin notes
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_mobile ON bookings(customer_mobile);
CREATE INDEX idx_bookings_code ON bookings(booking_code);

-- =============================================
-- BOOKING SERVICES (many-to-many)
-- =============================================
CREATE TABLE IF NOT EXISTS booking_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  service_name TEXT NOT NULL, -- snapshot
  service_price DECIMAL(10,2) NOT NULL,
  service_duration INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_booking_services_booking ON booking_services(booking_id);

-- =============================================
-- BLOCKED DATES / SLOTS
-- =============================================
CREATE TABLE IF NOT EXISTS blocked_dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blocked_date DATE NOT NULL UNIQUE,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blocked_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blocked_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(blocked_date, start_time)
);

-- =============================================
-- GALLERY
-- =============================================
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  url TEXT NOT NULL,
  caption TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- OFFERS / PROMOTIONS
-- =============================================
CREATE TABLE IF NOT EXISTS offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  discount_text TEXT, -- e.g. "20% OFF" or "₹200 OFF"
  image_url TEXT,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- REVIEWS / TESTIMONIALS
-- =============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- HOMEPAGE CONTENT
-- =============================================
CREATE TABLE IF NOT EXISTS homepage_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO homepage_content (key, value) VALUES
  ('hero', '{"headline": "Your Style. Your Confidence. Your Salon.", "subheadline": "Premium unisex salon experience in Nehru Nagar, Bhilai. Expert cuts, grooming, facials and more.", "video_url": null, "cta_primary": "Book an Appointment", "cta_secondary": "Explore Services"}'),
  ('featured_services', '[]')
ON CONFLICT (key) DO NOTHING;

-- =============================================
-- ADMIN USERS (linked to Supabase Auth)
-- =============================================
-- We use Supabase Auth. Store extra profile if needed.
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  mobile TEXT UNIQUE,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- HELPER FUNCTION: Generate Booking Code
-- =============================================
CREATE OR REPLACE FUNCTION generate_booking_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
BEGIN
  code := 'VUS-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 5));
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE salon_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Public read for active content
CREATE POLICY "Public can view active services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active categories" ON service_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active gallery" ON gallery FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active offers" ON offers FOR SELECT USING (is_active = true AND (end_date IS NULL OR end_date >= CURRENT_DATE));
CREATE POLICY "Public can view approved reviews" ON reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Public can view homepage content" ON homepage_content FOR SELECT USING (true);
CREATE POLICY "Public can view salon settings" ON salon_settings FOR SELECT USING (true);
CREATE POLICY "Public can view blocked dates" ON blocked_dates FOR SELECT USING (true);
CREATE POLICY "Public can view blocked slots" ON blocked_slots FOR SELECT USING (true);

-- Anyone can create a booking (customer side)
CREATE POLICY "Anyone can create booking" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create customer" ON customers FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create booking_services" ON booking_services FOR INSERT WITH CHECK (true);

-- Customers can view their own booking by code + mobile (handled in API)
-- Admin policies will use service role or authenticated checks in API routes

-- Allow public insert for reviews (pending approval)
CREATE POLICY "Anyone can submit review" ON reviews FOR INSERT WITH CHECK (true);

-- =============================================
-- DEMO DATA - Realistic services
-- =============================================
INSERT INTO service_categories (name, slug, display_order) VALUES
  ('Hair Services', 'hair-services', 1),
  ('Grooming', 'grooming', 2),
  ('Facial & Skin', 'facial-skin', 3),
  ('Spa & Massage', 'spa-massage', 4),
  ('Nails', 'nails', 5),
  ('Packages', 'packages', 6)
ON CONFLICT (slug) DO NOTHING;

-- Get category IDs (will work on fresh DB)
DO $$
DECLARE
  cat_hair UUID;
  cat_groom UUID;
  cat_facial UUID;
  cat_spa UUID;
  cat_nails UUID;
  cat_pack UUID;
BEGIN
  SELECT id INTO cat_hair FROM service_categories WHERE slug = 'hair-services';
  SELECT id INTO cat_groom FROM service_categories WHERE slug = 'grooming';
  SELECT id INTO cat_facial FROM service_categories WHERE slug = 'facial-skin';
  SELECT id INTO cat_spa FROM service_categories WHERE slug = 'spa-massage';
  SELECT id INTO cat_nails FROM service_categories WHERE slug = 'nails';
  SELECT id INTO cat_pack FROM service_categories WHERE slug = 'packages';

  INSERT INTO services (category_id, name, slug, description, price, duration_minutes, is_featured, display_order) VALUES
    (cat_hair, 'Classic Haircut', 'classic-haircut', 'Precision haircut tailored to your face shape and style preference.', 250, 30, true, 1),
    (cat_hair, 'Hair Wash & Blow Dry', 'hair-wash-blowdry', 'Thorough cleansing with premium shampoo followed by professional blow dry.', 200, 30, true, 2),
    (cat_hair, 'Hair Styling', 'hair-styling', 'Event-ready styling – party, formal or casual looks.', 350, 45, false, 3),
    (cat_hair, 'Hair Coloring', 'hair-coloring', 'Full color or highlights with quality products for vibrant, lasting results.', 1200, 90, true, 4),
    (cat_hair, 'Hair Spa', 'hair-spa', 'Deep conditioning treatment to restore moisture and shine.', 600, 60, true, 5),
    (cat_groom, 'Beard Grooming', 'beard-grooming', 'Shape, trim and style your beard for a clean, sharp look.', 150, 20, true, 1),
    (cat_groom, 'Clean Shave', 'clean-shave', 'Traditional close shave with hot towel and after-care.', 120, 20, false, 2),
    (cat_groom, 'Head Shave', 'head-shave', 'Complete head shave with smooth finish.', 200, 25, false, 3),
    (cat_facial, 'Basic Facial', 'basic-facial', 'Cleansing, exfoliation and hydration for refreshed skin.', 400, 45, true, 1),
    (cat_facial, 'Premium Facial', 'premium-facial', 'Advanced facial with mask and serum for glowing skin.', 800, 60, true, 2),
    (cat_facial, 'Cleanup', 'cleanup', 'Quick deep clean to remove impurities and blackheads.', 300, 30, false, 3),
    (cat_spa, 'Head Massage', 'head-massage', 'Relaxing head and scalp massage to relieve stress.', 250, 20, true, 1),
    (cat_spa, 'Full Body Massage', 'full-body-massage', 'Therapeutic full body massage for complete relaxation.', 1200, 60, false, 2),
    (cat_nails, 'Manicure', 'manicure', 'Nail shaping, cuticle care and polish.', 300, 30, false, 1),
    (cat_nails, 'Pedicure', 'pedicure', 'Foot care, scrub and polish for soft feet.', 400, 40, false, 2),
    (cat_nails, 'Waxing (Full Arms)', 'waxing-full-arms', 'Smooth full arms waxing.', 350, 30, false, 3),
    (cat_pack, 'Grooming Package', 'grooming-package', 'Haircut + Beard Grooming + Head Massage.', 500, 60, true, 1),
    (cat_pack, 'Bridal / Party Package', 'bridal-party-package', 'Complete look – hair, facial and styling for special occasions.', 2500, 120, true, 2)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- Sample reviews
INSERT INTO reviews (customer_name, rating, comment, is_approved, is_featured) VALUES
  ('Rahul Sharma', 5, 'Best salon in Nehru Nagar! Clean place, skilled staff and great haircut.', true, true),
  ('Priya Patel', 5, 'Loved the facial and the overall experience. Will definitely come back.', true, true),
  ('Amit Verma', 4, 'Good service and reasonable prices. Beard grooming was perfect.', true, false)
ON CONFLICT DO NOTHING;

-- Sample offer
INSERT INTO offers (title, description, discount_text, is_active, display_order) VALUES
  ('Welcome Offer', 'Get special discount on your first visit. Mention this offer while booking.', '15% OFF', true, 1)
ON CONFLICT DO NOTHING;
