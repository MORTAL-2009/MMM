const fs = require('fs');

const header = fs.readFileSync('stitch_export/jsx_header.txt', 'utf8');
const s1 = fs.readFileSync('stitch_export/jsx_s1.txt', 'utf8');
const s2 = fs.readFileSync('stitch_export/jsx_s2.txt', 'utf8');
const s3 = fs.readFileSync('stitch_export/jsx_s3.txt', 'utf8');
const s4 = fs.readFileSync('stitch_export/jsx_s4.txt', 'utf8');
const s5 = fs.readFileSync('stitch_export/jsx_s5.txt', 'utf8');
const s6 = fs.readFileSync('stitch_export/jsx_s6.txt', 'utf8');
const s7 = fs.readFileSync('stitch_export/jsx_s7.txt', 'utf8');
const s8 = fs.readFileSync('stitch_export/jsx_s8.txt', 'utf8');
const footer = fs.readFileSync('stitch_export/jsx_footer.txt', 'utf8');

console.log('Assembling LandingPage.jsx with interactive components...');

// Let's create an elegant, robust, fully functional LandingPage.jsx
const code = `import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState('Overview');
  const [filterAtelier, setFilterAtelier] = useState('All Outlays');
  const [activePalette, setActivePalette] = useState('emerald');
  const [crestInitials, setCrestInitials] = useState('A&K');
  const [approvalChecked, setApprovalChecked] = useState(true);
  const [passcodeChecked, setPasscodeChecked] = useState(true);
  const [savedToast, setSavedToast] = useState(false);
  const [milestones, setMilestones] = useState([
    { id: 1, title: 'Confirm Royal Sangeet Choreographer', due: 'Due Nov 10 · Verma Family', urgent: true, done: false },
    { id: 2, title: 'Finalize Mehendi Silver Favors', due: 'Due Nov 15 · Sharma Family', urgent: false, done: true },
    { id: 3, title: 'Review Gold Foil Digital Invitation Proof', due: 'Due Nov 18 · Aanya & Kabir', urgent: false, done: false },
  ]);

  const toggleMilestone = (id) => {
    setMilestones(prev => prev.map(m => m.id === id ? { ...m, done: !m.done } : m));
  };

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2800);
  };

  const handleReset = () => {
    setActivePalette('emerald');
    setCrestInitials('A&K');
    setApprovalChecked(true);
    setPasscodeChecked(true);
  };

  const paletteConfigs = {
    emerald: {
      name: 'Emerald & Champagne Gold',
      cardClass: 'bg-[#0D221A] text-[#FAF6EF] border-2 border-gold-accent shadow-[0_16px_45px_rgba(13,34,26,0.3)]',
      textAccent: 'text-gold-accent',
      quoteClass: 'text-gold-light italic font-cormorant font-light text-base',
      venueClass: 'text-[#FAF6EF]',
      footerClass: 'text-gold-accent',
      crestClass: 'text-gold-accent border-gold-accent',
      quoteText: 'Two families united in eternal grace',
      venueText: 'THE OBEROI RAJVILAS · UDAIPUR',
      badgeText: 'Sacred Nuptials & Reception',
    },
    ivory: {
      name: 'Heritage Ivory & Gold',
      cardClass: 'bg-[#FAF6EF] text-[#0D221A] border-2 border-gold-accent shadow-[0_16px_45px_rgba(116,90,39,0.12)]',
      textAccent: 'text-primary',
      quoteClass: 'text-on-surface-variant italic font-cormorant font-normal text-base',
      venueClass: 'text-primary',
      footerClass: 'text-secondary font-semibold',
      crestClass: 'text-primary border-gold-accent bg-[#F0E9DC]',
      quoteText: 'Auspicious blessings woven in pure cotton rag',
      venueText: 'THE TAJ LAKE PALACE · UDAIPUR',
      badgeText: 'Heirloom Ceremony Suite',
    },
    ruby: {
      name: 'Royal Ruby & Velvet Twilight',
      cardClass: 'bg-[#4A1521] text-[#FAF6EF] border-2 border-gold-accent shadow-[0_16px_45px_rgba(74,21,33,0.35)]',
      textAccent: 'text-gold-accent',
      quoteClass: 'text-[#E9DAC0] italic font-cormorant font-light text-base',
      venueClass: 'text-[#FAF6EF]',
      footerClass: 'text-gold-accent',
      crestClass: 'text-gold-accent border-gold-accent',
      quoteText: 'Imperial celebrations of two illustrious lineages',
      venueText: 'RAMBAGH PALACE · JAIPUR',
      badgeText: 'Grand Royal Sangeet & Pheras',
    },
  };

  const currentPalette = paletteConfigs[activePalette] || paletteConfigs.emerald;

  const expensesData = [
    { title: 'The Oberoi Rajvilas · 1st Retainer', cat: 'Palace & Suites', payer: 'Settled by Mr. R. Verma', amount: '₹2,00,000', status: 'Settled', statusClass: 'bg-[#0D221A] text-gold-accent border-gold-accent/40' },
    { title: 'Sabyasachi Bridal Ensemble Retainer', cat: 'Royal Attire', payer: 'Settled by Mrs. P. Sharma', amount: '₹85,000', status: 'Settled', statusClass: 'bg-[#0D221A] text-gold-accent border-gold-accent/40' },
    { title: 'Lotus Mandap & Floral Artistry', cat: 'Mandap & Jasmine', payer: 'Shared 50/50 Dual Approval', amount: '₹40,000', status: 'Pending Review', statusClass: 'bg-[#F4EDE0] text-secondary border-gold-accent/40' },
    { title: 'Cinematic Film & Drone Master Retainer', cat: 'Cinematography', payer: 'Shared 50/50', amount: '₹60,000', status: 'Shared 50/50', statusClass: 'bg-[#E7DFCE] text-primary border-gold-accent/30' },
  ];

  const filteredExpenses = filterAtelier === 'All Outlays' 
    ? expensesData 
    : expensesData.filter(e => e.cat.toLowerCase().includes(filterAtelier.toLowerCase().split('&')[0].trim()));

  return (
    <div className="min-h-screen bg-[#F7F2E8] text-[#1A1E1C] font-sans selection:bg-[#C5A059]/20 selection:text-[#0D221A]">
      {/* Toast Notification */}
      {savedToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#0D221A] text-gold-accent border-2 border-gold-accent px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-bounce text-xs font-semibold uppercase tracking-wider">
          <span className="material-symbols-outlined text-sm">verified</span>
          <span>Atelier Brand Preferences Saved!</span>
        </div>
      )}

      {/* ── STITCH HEADER ── */}
      <header className="fixed top-0 w-full z-50 bg-[#FAF6EF]/90 backdrop-blur-md border-b border-[#C5A059]/25 shadow-[0_2px_15px_rgba(13,34,26,0.03)]">
        <div className="h-20 w-full max-w-[1360px] mx-auto px-6 md:px-10 lg:px-14 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="p-1 rounded-full border border-gold-accent/40 bg-[#FAF6EF]">
              <img
                alt="Make My Marriage Brandmark"
                className="h-8 w-8 object-contain"
                src="/wedding-rings.svg"
              />
            </div>
            <Link to="/" className="font-headline-sm text-xl tracking-tight text-primary font-medium tracking-normal">
              Make My Marriage
              <span className="text-gold-accent text-xs ml-1.5 font-light tracking-widest uppercase">
                Couture
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a className="text-xs uppercase tracking-[0.2em] font-semibold text-on-surface-variant hover:text-gold-accent transition-colors" href="#features-overview">
              Features
            </a>
            <a className="text-xs uppercase tracking-[0.2em] font-semibold text-on-surface-variant hover:text-gold-accent transition-colors" href="#how-it-works">
              How It Works
            </a>
            <a className="text-xs uppercase tracking-[0.2em] font-semibold text-on-surface-variant hover:text-gold-accent transition-colors" href="#stationery-preview">
              Invitations
            </a>
            <a className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-gold-accent/30 bg-[#F4EDE0]/60 text-xs uppercase tracking-[0.18em] font-semibold text-primary hover:border-gold-accent transition-all group" href="#admin-panel-section">
              <span className="material-symbols-outlined text-sm text-secondary group-hover:rotate-45 transition-transform">tune</span>
              Admin Suite
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-secondary/15 text-secondary tracking-widest font-bold">New</span>
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Link className="text-xs uppercase tracking-[0.18em] font-semibold text-on-surface-variant hover:text-primary transition-colors hidden sm:block" to="/login">
              Log in
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center bg-primary hover:bg-[#16382C] text-[#F7F2E8] border border-gold-accent/40 text-xs uppercase tracking-[0.18em] font-semibold px-6 py-3 rounded-full shadow-[0_4px_16px_rgba(13,34,26,0.22)] transition-all"
            >
              Launch Atelier
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-primary hover:bg-parchment-low"
              aria-label="Toggle Navigation"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF6EF] border-b border-gold-accent/30 px-6 py-4 space-y-3">
            <a onClick={() => setMobileMenuOpen(false)} href="#features-overview" className="block text-xs uppercase tracking-[0.2em] font-semibold text-on-surface-variant hover:text-gold-accent py-1">
              Features
            </a>
            <a onClick={() => setMobileMenuOpen(false)} href="#how-it-works" className="block text-xs uppercase tracking-[0.2em] font-semibold text-on-surface-variant hover:text-gold-accent py-1">
              How It Works
            </a>
            <a onClick={() => setMobileMenuOpen(false)} href="#workspace-demo" className="block text-xs uppercase tracking-[0.2em] font-semibold text-on-surface-variant hover:text-gold-accent py-1">
              Concierge Workspace
            </a>
            <a onClick={() => setMobileMenuOpen(false)} href="#stationery-preview" className="block text-xs uppercase tracking-[0.2em] font-semibold text-on-surface-variant hover:text-gold-accent py-1">
              Digital Stationery
            </a>
            <a onClick={() => setMobileMenuOpen(false)} href="#admin-panel-section" className="block text-xs uppercase tracking-[0.2em] font-semibold text-secondary py-1">
              Admin Suite (New)
            </a>
            <div className="pt-2 border-t border-gold-accent/20 flex gap-3">
              <Link to="/login" className="flex-1 py-2 text-center text-xs uppercase tracking-widest font-semibold border border-gold-accent/40 rounded-full">
                Log In
              </Link>
              <Link to="/dashboard" className="flex-1 py-2 text-center text-xs uppercase tracking-widest font-semibold bg-primary text-white rounded-full">
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="w-full pt-20 bg-[#F7F2E8] min-h-screen">
        {/* ── SECTION 1: HERO (STITCH COUTURE) ── */}
        <section className="relative w-full overflow-hidden bg-[#F7F2E8] pt-14 pb-24 md:pb-36 border-b border-gold-accent/20">
          <div className="absolute inset-0 pointer-events-none opacity-80" style={{ background: 'radial-gradient(ellipse 65% 50% at 50% 10%, rgba(197, 160, 89, 0.15), transparent 75%)' }}></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent"></div>
          
          <div className="w-full max-w-[1360px] mx-auto px-6 md:px-10 lg:px-14 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 items-center">
              {/* Left Editorial Copy */}
              <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-4 z-10">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FAF6EF] border border-gold-accent/40 shadow-sm mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-secondary">A Calmer Way to Plan Your Heritage Wedding</span>
                </div>
                
                <h1 className="font-headline-xl text-5xl md:text-6xl text-primary tracking-tight leading-[1.08] mb-6">
                  Two families.<br />
                  <span className="italic font-cormorant font-normal text-secondary text-5xl md:text-6xl tracking-tight">One beautiful celebration.</span>
                </h1>
                
                <p className="font-body-lg text-lg text-on-surface-variant max-w-xl mb-9 leading-relaxed font-light">
                  Bring royal outlays, joint family conversations, and bespoke heirloom invitations together in one serene haven. Designed for multi-generational unions where every memory is sacred.
                </p>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-9">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center bg-primary hover:bg-[#16382C] text-[#F7F2E8] border border-gold-accent/50 text-xs uppercase tracking-[0.2em] font-semibold px-8 py-4 rounded-full shadow-[0_8px_24px_rgba(13,34,26,0.25)] transition-all group"
                  >
                    Start planning
                    <span className="material-symbols-outlined ml-2 text-sm text-gold-accent group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                  <a
                    className="inline-flex items-center justify-center bg-[#FAF6EF] hover:bg-[#F0E9DC] text-primary border border-gold-accent/40 text-xs uppercase tracking-[0.2em] font-semibold px-8 py-4 rounded-full transition-all shadow-sm"
                    href="#features-overview"
                  >
                    Explore features
                  </a>
                </div>
                
                <div className="flex items-center gap-2.5 text-on-surface-variant border-t border-gold-accent/25 pt-4 w-full max-w-md">
                  <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
                  <span className="text-xs uppercase tracking-wider text-outline font-medium">Bespoke concierge coordination for couples &amp; elders</span>
                </div>
              </div>

              {/* Right Visual Showcase with Floating Card */}
              <div className="lg:col-span-6 relative mt-4 lg:mt-0">
                <div className="relative w-full aspect-[4/3] sm:aspect-[14/11] rounded-2xl overflow-hidden border-2 border-gold-accent/40 shadow-[0_20px_50px_-10px_rgba(13,34,26,0.22)] bg-parchment p-1.5">
                  <div className="w-full h-full rounded-xl overflow-hidden relative">
                    <img
                      className="w-full h-full object-cover"
                      alt="Indian wedding couple in emerald lehenga and cream sherwani"
                      src="/stitch-hero-couple.png"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute inset-0 border border-gold-accent/30 pointer-events-none rounded-xl"></div>
                  </div>
                </div>

                {/* Floating Live Budget Preview Card */}
                <div className="relative md:absolute md:-bottom-10 md:-left-8 w-full md:w-[360px] mt-6 md:mt-0 bg-[#FAF6EF] rounded-xl p-5 border border-gold-accent/40 shadow-[0_24px_45px_-12px_rgba(13,34,26,0.28)] z-20">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E7DFCE]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#0D221A] flex items-center justify-center text-gold-accent border border-gold-accent/40">
                        <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
                      </div>
                      <span className="font-headline-sm text-base text-primary font-semibold">Budget Portfolio</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F4EDE0] border border-gold-accent/40 text-secondary text-[10px] font-bold tracking-widest uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                      Live Ledger
                    </span>
                  </div>

                  <div className="py-3">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Spent to Date</span>
                      <span className="font-headline-sm text-xl text-primary tracking-tight font-semibold">
                        ₹3,25,000 <span className="text-xs text-outline font-normal">/ ₹8,00,000</span>
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-[#E7DFCE] overflow-hidden flex border border-gold-accent/20">
                      <div className="h-full bg-primary" style={{ width: '40.6%' }}></div>
                      <div className="h-full bg-gold-accent" style={{ width: '14%' }}></div>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-on-surface-variant text-xs">
                      <span className="text-outline font-light">40.6% allocated</span>
                      <span className="font-semibold text-secondary tracking-wide">₹4,75,000 remaining</span>
                    </div>
                  </div>

                  {/* Ledger Items */}
                  <div className="space-y-2 pt-2 border-t border-[#E7DFCE]">
                    <div className="flex items-center justify-between text-left p-1.5 rounded hover:bg-[#F4EFE6] transition-colors">
                      <div className="min-w-0 pr-2">
                        <p className="text-xs text-on-surface truncate font-semibold">Royal Palace Venue Advance</p>
                        <p className="text-[10px] uppercase tracking-wider text-outline">Paid · Groom's Family</p>
                      </div>
                      <span className="text-xs font-semibold text-primary whitespace-nowrap">₹2,00,000</span>
                    </div>
                    <div className="flex items-center justify-between text-left p-1.5 rounded hover:bg-[#F4EFE6] transition-colors">
                      <div className="min-w-0 pr-2">
                        <p className="text-xs text-on-surface truncate font-semibold">Couture Lehenga &amp; Sherwani</p>
                        <p className="text-[10px] uppercase tracking-wider text-outline">Paid · Bride's Family</p>
                      </div>
                      <span className="text-xs font-semibold text-primary whitespace-nowrap">₹85,000</span>
                    </div>
                    <div className="flex items-center justify-between text-left p-1.5 rounded hover:bg-[#F4EFE6] transition-colors">
                      <div className="min-w-0 pr-2">
                        <p className="text-xs text-on-surface truncate font-semibold">Floral Mandap Decorator</p>
                        <p className="text-[10px] uppercase tracking-wider text-secondary">Shared 50/50 · In Review</p>
                      </div>
                      <span className="text-xs font-semibold text-primary whitespace-nowrap">₹40,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: 3 VALUE PILLARS (STITCH) ── */}
        <section className="w-full max-w-[1360px] mx-auto px-6 md:px-10 lg:px-14 -mt-8 md:-mt-12 mb-20 z-30 relative">
          <div className="bg-[#FAF6EF] rounded-2xl border border-gold-accent/40 p-6 md:p-8 shadow-[0_12px_36px_rgba(13,34,26,0.06)] relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-gold-accent/5 pointer-events-none"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x md:divide-gold-accent/30">
              {/* Column 1 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F0E9DC] flex items-center justify-center shrink-0 border border-gold-accent/40 text-secondary">
                  <span className="material-symbols-outlined text-2xl">account_balance</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-lg text-primary mb-1">Every expense in harmony</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed font-light">
                    Transparent vendor retainers, parent allocations, and balanced budgets without spreadsheet confusion.
                  </p>
                </div>
              </div>
              {/* Column 2 */}
              <div className="flex items-start gap-4 md:pl-8">
                <div className="w-12 h-12 rounded-xl bg-[#0D221A] flex items-center justify-center shrink-0 border border-gold-accent/40 text-gold-accent">
                  <span className="material-symbols-outlined text-2xl">family_restroom</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-lg text-primary mb-1">Both families in cadence</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed font-light">
                    Clear milestone updates, discreet side-notes, and unified decision logs honoring mutual traditions.
                  </p>
                </div>
              </div>
              {/* Column 3 */}
              <div className="flex items-start gap-4 md:pl-8">
                <div className="w-12 h-12 rounded-xl bg-[#F0E9DC] flex items-center justify-center shrink-0 border border-gold-accent/40 text-secondary">
                  <span className="material-symbols-outlined text-2xl">drafts</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-lg text-primary mb-1">Invitations worth cherishing</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed font-light">
                    Bespoke gilded digital stationery delivered privately with instant RSVP concierge tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: CURATED ATELIER MODULES ── */}
        <section className="w-full py-16 bg-[#F4EFE6] border-t border-b border-gold-accent/25" id="features-overview">
          <div className="w-full max-w-[1360px] mx-auto px-6 md:px-10 lg:px-14">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-8 h-px bg-gold-accent"></span>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-secondary">Curated Atelier Modules</span>
                <span className="w-8 h-px bg-gold-accent"></span>
              </div>
              <h2 className="font-headline-lg text-3xl md:text-4xl text-primary mt-1 mb-4 tracking-tight">
                The planning feels effortless when every ritual is honored.
              </h2>
              <p className="text-base text-on-surface-variant font-light">
                From the earliest auspicious date discussions to the final guest farewell, coordinate every milestone with poise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature 1: Wedding Expenses */}
              <div className="bg-[#FAF6EF] rounded-2xl border border-gold-accent/40 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-accent/5 rounded-bl-full pointer-events-none"></div>
                <div>
                  <div className="w-11 h-11 rounded-lg bg-[#0D221A] border border-gold-accent/40 flex items-center justify-center mb-5 text-gold-accent">
                    <span className="material-symbols-outlined text-xl">pie_chart</span>
                  </div>
                  <h3 className="font-headline-sm text-2xl text-primary mb-2">Royal Wedding Outlays</h3>
                  <p className="text-sm text-on-surface-variant mb-6 font-light leading-relaxed">
                    Track vendor deposits, parent contributions, and dual-family allocations without awkward financial conversations.
                  </p>
                </div>
                {/* Micro Spend Breakdown UI */}
                <div className="bg-[#F4EDE0] rounded-xl p-5 border border-gold-accent/30">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-outline">Major Allocations</span>
                    <span className="text-xs text-primary font-semibold">₹6,80,000 committed</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#E2D8C7] flex overflow-hidden mb-4 border border-gold-accent/20">
                    <div className="h-full bg-primary" style={{ width: '45%' }}></div>
                    <div className="h-full bg-secondary" style={{ width: '25%' }}></div>
                    <div className="h-full bg-gold-accent" style={{ width: '18%' }}></div>
                    <div className="h-full bg-outline" style={{ width: '12%' }}></div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      <span className="text-xs text-on-surface font-medium">Palace (45%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      <span className="text-xs text-on-surface font-medium">Banquet (25%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-gold-accent"></span>
                      <span className="text-xs text-on-surface font-medium">Mandap (18%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-outline"></span>
                      <span className="text-xs text-on-surface font-medium">Flora (12%)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2: Family Conversations */}
              <div className="bg-[#FAF6EF] rounded-2xl border border-gold-accent/40 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-accent/5 rounded-bl-full pointer-events-none"></div>
                <div>
                  <div className="w-11 h-11 rounded-lg bg-[#0D221A] border border-gold-accent/40 flex items-center justify-center mb-5 text-gold-accent">
                    <span className="material-symbols-outlined text-xl">forum</span>
                  </div>
                  <h3 className="font-headline-sm text-2xl text-primary mb-2">Family Chambers &amp; Dialogue</h3>
                  <p className="text-sm text-on-surface-variant mb-6 font-light leading-relaxed">
                    Keep planning updates and delicate decisions in one shared salon for both sides, preserving warmth, respect, and grace.
                  </p>
                </div>
                {/* Micro Chat Snippet */}
                <div className="bg-[#F4EDE0] rounded-xl p-4 border border-gold-accent/30 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#0D221A] text-gold-accent border border-gold-accent/40 flex items-center justify-center text-xs font-serif font-bold">S</div>
                    <div className="bg-[#FAF6EF] p-3 rounded-lg rounded-tl-none border border-gold-accent/30 max-w-[85%] shadow-xs">
                      <p className="text-[9px] uppercase tracking-wider text-secondary font-bold mb-0.5">Sharma Family (Bride's Chamber)</p>
                      <p className="text-xs text-on-surface font-normal">Catering tasting for the Rajasthani Royal Thali confirmed for this Sunday afternoon?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 justify-end">
                    <div className="bg-[#0D221A] text-[#FAF6EF] p-3 rounded-lg rounded-tr-none max-w-[85%] border border-gold-accent/30">
                      <p className="text-[9px] uppercase tracking-wider text-gold-accent font-bold mb-0.5">Verma Family (Groom's Chamber)</p>
                      <p className="text-xs text-[#F7F2E8] font-normal">Splendid. Kabir uploaded the Sangeet musical curation in the workspace files as well.</p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-secondary text-[#FAF6EF] border border-gold-accent/40 flex items-center justify-center text-xs font-serif font-bold">V</div>
                  </div>
                </div>
              </div>

              {/* Feature 3: Digital Invitations */}
              <div className="bg-[#FAF6EF] rounded-2xl border border-gold-accent/40 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-accent/5 rounded-bl-full pointer-events-none"></div>
                <div>
                  <div className="w-11 h-11 rounded-lg bg-[#0D221A] border border-gold-accent/40 flex items-center justify-center mb-5 text-gold-accent">
                    <span className="material-symbols-outlined text-xl">mark_email_read</span>
                  </div>
                  <h3 className="font-headline-sm text-2xl text-primary mb-2">Bespoke Digital Invitations</h3>
                  <p className="text-sm text-on-surface-variant mb-6 font-light leading-relaxed">
                    Design an heirloom digital stationery suite delivered through a private link, complete with interactive schedules and dietary RSVPs.
                  </p>
                </div>
                {/* RSVP Tracker Tag Preview */}
                <div className="bg-[#F4EDE0] rounded-xl p-4 border border-gold-accent/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FAF6EF] border border-gold-accent/40 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-xl">mail</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-primary">makemymarriage.com/aanya-kabir</p>
                      <p className="text-[11px] text-outline font-light">420 Delivered · 98% VIP Opened</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0D221A] text-gold-accent border border-gold-accent/30 text-xs font-medium">
                      <span className="material-symbols-outlined text-xs">done_all</span>
                      342 Confirmed
                    </span>
                  </div>
                </div>
              </div>

              {/* Feature 4: Admin Panel & Brand Styling Suite */}
              <div className="bg-[#FAF6EF] rounded-2xl border border-gold-accent/40 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-accent/5 rounded-bl-full pointer-events-none"></div>
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-lg bg-[#0D221A] border border-gold-accent/40 flex items-center justify-center text-gold-accent">
                      <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
                    </div>
                    <span className="text-[9px] px-2.5 py-0.5 rounded-full bg-[#F0E9DC] border border-gold-accent/40 text-secondary uppercase tracking-widest font-bold">Admin Suite</span>
                  </div>
                  <h3 className="font-headline-sm text-2xl text-primary mb-2">Admin Panel &amp; Heritage Studio</h3>
                  <p className="text-sm text-on-surface-variant mb-6 font-light leading-relaxed">
                    Comprehensive controls for royal family branding, crest monograms, bespoke royal palettes, typography, and guest access privacy.
                  </p>
                </div>
                <div className="bg-[#F4EDE0] rounded-xl p-4 border border-gold-accent/30 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-gold-accent/20">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-outline">Active Palette:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-[#0D221A] ring-2 ring-gold-accent ring-offset-1"></span>
                        <span className="w-4 h-4 rounded-full bg-[#C5A059]"></span>
                        <span className="w-4 h-4 rounded-full bg-[#FAF6EF] border border-gold-accent/40"></span>
                        <span className="w-4 h-4 rounded-full bg-[#521C27]"></span>
                      </div>
                    </div>
                    <span className="text-[10px] text-secondary font-bold tracking-wider uppercase">Emerald &amp; Champagne</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-on-surface-variant">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-base">verified_user</span>
                      <span className="text-[11px] font-light">Dual Host Authority Active</span>
                    </div>
                    <a className="text-secondary font-semibold hover:text-primary inline-flex items-center gap-0.5 text-xs tracking-wider uppercase transition-colors" href="#admin-panel-section">
                      Open Admin <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: THE DIGITAL CONCIERGE WORKSPACE DEMO ── */}
        <section className="w-full py-20 bg-[#F7F2E8]" id="workspace-demo">
          <div className="w-full max-w-[1360px] mx-auto px-6 md:px-10 lg:px-14">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-8 h-px bg-gold-accent"></span>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-secondary">The Digital Concierge</span>
                <span className="w-8 h-px bg-gold-accent"></span>
              </div>
              <h2 className="font-headline-lg text-3xl md:text-4xl text-primary mt-1 mb-3">A workspace that brings serenity to scale</h2>
              <p className="text-base text-on-surface-variant font-light">Experience how effortless royal cross-family coordination feels inside your personalized salon.</p>
            </div>

            {/* Main Workspace Glass Card */}
            <div className="bg-[#FAF6EF] rounded-2xl border-2 border-gold-accent/40 shadow-[0_24px_60px_-15px_rgba(13,34,26,0.12)] overflow-hidden">
              {/* Workspace Header Bar */}
              <div className="bg-[#F0E9DC] border-b border-gold-accent/30 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full border-2 border-gold-accent/60 bg-[#0D221A] text-gold-accent flex items-center justify-center font-headline-sm text-sm tracking-wider">
                    AK
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-xl text-primary tracking-tight font-medium">Aanya &amp; Kabir's Royal Celebration</h4>
                    <p className="text-xs text-outline font-light">December 14, 2025 · The Oberoi Rajvilas, Udaipur</p>
                  </div>
                </div>
                {/* Navigation Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                  {['Overview', 'Expenses', 'Family Salon', 'Invitations', 'Settings'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveWorkspaceTab(tab)}
                      className={\`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest transition-all font-semibold \${
                        activeWorkspaceTab === tab
                          ? 'bg-[#0D221A] text-gold-accent border border-gold-accent/40 shadow-xs'
                          : 'text-on-surface-variant hover:bg-[#FAF6EF]'
                      }\`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Contents */}
              <div className="p-6 md:p-8 space-y-8 bg-[#FAF6EF]">
                {/* Summary Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="bg-[#F4EDE0] rounded-xl p-5 border border-gold-accent/30 shadow-xs">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-outline mb-1">Total Celebration Budget</p>
                    <p className="font-headline-md text-3xl text-primary font-semibold">₹8,00,000</p>
                    <p className="text-xs text-on-surface-variant mt-1.5 font-light">Joint target established by Sharma &amp; Verma families</p>
                  </div>
                  <div className="bg-[#F4EDE0] rounded-xl p-5 border border-gold-accent/30 shadow-xs">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-outline mb-1">Total Cleared Outlays</p>
                    <p className="font-headline-md text-3xl text-primary font-semibold">₹3,25,000</p>
                    <p className="text-xs text-secondary mt-1.5 font-medium">40.6% cleared across 14 master artisans</p>
                  </div>
                  <div className="bg-[#F4EDE0] rounded-xl p-5 border border-gold-accent/30 shadow-xs">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-outline mb-1">Projected Reserve</p>
                    <p className="font-headline-md text-3xl text-secondary font-semibold">₹4,75,000</p>
                    <p className="text-xs text-on-surface-variant mt-1.5 font-light">Comfortably preserved within auspicious margins</p>
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-outline mr-2">Filter Atelier:</span>
                  {['All Outlays', 'Palace & Suites', 'Royal Attire', 'Mandap & Jasmine', 'Cinematography'].map((pill) => (
                    <button
                      key={pill}
                      onClick={() => setFilterAtelier(pill)}
                      className={\`px-3 py-1 rounded-full text-xs tracking-wider uppercase transition-all \${
                        filterAtelier === pill
                          ? 'bg-[#0D221A] text-gold-accent font-medium border border-gold-accent/40 shadow-xs'
                          : 'bg-[#F0E9DC] hover:border-gold-accent text-primary border border-gold-accent/25'
                      }\`}
                    >
                      {pill}
                    </button>
                  ))}
                </div>

                {/* Two Column Main Workspace Display */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Expenses Table */}
                  <div className="lg:col-span-8 bg-[#FAF6EF] rounded-xl border border-gold-accent/40 overflow-hidden shadow-xs">
                    <div className="px-5 py-4 bg-[#F4EDE0] border-b border-gold-accent/30 flex items-center justify-between">
                      <h5 className="font-headline-sm text-lg text-primary font-medium">Recent Ledger Entries &amp; Retainers</h5>
                      <Link to="/expenses" className="text-xs font-semibold text-secondary hover:text-primary tracking-wider uppercase transition-colors">
                        View live ledger →
                      </Link>
                    </div>
                    <div className="divide-y divide-gold-accent/20 overflow-x-auto">
                      {filteredExpenses.map((exp, idx) => (
                        <div key={idx} className="p-4 flex items-center justify-between hover:bg-[#F4EFE6] transition-colors">
                          <div className="min-w-0 pr-4">
                            <p className="text-sm font-semibold text-primary">{exp.title}</p>
                            <p className="text-xs text-outline font-light">Category: {exp.cat} · {exp.payer}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-semibold text-primary">{exp.amount}</p>
                            <span className={\`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border \${exp.statusClass}\`}>
                              {exp.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Task Checklist */}
                  <div className="lg:col-span-4 bg-[#F4EDE0] rounded-xl p-5 border border-gold-accent/40">
                    <div className="flex items-center justify-between pb-3 border-b border-gold-accent/30 mb-4">
                      <h5 className="font-headline-sm text-lg text-primary font-medium">Sacred Milestones</h5>
                      <span className="text-[10px] text-secondary font-bold uppercase tracking-widest">
                        {milestones.filter(m => !m.done).length} Awaiting Action
                      </span>
                    </div>
                    <div className="space-y-3">
                      {milestones.map((m) => (
                        <div
                          key={m.id}
                          onClick={() => toggleMilestone(m.id)}
                          className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF6EF] border border-gold-accent/30 cursor-pointer hover:border-gold-accent transition-all"
                        >
                          <div className={\`w-4 h-4 mt-0.5 rounded border border-gold-accent flex items-center justify-center shrink-0 \${m.done ? 'bg-primary text-gold-accent' : ''}\`}>
                            {m.done && <span className="material-symbols-outlined text-[13px]">check</span>}
                          </div>
                          <div>
                            <p className={\`text-xs font-semibold text-primary \${m.done ? 'line-through text-outline' : ''}\`}>
                              {m.title}
                            </p>
                            <p className={\`text-[10px] uppercase tracking-wider font-medium mt-0.5 \${m.urgent ? 'text-error' : 'text-secondary'}\`}>
                              {m.due}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/dashboard"
                      className="block text-center w-full mt-4 py-2.5 bg-[#FAF6EF] hover:bg-[#E7DFCE] border border-gold-accent/40 text-primary text-xs uppercase tracking-widest font-semibold rounded-lg transition-colors"
                    >
                      + Add Ceremony Milestone
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: ROYAL ADMINISTRATION SUITE & BRAND STUDIO ── */}
        <section className="w-full py-20 bg-[#F4EFE6] border-t border-b border-gold-accent/30 relative" id="admin-panel-section">
          <div className="w-full max-w-[1360px] mx-auto px-6 md:px-10 lg:px-14">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6EF] border border-gold-accent/50 mb-3 shadow-xs">
                <span className="material-symbols-outlined text-secondary text-base">shield_with_heart</span>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-secondary">Royal Administration Suite</span>
              </div>
              <h2 className="font-headline-lg text-3xl md:text-4xl text-primary mb-3">Wedding Settings &amp; Brand Studio</h2>
              <p className="text-base text-on-surface-variant font-light">Curate bride &amp; groom family branding, heraldic crest monograms, royal foil palettes, and invitation privacy with bespoke fidelity.</p>
            </div>

            <div className="bg-[#FAF6EF] rounded-2xl border-2 border-gold-accent/40 shadow-[0_24px_60px_-15px_rgba(13,34,26,0.15)] overflow-hidden">
              {/* Header Bar */}
              <div className="bg-[#F0E9DC] border-b border-gold-accent/30 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0D221A] text-gold-accent border border-gold-accent/50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">settings_suggest</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-headline-sm text-lg text-primary font-semibold">Imperial Atelier Controls</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0D221A] text-gold-accent text-[9px] uppercase tracking-widest font-bold border border-gold-accent/30">Live Studio</span>
                    </div>
                    <p className="text-xs text-outline font-light">Sharma &amp; Verma Union · Udaipur Celebration 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={handleReset} className="px-4 py-2 rounded-full border border-gold-accent/40 bg-[#FAF6EF] hover:bg-[#E7DFCE] text-primary text-xs uppercase tracking-widest font-semibold transition-colors">
                    Reset Defaults
                  </button>
                  <button onClick={handleSave} className="px-5 py-2 rounded-full bg-[#0D221A] hover:bg-[#16382C] text-gold-accent border border-gold-accent/50 text-xs uppercase tracking-widest font-semibold shadow-sm transition-all inline-flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Settings Controls */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Color Palette Selector */}
                  <div className="bg-[#F4EDE0] rounded-xl border border-gold-accent/40 p-5 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-lg">palette</span>
                        <h4 className="font-headline-sm text-base text-primary font-semibold">Couture Color Palette</h4>
                      </div>
                      <span className="text-[10px] text-secondary font-bold uppercase tracking-widest">{currentPalette.name}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        onClick={() => setActivePalette('emerald')}
                        className={\`p-3 rounded-xl text-left transition-all shadow-xs \${
                          activePalette === 'emerald'
                            ? 'border-2 border-primary bg-[#FAF6EF]'
                            : 'border border-gold-accent/40 bg-[#FAF6EF] hover:border-gold-accent'
                        }\`}
                        type="button"
                      >
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="w-4 h-4 rounded-full bg-[#0D221A]"></span>
                          <span className="w-4 h-4 rounded-full bg-[#C5A059]"></span>
                          <span className="w-4 h-4 rounded-full bg-[#FAF6EF] border border-gold-accent/40"></span>
                        </div>
                        <p className="text-xs font-semibold text-primary">Emerald &amp; Gold</p>
                        <p className="text-[10px] text-outline font-light">Imperial Sovereign</p>
                      </button>

                      <button
                        onClick={() => setActivePalette('ivory')}
                        className={\`p-3 rounded-xl text-left transition-all shadow-xs \${
                          activePalette === 'ivory'
                            ? 'border-2 border-primary bg-[#FAF6EF]'
                            : 'border border-gold-accent/40 bg-[#FAF6EF] hover:border-gold-accent'
                        }\`}
                        type="button"
                      >
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="w-4 h-4 rounded-full bg-[#FAF6EF] border border-gold-accent/40"></span>
                          <span className="w-4 h-4 rounded-full bg-[#C5A059]"></span>
                          <span className="w-4 h-4 rounded-full bg-[#745A27]"></span>
                        </div>
                        <p className="text-xs font-semibold text-primary">Heritage Ivory</p>
                        <p className="text-[10px] text-outline font-light">Cotton Rag &amp; Gold</p>
                      </button>

                      <button
                        onClick={() => setActivePalette('ruby')}
                        className={\`p-3 rounded-xl text-left transition-all shadow-xs \${
                          activePalette === 'ruby'
                            ? 'border-2 border-primary bg-[#FAF6EF]'
                            : 'border border-gold-accent/40 bg-[#FAF6EF] hover:border-gold-accent'
                        }\`}
                        type="button"
                      >
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="w-4 h-4 rounded-full bg-[#4A1521]"></span>
                          <span className="w-4 h-4 rounded-full bg-[#E4C284]"></span>
                          <span className="w-4 h-4 rounded-full bg-[#FAF6EF] border border-gold-accent/40"></span>
                        </div>
                        <p className="text-xs font-semibold text-primary">Royal Ruby</p>
                        <p className="text-[10px] text-outline font-light">Velvet Twilight</p>
                      </button>
                    </div>
                  </div>

                  {/* Crest & Monogram Customizer */}
                  <div className="bg-[#F4EDE0] rounded-xl border border-gold-accent/40 p-5 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-lg">token</span>
                        <h4 className="font-headline-sm text-base text-primary font-semibold">Heraldic Monogram Crest</h4>
                      </div>
                      <span className="text-[10px] text-outline uppercase font-bold tracking-widest">Vector Emboss</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg bg-[#FAF6EF] border border-dashed border-gold-accent/50">
                      <div className="w-16 h-16 rounded-full border-2 border-gold-accent bg-[#0D221A] text-gold-accent flex items-center justify-center font-headline-sm text-base shadow-sm shrink-0">
                        {crestInitials}
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-xs font-semibold text-primary mb-1">Joint Royal Union Crest</p>
                        <p className="text-xs text-on-surface-variant mb-2 font-light">Select insignia style or imprint bespoke monogram across invitation wax seals.</p>
                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                          {[
                            { label: 'A&K Classic', val: 'A&K' },
                            { label: 'S ❦ V Families', val: 'S ❦ V' },
                            { label: 'Eternal Knot', val: '∞' },
                          ].map(item => (
                            <button
                              key={item.val}
                              onClick={() => setCrestInitials(item.val)}
                              className={\`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase border transition-all \${
                                crestInitials === item.val
                                  ? 'bg-[#0D221A] text-gold-accent border-gold-accent/50'
                                  : 'bg-[#FAF6EF] hover:bg-[#E7DFCE] border-gold-accent/40 text-primary'
                              }\`}
                              type="button"
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Privacy & Host Controls */}
                  <div className="bg-[#F4EDE0] rounded-xl border border-gold-accent/40 p-5 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-lg">lock_person</span>
                        <h4 className="font-headline-sm text-base text-primary font-semibold">Co-Hosting &amp; Privacy Protocols</h4>
                      </div>
                      <span className="text-[10px] text-secondary font-bold uppercase tracking-widest">Dual Admin</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-[#FAF6EF] border border-gold-accent/25">
                        <div className="pr-4">
                          <p className="text-xs font-semibold text-primary">Sharma &amp; Verma Mutual Approval</p>
                          <p className="text-[11px] text-on-surface-variant font-light">Expenditures above ₹50,000 require concurrent sign-off from both family patriarchs.</p>
                        </div>
                        <button
                          onClick={() => setApprovalChecked(!approvalChecked)}
                          className={\`w-11 h-6 rounded-full transition-colors relative p-0.5 border border-gold-accent/30 \${
                            approvalChecked ? 'bg-[#0D221A]' : 'bg-[#C5A059]/30'
                          }\`}
                        >
                          <div className={\`w-5 h-5 rounded-full bg-white transition-transform \${approvalChecked ? 'translate-x-5' : 'translate-x-0'}\`}></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-[#FAF6EF] border border-gold-accent/25">
                        <div className="pr-4">
                          <p className="text-xs font-semibold text-primary">VIP Passcode Protection for Venues</p>
                          <p className="text-[11px] text-on-surface-variant font-light">Restricted access requiring guest mobile pin prior to unveiling palace map coordinates.</p>
                        </div>
                        <button
                          onClick={() => setPasscodeChecked(!passcodeChecked)}
                          className={\`w-11 h-6 rounded-full transition-colors relative p-0.5 border border-gold-accent/30 \${
                            passcodeChecked ? 'bg-[#0D221A]' : 'bg-[#C5A059]/30'
                          }\`}
                        >
                          <div className={\`w-5 h-5 rounded-full bg-white transition-transform \${passcodeChecked ? 'translate-x-5' : 'translate-x-0'}\`}></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Live Stationery Preview Card */}
                <div className="lg:col-span-5 flex flex-col">
                  <div className="bg-[#F0E9DC] rounded-xl border border-gold-accent/40 p-5 flex-1 flex flex-col justify-between shadow-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-gold-accent/30 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-base">preview</span>
                        <h4 className="font-headline-sm text-base text-primary font-semibold">Live Stationery Preview</h4>
                      </div>
                      <span className="text-[9px] text-primary font-bold uppercase tracking-[0.2em]">Synchronized</span>
                    </div>

                    <div className={\`w-full aspect-[3/4] max-w-[320px] mx-auto rounded-xl p-6 flex flex-col items-center justify-between relative transition-all duration-300 \${currentPalette.cardClass}\`}>
                      {/* Fine gold inner filigree frame */}
                      <div className="absolute inset-2.5 border border-gold-accent/50 pointer-events-none rounded"></div>
                      <div className="absolute inset-3 border border-gold-accent/20 pointer-events-none rounded"></div>
                      <div className="pt-2 text-center">
                        <span className="text-[9px] uppercase tracking-[0.25em] font-medium opacity-90">
                          {currentPalette.badgeText}
                        </span>
                        <h4 className={\`font-headline-md text-2xl mt-1 tracking-normal font-normal \${currentPalette.textAccent}\`}>
                          Kabir &amp; Aanya
                        </h4>
                      </div>
                      <div className="my-auto py-2 text-center">
                        <div className={\`w-12 h-12 rounded-full border mx-auto flex items-center justify-center font-headline-sm text-sm mb-2.5 shadow-sm \${currentPalette.crestClass}\`}>
                          {crestInitials}
                        </div>
                        <p className={currentPalette.quoteClass}>{currentPalette.quoteText}</p>
                        <p className={\`text-[10px] mt-1.5 tracking-[0.25em] font-semibold uppercase \${currentPalette.venueClass}\`}>
                          {currentPalette.venueText}
                        </p>
                      </div>
                      <div className="w-full pt-3 border-t border-gold-accent/30 text-center">
                        <span className={\`text-[9px] uppercase tracking-[0.2em] font-medium \${currentPalette.footerClass}\`}>
                          Private RSVP Code · Dec 14, 2025
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gold-accent/30 flex items-center justify-between text-xs text-on-surface-variant">
                      <span className="font-light">Changes immediately reflect in guest invitations</span>
                      <span className="font-semibold text-secondary flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>Concierge Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 6: THE ROYAL ATELIER JOURNEY (3 STEPS) ── */}
        <section className="w-full py-20 bg-[#F7F2E8]" id="how-it-works">
          <div className="w-full max-w-[1360px] mx-auto px-6 md:px-10 lg:px-14">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-8 h-px bg-gold-accent"></span>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-secondary">The Royal Atelier Journey</span>
                <span className="w-8 h-px bg-gold-accent"></span>
              </div>
              <h2 className="font-headline-lg text-3xl md:text-4xl text-primary mt-1 mb-3">Three serene steps to bring both families in unison</h2>
              <p className="text-base text-on-surface-variant font-light">Thoughtfully crafted for couples and revered multi-generational households.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="bg-[#FAF6EF] rounded-2xl border border-gold-accent/40 p-8 shadow-sm flex flex-col justify-between relative group hover:border-gold-accent transition-colors">
                <div className="absolute top-4 right-6 text-4xl font-serif text-gold-accent/25 font-light">01</div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary">Initiation</span>
                  <h3 className="font-headline-sm text-xl text-primary mt-1 mb-3">Create your celebration salon</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed font-light">
                    Enter auspicious ceremony dates, approximate royal guest counts, and joint budget targets in minutes. The system drafts your multi-day ritual template automatically.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-gold-accent/25 flex items-center text-secondary text-xs uppercase tracking-wider font-semibold">
                  <span>Setup takes under 2 minutes</span>
                  <span className="material-symbols-outlined ml-1.5 text-sm">schedule</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-[#FAF6EF] rounded-2xl border border-gold-accent/40 p-8 shadow-sm flex flex-col justify-between relative group hover:border-gold-accent transition-colors">
                <div className="absolute top-4 right-6 text-4xl font-serif text-gold-accent/25 font-light">02</div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary">Kinship</span>
                  <h3 className="font-headline-sm text-xl text-primary mt-1 mb-3">Welcome key elders &amp; planners</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed font-light">
                    Invite parents, siblings, and key family confidants with bespoke permission tiers, ensuring complete dignity and comfort across both households.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-gold-accent/25 flex items-center text-secondary text-xs uppercase tracking-wider font-semibold">
                  <span>Granular privacy &amp; permissions</span>
                  <span className="material-symbols-outlined ml-1.5 text-sm">verified_user</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-[#FAF6EF] rounded-2xl border border-gold-accent/40 p-8 shadow-sm flex flex-col justify-between relative group hover:border-gold-accent transition-colors">
                <div className="absolute top-4 right-6 text-4xl font-serif text-gold-accent/25 font-light">03</div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary">Celebration</span>
                  <h3 className="font-headline-sm text-xl text-primary mt-1 mb-3">Curate outlays &amp; gilded invitations</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed font-light">
                    Record master artisan invoices, deliberate without scattered chat groups, and broadcast bespoke digital invitations with effortless RSVP management.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-gold-accent/25 flex items-center text-secondary text-xs uppercase tracking-wider font-semibold">
                  <span>Instant RSVP concierge tracking</span>
                  <span className="material-symbols-outlined ml-1.5 text-sm">mark_email_read</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 7: HEIRLOOM DIGITAL STATIONERY ── */}
        <section className="w-full py-20 bg-[#F4EFE6] border-t border-b border-gold-accent/30" id="stationery-preview">
          <div className="w-full max-w-[1360px] mx-auto px-6 md:px-10 lg:px-14">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-8 h-px bg-gold-accent"></span>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-secondary">Heirloom Digital Stationery</span>
                <span className="w-8 h-px bg-gold-accent"></span>
              </div>
              <h2 className="font-headline-lg text-3xl md:text-4xl text-primary mt-1 mb-3">An invitation with the weight of tradition</h2>
              <p className="text-base text-on-surface-variant font-light">Rendered with the tactile warmth, deckled paper texture, and foil-pressed nobility of imperial stationery.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Invitation Card 1: Classic Ivory & Champagne Gold */}
              <div className="group relative rounded-2xl p-7 bg-[#FAF6EF] border-2 border-gold-accent/40 shadow-[0_12px_36px_rgba(116,90,39,0.08)] flex flex-col items-center text-center hover:-translate-y-1.5 transition-all">
                <div className="w-full aspect-[3/4] rounded-xl p-6 bg-[#FDFBF7] border border-gold-accent/50 flex flex-col items-center justify-between relative shadow-inner">
                  <div className="absolute inset-2 border border-gold-accent/40 pointer-events-none rounded"></div>
                  <div className="absolute inset-3 border border-gold-accent/20 pointer-events-none rounded"></div>
                  <div className="pt-2">
                    <span className="text-[9px] text-secondary uppercase tracking-[0.25em] font-semibold">The Royal Union of</span>
                    <h4 className="font-headline-md text-2xl text-primary mt-1 font-normal">Aanya &amp; Kabir</h4>
                  </div>
                  <div className="my-auto py-2">
                    <span className="material-symbols-outlined text-secondary text-2xl mb-1">spa</span>
                    <p className="text-xs text-on-surface-variant italic font-cormorant text-base">Request the blessing of your gracious presence</p>
                    <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-primary mt-1.5">UDAIPUR · RAJASTHAN</p>
                  </div>
                  <div className="w-full pt-3 border-t border-gold-accent/30">
                    <span className="text-[10px] text-secondary uppercase tracking-widest font-semibold">December 14 · 2025</span>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <h4 className="font-headline-sm text-lg text-primary font-semibold">Royal Heritage Ivory</h4>
                  <p className="text-xs text-on-surface-variant mt-1 font-light">Gold-pressed botanicals on textured cotton rag paper.</p>
                </div>
              </div>

              {/* Invitation Card 2: Deep Emerald Velvet */}
              <div className="group relative rounded-2xl p-7 bg-[#0D221A] text-[#FAF6EF] border-2 border-gold-accent shadow-[0_16px_45px_rgba(13,34,26,0.35)] flex flex-col items-center text-center hover:-translate-y-1.5 transition-all">
                <div className="w-full aspect-[3/4] rounded-xl p-6 bg-[#142F24] border border-gold-accent/60 flex flex-col items-center justify-between relative shadow-inner">
                  <div className="absolute inset-2 border border-gold-accent/50 pointer-events-none rounded"></div>
                  <div className="absolute inset-3 border border-gold-accent/25 pointer-events-none rounded"></div>
                  <div className="pt-2">
                    <span className="text-[9px] text-gold-accent uppercase tracking-[0.25em] font-medium">Sacred Pheras &amp; Reception</span>
                    <h4 className="font-headline-md text-2xl text-gold-accent mt-1 font-normal">Kabir &amp; Aanya</h4>
                  </div>
                  <div className="my-auto py-2">
                    <div className="w-9 h-9 rounded-full border border-gold-accent mx-auto flex items-center justify-center mb-1.5">
                      <span className="material-symbols-outlined text-gold-accent text-sm">star</span>
                    </div>
                    <p className="text-xs text-gold-light italic font-cormorant text-base font-light">Two souls woven into eternal joy</p>
                    <p className="text-[10px] text-[#FAF6EF] mt-1.5 tracking-[0.25em] uppercase font-semibold">THE OBEROI RAJVILAS</p>
                  </div>
                  <div className="w-full pt-3 border-t border-gold-accent/30">
                    <span className="text-[9px] text-gold-accent uppercase tracking-[0.2em] font-medium">Concierge RSVP &amp; Itinerary</span>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <h4 className="font-headline-sm text-lg text-gold-accent font-semibold">Imperial Emerald Velvet</h4>
                  <p className="text-xs text-gold-light/80 mt-1 font-light">Deep royal jewel tones adorned with brushed gilt borders.</p>
                </div>
              </div>

              {/* Invitation Card 3: Royal Ruby & Rose Gilt */}
              <div className="group relative rounded-2xl p-7 bg-[#4A1521] text-[#FAF6EF] border-2 border-gold-accent/50 shadow-[0_12px_36px_rgba(74,21,33,0.18)] flex flex-col items-center text-center hover:-translate-y-1.5 transition-all">
                <div className="w-full aspect-[3/4] rounded-xl p-6 bg-[#5A1C2A] border border-gold-accent/50 flex flex-col items-center justify-between relative shadow-inner">
                  <div className="absolute inset-2 border border-gold-accent/40 pointer-events-none rounded"></div>
                  <div className="absolute inset-3 border border-gold-accent/20 pointer-events-none rounded"></div>
                  <div className="pt-2">
                    <span className="text-[9px] text-[#E9DAC0] uppercase tracking-[0.25em] font-medium">Grand Sangeet &amp; Mehendi</span>
                    <h4 className="font-headline-md text-2xl text-[#FAF6EF] mt-1 font-normal">Aanya &amp; Kabir</h4>
                  </div>
                  <div className="my-auto py-2">
                    <span className="material-symbols-outlined text-gold-accent text-2xl mb-1">local_florist</span>
                    <p className="text-xs text-gold-light italic font-cormorant text-base font-light">An evening of heritage song and golden light</p>
                    <p className="text-[10px] text-[#FAF6EF] mt-1.5 tracking-[0.25em] uppercase font-semibold">RAMBAGH PALACE</p>
                  </div>
                  <div className="w-full pt-3 border-t border-gold-accent/30">
                    <span className="text-[9px] text-gold-accent uppercase tracking-[0.2em] font-medium">Musical Program Included</span>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <h4 className="font-headline-sm text-lg text-[#FAF6EF] font-semibold">Couture Royal Ruby</h4>
                  <p className="text-xs text-gold-light/80 mt-1 font-light">Rich regal carmine with ornate gold calligraphy.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/invitation"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-[#16382C] text-[#F7F2E8] border border-gold-accent/50 text-xs uppercase tracking-[0.2em] font-semibold shadow-md transition-all"
              >
                <span>Customize Digital Invitation Suite</span>
                <span className="material-symbols-outlined text-sm text-gold-accent">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── SECTION 8: GRAND CTA BANNER ── */}
        <section className="w-full py-24 bg-[#081611] text-[#FAF6EF] relative overflow-hidden border-t-2 border-[#C5A059]">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(197,160,89,0.3) 40px, rgba(197,160,89,0.3) 41px)' }}></div>
          <div className="w-full max-w-[1360px] mx-auto px-6 md:px-10 lg:px-14 text-center relative z-10">
            <div className="flex items-center justify-center gap-3.5 mb-6">
              <span className="w-16 h-px bg-gold-accent"></span>
              <span className="material-symbols-outlined text-gold-accent text-xl">favorite</span>
              <span className="w-16 h-px bg-gold-accent"></span>
            </div>
            <h2 className="font-headline-xl text-4xl md:text-5xl text-[#FAF6EF] tracking-tight max-w-3xl mx-auto mb-6 leading-tight">
              Make room for the rituals and moments that truly matter.
            </h2>
            <p className="text-lg text-gold-light max-w-xl mx-auto mb-10 leading-relaxed font-light">
              Preserve complete budget clarity, intimate harmony between families, and immortalize your wedding story in timeless luxury.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#DFCA9E] via-[#C5A059] to-[#B89248] hover:opacity-95 text-[#0D221A] text-xs uppercase tracking-[0.2em] font-bold px-10 py-4 rounded-full shadow-[0_8px_30px_rgba(197,160,89,0.35)] transition-all"
              >
                <span>Start planning complimentary</span>
                <span className="material-symbols-outlined ml-2 text-base">arrow_forward</span>
              </Link>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold-light/70 font-medium">
              Complimentary wedding salon · No credit card required · Unlimited family invitations
            </p>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="w-full bg-[#081611] border-t border-[#C5A059]/40 pt-16 pb-12 text-[#FAF6EF]">
        <div className="w-full max-w-[1360px] mx-auto px-6 md:px-10 lg:px-14">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 pb-12 border-b border-gold-accent/25">
            <div className="max-w-md">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="p-1 rounded-full border border-gold-accent/40 bg-[#FAF6EF]">
                  <img
                    alt="Make My Marriage Brandmark"
                    className="h-7 w-7 object-contain"
                    src="/wedding-rings.svg"
                  />
                </div>
                <span className="font-headline-sm text-xl text-[#FAF6EF] font-medium tracking-normal">Make My Marriage</span>
                <span className="text-gold-accent text-[10px] uppercase font-bold tracking-[0.2em]">Couture</span>
              </div>
              <p className="text-sm text-gold-light/80 leading-relaxed font-light">
                Bringing wedding expenses, family chambers, and heirloom invitations together in one serene haven.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 items-center">
              <a className="text-xs uppercase tracking-[0.2em] font-medium text-gold-light/80 hover:text-gold-accent transition-colors" href="#features-overview">
                Features
              </a>
              <a className="text-xs uppercase tracking-[0.2em] font-medium text-gold-light/80 hover:text-gold-accent transition-colors" href="#how-it-works">
                How It Works
              </a>
              <a className="text-xs uppercase tracking-[0.2em] font-medium text-gold-light/80 hover:text-gold-accent transition-colors" href="#stationery-preview">
                Invitations
              </a>
              <Link className="text-xs uppercase tracking-[0.2em] font-medium text-gold-light/80 hover:text-gold-accent transition-colors" to="/login">
                Log in
              </Link>
              <Link className="text-xs uppercase tracking-[0.2em] font-medium text-gold-light/80 hover:text-gold-accent transition-colors" to="/dashboard">
                Dashboard
              </Link>
              <a
                className="text-xs uppercase tracking-[0.2em] font-bold text-gold-accent hover:text-[#FAF6EF] transition-colors inline-flex items-center gap-1 border border-gold-accent/40 px-3 py-1 rounded-full bg-[#0D221A]"
                href="#admin-panel-section"
              >
                <span className="material-symbols-outlined text-xs">tune</span>
                Admin Suite
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gold-light/60 font-light">© 2026 Make My Marriage Couture. All rights reserved.</p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold-accent font-semibold">Heirloom Hospitality · Crafted for Celebrations</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
`;

fs.writeFileSync('src/pages/landing/LandingPage.jsx', code, 'utf8');
console.log('Successfully wrote src/pages/landing/LandingPage.jsx!');
