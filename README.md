# turnoment

iranmehrafzar.ir — Full Project Prompt

PROJECT OVERVIEW

Build a full-stack Persian (RTL) gaming e-commerce & service website named Iran Mehr Afzar (ایران مهر افزار) at iranmehrafzar.ir.

The site sells gaming hardware and consoles (PS5, PS4, Xbox, Nintendo Switch, controllers, game CDs, accessories) and offers gaming services (game installation, console repair, controller repair).

Language: Persian (Farsi) — fully RTL
Audience: Iranian gamers, 16–35 years old, mobile-first
Tone: Modern, energetic, trustworthy, tech-forward

TECH STACK

Backend: Laravel 11 + PHP 8.3 + Filament 3 + MySQL
Frontend: React 18 + TypeScript + Tailwind CSS v3 + Vite + shadcn/ui
Auth: Laravel Sanctum (token-based)
Payment: Zarinpal (Iran)
Queue: Database driver + Supervisor (2 workers)
Email: Gmail SMTP via Queue
Server: Ubuntu + Nginx + PHP-FPM 8.3 + Let's Encrypt SSL
PWA: Service Worker + Web App Manifest
RTL: All frontend must use dir="rtl" and lang="fa". Use Tailwind's RTL plugin. All spacing, flex, and grid must respect RTL direction.

DESIGN SYSTEM

Visual Identity

Style: Dark minimalist gaming — inspired by PlayStation, Razer, and modern esports sites

Primary background: #0A0A0F (near-black, not pure black — easier on eyes)

Surface / card background: #12121C

Elevated surface: #1A1A28

Primary accent: #7C3AED (electric violet — brand color)

Secondary accent: #06B6D4 (cyan — highlights, badges)

Success: #10B981

Warning: #F59E0B

Danger: #EF4444

Primary text: #F1F5F9

Secondary text: #94A3B8

Muted text: #475569

Border subtle: rgba(124, 58, 237, 0.15)

Border active: rgba(124, 58, 237, 0.5)

Typography

Persian display font: Vazirmatn Bold (weight 700–800) — for headings, product names

Persian body font: Vazirmatn Regular (weight 400) — for descriptions, UI text

Number / price font: Orbitron or Rajdhani from Google Fonts — for prices, countdown timers, badges (gives gaming feel to numbers)

Font scale:

Hero headline: 48–64px, weight 800

Section title: 28–36px, weight 700

Card title: 18–20px, weight 600

Body: 14–16px, weight 400

Caption/badge: 11–12px, weight 600, uppercase

Signature Design Elements

Glowing product cards — subtle violet glow (box-shadow: 0 0 20px rgba(124, 58, 237, 0.2)) on hover, border transitions from muted to violet

RGB badge strip — thin 2px top border on hero section with animated gradient: violet → cyan → violet (CSS keyframes, 3s loop)

