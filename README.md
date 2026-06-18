# VantaX — Performance Marketing Agency Website

A production-ready Next.js 15 website for VantaX, a performance marketing agency. Built with a dark luxury SaaS aesthetic, full backend, email notifications, and Calendly booking integration.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Database**: PostgreSQL via Prisma
- **Email**: Resend
- **Scheduling**: Calendly embed
- **UI**: Custom components (shadcn/ui-inspired)

## Prerequisites

- Node.js 18.17+
- PostgreSQL database (local or hosted)
- Resend account (for email)
- Calendly account (for booking)

## Environment Setup

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

```env
# PostgreSQL connection string
DATABASE_URL="postgresql://user:password@localhost:5432/vantax"

# Resend API key — get from resend.com
RESEND_API_KEY="re_xxxxxxxxxx"

# Email addresses
RESEND_FROM_EMAIL="hello@vantax.agency"   # verified sender domain
RESEND_TO_EMAIL="team@vantax.agency"       # where leads are sent

# Your production URL (no trailing slash)
NEXT_PUBLIC_APP_URL="https://vantax.agency"

# Your Calendly scheduling URL
NEXT_PUBLIC_CALENDLY_URL="https://calendly.com/your-username/strategy-call"
```

## Installation

```bash
npm install
```

## Database Setup

```bash
# Push schema to database
npm run db:push

# Or run migrations (recommended for production)
npm run db:migrate

# Generate Prisma client (auto-runs on install via postinstall)
npm run db:generate
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy

### Other platforms (Railway, Render, Fly.io)

```bash
# Build
npm run build

# Start
npm start
```

Ensure `DATABASE_URL` is set in your platform's environment variables.

## Resend Setup

1. Create account at [resend.com](https://resend.com)
2. Add and verify your sending domain
3. Create an API key
4. Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in env

## Calendly Setup

1. Create account at [calendly.com](https://calendly.com)
2. Set up an event type (e.g. "30-minute Strategy Call")
3. Copy the scheduling URL (e.g. `https://calendly.com/yourname/strategy-call`)
4. Set `NEXT_PUBLIC_CALENDLY_URL` in env

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata & schema markup
│   ├── page.tsx            # Home page (assembles all sections)
│   ├── globals.css         # Global styles & CSS variables
│   ├── robots.ts           # robots.txt generation
│   ├── sitemap.ts          # sitemap.xml generation
│   ├── privacy/page.tsx    # Privacy policy
│   ├── terms/page.tsx      # Terms of service
│   └── api/
│       ├── contact/route.ts  # Contact form API
│       └── audit/route.ts    # Audit request API
├── components/
│   ├── navigation/
│   │   └── Navbar.tsx      # Sticky nav with blur
│   └── sections/
│       ├── Hero.tsx         # Hero with animated growth chart
│       ├── Trust.tsx        # Trust cards
│       ├── Services.tsx     # Expandable service cards
│       ├── GrowthFramework.tsx  # 5-phase framework UI
│       ├── WhyVantaX.tsx    # Differentiators
│       ├── FreeAudit.tsx    # Lead magnet with form
│       ├── FAQ.tsx          # Accordion FAQ
│       ├── Contact.tsx      # Enterprise contact form
│       ├── Booking.tsx      # Calendly embed
│       └── Footer.tsx       # Footer
├── lib/
│   ├── db.ts               # Prisma client
│   ├── email.ts            # Resend email functions
│   ├── rate-limit.ts       # In-memory rate limiting
│   ├── validations.ts      # Zod schemas
│   └── utils.ts            # Utilities
└── prisma/
    └── schema.prisma       # Database schema
```

## Features

### Frontend
- Fully responsive across all screen sizes
- Premium dark luxury aesthetic (Linear/Stripe-inspired)
- Framer Motion scroll reveals, hover effects, and micro-interactions
- Animated hero growth visualization
- Interactive 5-phase growth framework with tab navigation
- Expandable service cards
- Accordion FAQ
- Real-time form validation with error states and success states
- Smooth scroll navigation

### Backend
- Zod schema validation on all form submissions
- Lead storage in PostgreSQL
- Email notifications to team on new leads
- Email confirmations to leads
- Rate limiting (5 submissions per IP per hour)
- Security headers (X-Frame-Options, CSP, HSTS, etc.)

### SEO
- Metadata with Open Graph and Twitter Card
- JSON-LD Schema markup (LocalBusiness + OfferCatalog)
- robots.txt and sitemap.xml
- Semantic HTML structure
- Accessible form labels and ARIA attributes

## Customization

### Calendly URL
Update `NEXT_PUBLIC_CALENDLY_URL` in your env file.

### Email addresses
Update `RESEND_FROM_EMAIL` and `RESEND_TO_EMAIL` in your env file.

### Colors
The color scheme is defined in `src/app/globals.css` via CSS custom properties.

### Content
All copy is co-located with components in `src/components/sections/`. Each section file contains its own data arrays and content — no separate data files needed.

## License

Private — all rights reserved. VantaX.
