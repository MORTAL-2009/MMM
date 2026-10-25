# Make My Marriage — Premium Luxury UI/UX Design Specification & System Architecture

## 1. Visual Philosophy & Experience Principles

Make My Marriage is designed as an ultra-luxury, high-end wedding planning and financial management engine. The aesthetic marries traditional regal elegance (inspired by Indian royal weddings, heritage palaces, and gilded invitations) with modern, frictionless SaaS functionality.

### Core Experience Pillars

1. **Opulent Minimalism:** High contrast, deep backdrop tones paired with reflective metallic accents (Antique Gold, Emerald, Sapphire, Champagne).

2. **Visual Depth & Materiality:** Layered cards with subtle glassmorphism (`backdrop-blur-md`), hairline borders (`border-white/10`), and delicate drop shadows (`shadow-2xl`).

3. **Data Clarity First:** Financial metrics, spending splits, and real-time activity must remain clear, legible, and actionable despite luxury styling.

4. **Touch & Fluidity:** Optimized touch targets (minimum 44x44px), fluid grid layouts, and zero cumulative layout shifts (CLS).

## 2. Color Palettes & Theme Engine Tokens

### Theme 1: Gold Noir (Default Luxury Theme)

* **Primary Background:** `#0b0b0e` (Deep Obsidian Black)
* **Card Background:** `#141419` (Charcoal Velvet)
* **Header/Surface Neutral:** `#1a1a22`
* **Primary Text:** `#f3e5ab` (Warm Ivory)
* **Secondary Text:** `#a1a1aa` (Muted Zinc)
* **Accent Highlight:** `#d4af37` (Antique Gold)
* **Accent Hover:** `#c59f27`
* **Border Hairline:** `#2a2a35`
* **Badge Active:** `rgba(212, 175, 55, 0.12)` text `#d4af37` border `rgba(212, 175, 55, 0.3)`

### Theme 2: Emerald Velvet

* **Primary Background:** `#061a14` (Midnight Emerald)
* **Card Background:** `#0b2b22` (Deep Jade)
* **Header/Surface Neutral:** `#0e352a`
* **Primary Text:** `#e2f7f0` (Frost Mint)
* **Secondary Text:** `rgba(226, 247, 240, 0.7)`
* **Accent Highlight:** `#10b981` (Vibrant Emerald)
* **Border Hairline:** `#154a3b`

### Theme 3: Sapphire Lounge

* **Primary Background:** `#0a1128` (Royal Sapphire)
* **Card Background:** `#121e42` (Deep Navy)
* **Header/Surface Neutral:** `#172754`
* **Primary Text:** `#e0e8ff` (Ice Blue)
* **Secondary Text:** `rgba(224, 232, 255, 0.7)`
* **Accent Highlight:** `#f59e0b` (Warm Amber / Gold)
* **Border Hairline:** `#1d2f66`

### Theme 4: Champagne Pearl (Light Luxury)

* **Primary Background:** `#fdfbf7` (Warm Ivory Pearl)
* **Card Background:** `#ffffff` (Pure White)
* **Header/Surface Neutral:** `#f8f4ec` (Champagne Tint)
* **Primary Text:** `#3d3223` (Deep Bronze)
* **Secondary Text:** `#70624e` (Muted Bronze)
* **Accent Highlight:** `#a88242` (Rich Metallic Gold)
* **Border Hairline:** `#e6dfd3`

## 3. Typography Hierarchy

| Utility | Desktop Size / Weight | Line Height | Application | 
| ----- | ----- | ----- | ----- | 
| **Hero / Headline** | 2.5rem (40px) / Bold (700) | 1.2 | Main Dashboard Hero, Public Invitation Names | 
| **Section Title** | 1.5rem (24px) / SemiBold (600) | 1.3 | Card Headers, Module Titles | 
| **Subtitle / Label** | 0.875rem (14px) / Medium (500) | 1.4 | Metric Labels, Input Headers | 
| **Body Standard** | 0.9375rem (15px) / Normal (400) | 1.5 | Chat Messages, Table Cells, Notes | 
| **Micro Text / Badge** | 0.75rem (12px) / Medium (500) | 1.2 | Timestamps, Payer Badges, Status Tags | 

## 4. Component Layout Blueprint

### 4.1 Navigation & Workspace Bar
* Left-side fixed collapse navigation sidebar with luxury icons (`Lucide-React`).
* Top Bar featuring Wedding Title, Date Countdown badge, Active Family Switcher, and Theme Selector toggle.

### 4.2 Financial Summary KPI Cards (4-Grid Matrix)
1. **Total Wedding Budget** (Editable inline)
2. **Recorded Spending** (Dynamic sum & utilisation bar)
3. **Bride's Side vs Groom's Side Breakdown** (Visual comparison bar)
4. **Pending Payments Alert Card** (Immediate call-to-action list)

### 4.3 Data Tables & Expenses UI
* Responsive scrollable container.
* Filtering row: Category Pills + Family Side Toggle (`All`, `Groom's Side`, `Bride's Side`) + Payment Status Filter (`Paid`, `Pending`).
* Status Badges:
  * `Paid`: Emerald Green outline with subtle green background glow.
  * `Pending`: Amber/Rose warning indicator with high contrast text.

### 4.4 Live Family Chat & Activity Stream
* Messenger layout with search capability.
* Messages color-coded by Family Side:
  * **Groom's Side:** Left-aligned or distinguished with Gold/Bronze badge accent.
  * **Bride's Side:** Right-aligned or distinguished with Emerald/Rose badge accent.
* Input panel with Enter to Send and Shift+Enter multi-line support.

### 4.5 Digital Invitation Builder & Guest Preview Mode
* Dual-pane layout: Form controls on left, real-time live preview rendering on right.
* Share utilities: Single-click WhatsApp URL generator, Instant Link Copy with toast notification, and Public Preview mode toggle.

## 5. Responsive Breakpoint Rules

* **Mobile (`<640px`):** Single column grid, bottom tab bar navigation overlay, auto-hiding sidebar, fluid card width (`w-full`).
* **Tablet (`640px - 1024px`):** 2-column KPI grid, scrollable horizontal tables, sticky header navigation.
* **Desktop (`>1024px`):** Fixed 260px luxury sidebar, 4-column KPI grid, split view for chat and invitation preview.