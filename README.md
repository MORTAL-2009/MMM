# Make My Marriage (MMM) — Luxury Wedding Management Platform

A high-end, full-stack wedding management SaaS web application built with **React**, **Vite**, **Tailwind CSS**, and **Supabase (PostgreSQL + Realtime + RLS)**. Designed specifically for families organizing their own weddings.

---

## 🌟 Core Features

1. **Wedding Expense Tracker**
   - Full expense CRUD with category breakdowns, paid vs. pending tracking, and bride/groom side split.
   - Dynamic budget calculations with overspending alerts and utilisation percentage metrics.
   - INR (₹) locale formatting, real-time search, filters, and CSV export for Excel.

2. **Family Conversations**
   - Shared real-time chat lounge for authorized family members.
   - Distinct family-side badges (`Bride's Side` / `Groom's Side`), timestamps, and autoscroll.
   - Powered by Supabase Realtime with strict workspace isolation.

3. **Digital Wedding Invitations**
   - Live dual-pane invitation builder with real-time card preview.
   - Public guest link (`/invite/:slug`) requiring no login.
   - Instant WhatsApp sharing with pre-filled greeting and Web Share API fallback.

4. **Admin Panel**
   - Role-Based Access Control (RBAC): `Owner`, `Admin`, `Family Member`, `Public Guest`.
   - Member management: invite collaborators, assign roles, remove members.
   - Complete audit trail of administrative actions.

5. **Luxury Design System & 4 Royal Themes**
   - **Gold Noir** (Default): Deep charcoal with antique gold accents.
   - **Emerald Velvet**: Deep forest emerald, dark green, and gold accents.
   - **Sapphire Lounge**: Midnight navy blue, royal sapphire, and gold accents.
   - **Champagne Pearl**: Warm ivory, champagne, pearl, and soft gold.

---

## 🏗️ Project Folder Structure

```text
make-my-marriage/
├── public/
│   └── wedding-rings.svg           # Luxury SVG favicon & assets
├── src/
│   ├── assets/                     # Static graphics and icons
│   ├── components/
│   │   ├── ui/                     # Reusable design tokens (Button, Card, Badge)
│   │   └── layout/                 # AppLayout, Navbar, Sidebar
│   ├── contexts/
│   │   ├── AuthContext.jsx         # Supabase Auth & active workspace session
│   │   └── ThemeContext.jsx        # 4 luxury themes with localStorage persistence
│   ├── lib/
│   │   ├── supabase.js             # Supabase client setup with sandbox fallback
│   │   ├── permissions.js          # Role-Based Access Control matrix
│   │   └── utils.js                # Currency (₹), date, and class merging
│   ├── pages/
│   │   ├── auth/                   # LoginPage, SignupPage
│   │   ├── dashboard/              # DashboardPage with 6 financial summary cards
│   │   ├── expenses/               # ExpensesPage with filtering & recording modal
│   │   ├── chat/                   # ChatPage real-time family lounge
│   │   ├── invitation/             # InvitationPage studio & PublicInvitationPage
│   │   ├── admin/                  # AdminPage with member management & audit log
│   │   ├── reports/                # ReportsPage with category analytics & CSV export
│   │   └── settings/               # SettingsPage with theme & profile controls
│   ├── styles/
│   │   └── index.css               # Tailwind directives & CSS theme tokens
│   ├── App.jsx                     # Route architecture
│   └── main.jsx                    # Vite app entry point
├── supabase/
│   └── migrations/
│       └── 20260301000000_init_schema.sql  # Complete PostgreSQL schema & RLS policies
├── .env.example                    # Environment variable template
├── .gitignore                      # Git ignore file
├── package.json                    # Project dependencies and npm scripts
├── tailwind.config.js              # Custom theme extensions and colors
├── vite.config.js                  # Vite configuration
└── PRD.md                          # Complete Product Requirements Document
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node v24)
- **NPM**: v9+

### 2. Installation
Dependencies are already installed. If running in a fresh clone:
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your Supabase project credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_DEFAULT_THEME=gold-noir
```
*(Note: If Supabase keys are not set, the app runs in **Sandbox Mode** with interactive mock data so all features can be explored immediately!)*

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Applying Database Migrations
To connect your live Supabase project:
1. Open the Supabase Dashboard -> **SQL Editor**.
2. Run the SQL script found in `supabase/migrations/20260301000000_init_schema.sql`.
3. This creates all 9 tables, indexes, helper functions, and Row Level Security (RLS) policies.