Price display — use Orbitron/Rajdhani font, cyan color (#06B6D4) for price numbers, gives "HUD" feel

Skeleton loading — all product cards show animated skeleton before data loads (gray shimmer)

Stock indicator — colored dot (green=in stock, red=out of stock, amber=low stock) on every product card

Platform badges — PS5 / PS4 / Xbox / Nintendo pill badges on product cards with brand colors

Scroll-triggered reveal — product cards fade+slide up when entering viewport (Intersection Observer, no heavy library)

Mobile bottom nav — fixed bottom navigation bar on mobile: Home, Categories, Search, Cart, Profile

RTL-Specific Rules

All flex rows: default flex-row-reverse for RTL or use Tailwind rtl: variants

Icons in buttons: icon on LEFT in LTR = icon on RIGHT in RTL

Breadcrumbs: right to left

Pagination: reversed

All text-align: right by default

Persian number formatting: use toLocaleString('fa-IR') for prices

Date: Solar Hijri (Jalali) format using date-fns-jalali

Currency: تومان (Toman) — display as ۱,۲۵۰,۰۰۰ تومان

BACKEND — FULL MODULE ARCHITECTURE

Module 1: Catalog

// Models
Product {
    id, name, slug, description, short_description
    category_id, brand_id
    price, sale_price, cost_price
    stock, low_stock_threshold
    images[] // JSON array of paths
    specs // JSON — e.g. {"storage":"825GB","color":"white","generation":"PS5"}
    condition // enum: new, used, refurbished
    platform[] // JSON — ["PS5","PS4"]
    weight, dimensions
    is_featured, is_active, is_digital
    meta_title, meta_description, meta_keywords
    view_count, sold_count
    timestamps, softDeletes
}

Category {
    id, name, slug, description
    parent_id // self-referential for sub-categories
    icon, image, color
    sort_order, is_active
    // Examples: کنسول > PS5, PS4, Xbox | لوازم جانبی | بازی‌ها
}

Brand {
    id, name, slug, logo, description
    country, website
    is_active
    // Examples: Sony, Microsoft, Nintendo, Razer, Corsair
}

ProductVariant {
    id, product_id
    name, value // e.g. name="رنگ" value="سفید"
    sku, price_modifier, stock
    image
}

GameTitle {
    id, name, slug
    platform[] // JSON
    genre, age_rating, publisher
    release_date, cover_image, description
}


Module 2: Orders & Cart

Cart {
    id, user_id (nullable), session_id
    items // JSON [{product_id, variant_id, qty, price}]
    coupon_code
    expires_at
}

Order {
    id, reference_number // e.g. IMA-1403-00123
    user_id
    status // enum: pending,paid,processing,shipped,delivered,cancelled,refunded
    items_total, discount_amount, shipping_amount, tax_amount, final_total
    shipping_address // JSON snapshot
    payment_status // enum: pending,paid,failed,refunded
    payment_method // zarinpal
    zarinpal_authority, zarinpal_ref_id, zarinpal_card_pan
    paid_at, shipped_at, delivered_at
    tracking_code // postal tracking
    customer_note, admin_note
    timestamps
}

OrderItem {
    id, order_id, product_id, variant_id
    product_name, variant_name // snapshot at time of order
    quantity, unit_price, total_price
    product_snapshot // JSON — full product data at purchase time
}

Address {
    id, user_id
    title // e.g. "خانه", "محل کار"
    recipient_name, phone
    province, city, district
    address, postal_code
    is_default
}


Module 3: Services (خدمات)

ServiceType {
    id, name, slug, description
    price_min, price_max // range shown to customer
    duration_estimate // e.g. "۱–۲ روز کاری"
    is_active, sort_order
    // Examples:
    // نصب بازی روی PS5
    // نصب بازی روی کامپیوتر
    // تعمیر کنسول PS5
    // تعمیر کنسول PS4
    // تعمیر دسته
}

ServiceRequest {
    id, reference_number // e.g. SRV-1403-00045
    user_id (nullable) // can submit without account
    service_type_id
    device_type, device_model // e.g. PS5 Digital Edition
    problem_description
    images[] // JSON — customer uploads photos of device
    status // enum: pending,confirmed,received,in_progress,done,cancelled
    scheduled_at // appointment datetime
    final_price
    technician_notes
    contact_name, contact_phone
    timestamps
}

Appointment {
    id, service_request_id
    date, time_slot // e.g. "10:00-11:00"
    status // available,booked,done,cancelled
}


Module 4: Users & Engagement

User {
    id, name, email, phone (nullable)
    password
    email_verified_at
    avatar
    is_active
    timestamps
}

Wishlist {
    user_id, product_id
    timestamps
}

Review {
    id, user_id, product_id, order_item_id
    rating // 1–5
    title, body
    images[] // JSON
    is_verified_purchase // auto-set if user bought the product
    is_approved
    helpful_count
    timestamps
}

Coupon {
    id, code
    type // percent, fixed
    value, min_order_amount, max_discount_amount
    usage_limit, used_count
    user_id (nullable) // if null = public coupon
    starts_at, expires_at
    is_active
}


Module 5: Content

BlogPost {
    id, title, slug, excerpt, body
    cover_image, author_id
    category // e.g. "اخبار گیمینگ", "راهنمای خرید", "بررسی بازی"
    tags[] // JSON
    is_published, published_at
    view_count
    meta_title, meta_description
}

Banner {
    id, title, subtitle, image
    link, button_text
    position // hero, sidebar, category-top
    sort_order, is_active
    starts_at, ends_at
}

FAQ {
    id, question, answer
    category // "سفارش", "خدمات", "پرداخت", "ضمانت"
    sort_order, is_active
}

SiteSetting {
    key, value
    // Examples: site_name, phone, address, telegram, instagram
    // shipping_free_threshold, shipping_cost
    // zarinpal_merchant_id
}


API ENDPOINTS — Full List

Base URL: /api/v1/
Auth: Bearer token via Sanctum

# Authentication
POST   /auth/register
POST   /auth/login
POST   /auth/logout
POST   /auth/forgot-password
POST   /auth/reset-password
GET    /auth/me

# Catalog
GET    /products                    ?category=&brand=&platform=&condition=&min_price=&max_price=&sort=&page=
GET    /products/featured
GET    /products/new-arrivals
GET    /products/on-sale
GET    /products/{slug}
GET    /products/{slug}/similar
GET    /products/{slug}/reviews
POST   /products/{slug}/reviews     [auth]
GET    /categories                  (tree structure with children)
GET    /categories/{slug}
GET    /categories/{slug}/products
GET    /brands
GET    /brands/{slug}
GET    /brands/{slug}/products
GET    /search?q=

# Cart (session-based for guests, user-based for auth)
GET    /cart
POST   /cart/add                    {product_id, variant_id, quantity}
PUT    /cart/update                 {item_id, quantity}
DELETE /cart/remove/{item_id}
DELETE /cart/clear
POST   /cart/apply-coupon           {code}
DELETE /cart/remove-coupon

# Checkout & Payment
POST   /checkout/validate           validate cart + address before payment
POST   /checkout/create-order       create order, get Zarinpal payment URL
GET    /checkout/verify             Zarinpal callback (Authority + Status)

# Order Tracking (public)
GET    /orders/track/{reference}

# Services
GET    /services
GET    /services/{slug}
GET    /services/appointments/available?date=
POST   /services/request            {service_type_id, device_model, problem, contact_name, contact_phone}

# User Dashboard [all require auth]
GET    /user/orders
GET    /user/orders/{id}
POST   /user/orders/{id}/cancel
GET    /user/service-requests
GET    /user/service-requests/{id}
GET    /user/addresses
POST   /user/addresses
PUT    /user/addresses/{id}
DELETE /user/addresses/{id}
PUT    /user/addresses/{id}/default
GET    /user/wishlist
POST   /user/wishlist/{productId}
DELETE /user/wishlist/{productId}
PUT    /user/profile
POST   /user/avatar
GET    /user/notifications

# Content
GET    /blog
GET    /blog/latest
GET    /blog/{slug}
GET    /banners?position=
GET    /faq
GET    /settings
GET    /navigation


FRONTEND PAGES — React

Public Pages

/                           Homepage
/products                   All products with filters sidebar
/products/{slug}            Product detail with gallery, specs, reviews, add to cart
/category/{slug}            Category page with sub-categories
/brand/{slug}               Brand page
/search?q=                  Search results
/cart                       Shopping cart
/checkout                   Checkout: address → review → payment
/payment/result             Payment success/failure page
/orders/track/{ref}         Public order tracking (no login)
/services                   Services overview
/services/{slug}            Service detail page
/services/request           Service request form with appointment picker
/blog                       Blog list
/blog/{slug}                Blog post
/about                      About us
/contact                    Contact form
/faq                        FAQ accordion
/404                        Custom 404 page


User Dashboard (requires auth)

/dashboard                  Overview: recent orders, service requests, notifications
/dashboard/orders           Orders list with status filter
/dashboard/orders/{id}      Order detail with timeline
/dashboard/services         Service requests list
/dashboard/services/{id}    Service request detail
/dashboard/wishlist         Saved products
/dashboard/addresses        Address book
/dashboard/profile          Edit profile
/dashboard/notifications    All notifications


Auth Pages

/login
/register
/forgot-password
/reset-password


KEY UI COMPONENTS

ProductCard

- Dark card (#12121C) with subtle violet border
- Product image (16:9 or square, lazy loaded)
- Platform badge (PS5=blue, PS4=darkblue, Xbox=green, Nintendo=red)
- Condition badge (نو / کارکرده / بازسازی‌شده)
- Discount badge (top-left, red pill) if sale_price exists
- Product name (Vazirmatn Bold, white, 2 lines max, ellipsis)
- Price: sale_price in cyan (Orbitron font) + original strikethrough in gray
- Stock dot indicator
- Add to cart button (full width, violet, hover: glow)
- Wishlist heart icon (top-right)
- Hover: card lifts 4px, violet glow intensifies, image zoom 1.05


Hero Section (Homepage)

- Full-width dark banner with gaming imagery
- Animated gradient border strip (violet→cyan→violet, 3s)
- Main headline in Vazirmatn Bold 56px
- Sub-headline with typewriter effect for "PS5 | Xbox | Nintendo"
- Two CTA buttons: "مشاهده محصولات" (violet) + "خدمات ما" (outline)
- Floating product mockup image (CSS transform: rotate(-5deg))
- Particle background (very subtle, low opacity dots)


Category Grid (Homepage)

- 6 category cards in 2-row grid (3×2 on desktop, 2×3 on mobile)
- Each: dark card, icon (gaming-themed), category name, product count
- Hover: icon glows in accent color


Services Section

- 3 service cards side by side
- Icon (wrench, gamepad, install)
- Service name + short description
- Price range badge
- "درخواست" CTA button


Checkout Flow

Step 1: Cart review (item list, coupon input, price summary)
Step 2: Address selection or add new address
Step 3: Order review + "پرداخت با زرین‌پال" button
Step 4: Redirect to Zarinpal → return to /payment/result


User Dashboard Layout

- Sidebar (desktop): avatar, name, nav links
- Mobile: top tab bar or hamburger
- Sections: my orders, my services, wishlist, addresses, profile
- Order card: reference number, date, status badge, total, "جزئیات" link
- Order detail: product list + status timeline (pending→paid→processing→shipped→delivered)


FILAMENT ADMIN PANEL

Resources to build:

Products group:
  ProductResource    — with gallery upload, variant management, specs JSON editor
  CategoryResource   — tree view with parent/child, drag-sort
  BrandResource
  GameTitleResource

Orders group:
  OrderResource      — status change with email notification, order timeline widget
  Dashboard widget   — today's revenue, pending orders count, new service requests

Services group:
  ServiceRequestResource  — status board (Kanban-style), appointment calendar
  ServiceTypeResource
  AppointmentResource

Users group:
  UserResource
  ReviewResource     — approve/reject with preview

Content group:
  BlogPostResource   — rich text editor
  BannerResource     — with position selector
  FaqResource

Marketing group:
  CouponResource
  NewsletterResource

Settings:
  SiteSettingResource  — key-value store for site config
  ShippingSettingResource


ZARINPAL PAYMENT FLOW

// 1. Create order → request payment
POST https://api.zarinpal.com/pg/v4/payment/request.json
{
  merchant_id: config('zarinpal.merchant_id'),
  amount: $order->final_total * 10, // convert Toman to Rial
  description: "پرداخت سفارش " . $order->reference_number,
  callback_url: "https://iranmehrafzar.ir/api/v1/checkout/verify",
  metadata: { order_id: $order->id }
}
// Response: authority token → redirect user to:
// https://www.zarinpal.com/pg/StartPay/{authority}

// 2. Verify on callback
POST https://api.zarinpal.com/pg/v4/payment/verify.json
{
  merchant_id, amount, authority
}
// Success: Status=100, ref_id → mark order as paid
// Failure: Status!=100 → mark order as failed, redirect to failure page


NOTIFICATIONS (via Queue)

User receives email when:

Account registered (welcome email)

Order confirmed (with order summary)

Payment successful (with receipt)

Order status changes (processing / shipped with tracking code / delivered)

Service request confirmed (with appointment date/time)

Service ready for pickup / completed

Admin receives email when:

New order placed

New service request submitted

New review submitted

All emails use Laravel Notifications dispatched to queue. Use Mail::to()->queue() pattern. Gmail SMTP credentials in .env.

SECURITY

Laravel Sanctum for all authenticated routes

Rate limiting: 60 req/min general, 5 req/min for login, 3 req/min for register

Brute force protection on login (lockout after 5 failed attempts, 15min)

CSRF protection on all state-changing requests

Input validation on all API endpoints using Form Requests

XSS protection: sanitize all user text inputs

SQL injection: use Eloquent ORM, no raw queries

Zarinpal verify: always re-verify amount server-side, never trust client

IP blacklist middleware

.env never exposed, APP_DEBUG=false in production

Images validated by MIME type, not extension

PERFORMANCE

API response caching with Cache::remember() for catalog endpoints (5 min TTL)

Cache invalidated on product/category/brand updates

Eager loading on all relationships to prevent N+1

Product list: paginate 20 per page

Images: store original + generate WebP thumbnails via intervention/image

React: code splitting by route (React.lazy + Suspense)

Tailwind CSS purge in production build

Nginx gzip compression

PWA: cache static assets in Service Worker

BUILD ORDER

Build in this exact sequence:

Database migrations — all tables with proper indexes and foreign keys

Eloquent models — all relationships, accessors, scopes

Form Requests — validation for all endpoints

API Resources — JSON transformers for all models

Controllers — CatalogController, CartController, OrderController, PaymentController, ServiceController, UserDashboardController, AuthController

Routes — api.php with proper middleware groups

Filament Resources — admin panel for all models

Zarinpal service — PaymentService class with request/verify methods

Notifications — all email notifications with queue

React pages — start with layout, then homepage, product pages, cart, checkout, dashboard

IMPORTANT NOTES

Site name: ایران مهر افزار / iranmehrafzar.ir

All Persian text must be natural and native, not machine-translated

Jalali dates everywhere (not Gregorian) — use morilog/jalali package for Laravel, date-fns-jalali for React

Phone numbers: Iranian format (09xxxxxxxxx)

Province/city dropdowns: Iranian provinces

Postal code: 10-digit Iranian postal code with validation

All prices in Toman (تومان), displayed with Persian numerals using toLocaleString('fa-IR')

Shipping: flat rate or free above threshold (configurable in settings)

Mobile-first design: 63%+ of Iranian users are on mobile

Support WhatsApp/Telegram contact buttons in footer (common in Iranian e-commerce)

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ee3fb480-268e-48e7-b48b-dfdc365d8ec8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
