# Vijay Unisex Salon – Production Booking Website

Modern premium salon booking website + Admin dashboard  
**Stack:** Next.js · TypeScript · Tailwind CSS · Supabase · Vercel · GitHub

**Business:** Vijay Unisex Salon  
**Location:** Nehru Nagar, Bhilai, India  
**Phone / WhatsApp:** 7879870725  
**Hours:** 10:00 AM – 9:00 PM (every day)

---

## Features

### Customer Website
- Premium white + coffee/brown luxury design
- Hero section (video managed from admin)
- Fully dynamic services with images, prices, duration
- Multi-service booking cart
- Auto price + duration calculation
- Hourly time slots (10 AM, 11 AM … 8 PM)
- 2-day advance booking rule
- 6-hour cancel/reschedule rule
- Beautiful confirmation page
- WhatsApp pre-filled message buttons (customer + owner)
- Gallery, Offers, Reviews, About, Contact, Terms
- Fully mobile-first & responsive

### Admin Dashboard
- Secure login (email + password via Supabase Auth)
- Dashboard stats
- Booking calendar + list view
- Approve / reject / complete / cancel / reschedule bookings
- Full service management (CRUD, images, featured, order)
- Gallery, Offers, Reviews moderation
- Homepage content (hero video, text)
- Salon settings (opening hours, max concurrent bookings, etc.)
- Blocked dates & slots

---

## Quick Start (Local)

### 1. Create Supabase Project
1. Go to https://supabase.com → New Project
2. Copy Project URL, anon key and service_role key

### 2. Run Database Schema
1. Open Supabase → SQL Editor
2. Paste full content of `supabase/migrations/001_initial_schema.sql`
3. Run it (creates tables + demo services + RLS)

### 3. Create Admin User
1. Supabase → Authentication → Users → Add user
2. Use any email (e.g. admin@vijaysalon.com) + strong password
3. After creation, go to Table Editor → admin_profiles
4. Insert:
   - id = UUID of the auth user
   - mobile = 7879870725
   - full_name = Owner name
   - role = admin

### 4. Environment Variables
cp .env.example .env.local

Fill the values.

### 5. Install & Run
npm install
npm run dev

Open http://localhost:3000
Admin: http://localhost:3000/login

---

## Deploy (GitHub + Vercel)

1. Push this folder to GitHub
2. Import in Vercel
3. Add the same env variables
4. Deploy

---

## WhatsApp

Uses normal WhatsApp via pre-filled wa.me links (no Business API needed).  
Confirmation page has buttons for Customer message and Owner notification.

---

## Rules

- Min advance: 2 days
- Cancel/Reschedule: 6 hours before
- Slots: every 60 minutes
- Concurrent capacity: editable in Admin (default 2)

All editable from Admin → Settings.

---

**Vijay Unisex Salon | Nehru Nagar, Bhilai | 7879870725**
