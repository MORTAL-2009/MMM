import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { ROLES } from '../../lib/permissions';
import { Palette, Bell, Shield, Heart, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';

export function Navbar({ onMenuToggle }) {
  const { theme, setTheme, themes } = useTheme();
  const { user, role, setRole, familySide, activeWedding, isSupabaseConfigured } = useAuth();
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showRolePicker, setShowRolePicker] = useState(false);

  return (
    <header className="h-16 border-b border-surface-border bg-surface-card/80 backdrop-blur-md sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between">
      {/* Mobile Toggle & Wedding Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface-muted"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary-400 fill-primary-400/20" />
          <div>
            <h2 className="font-serif text-sm md:text-base font-semibold text-gray-100 tracking-wide truncate max-w-[200px] md:max-w-xs">
              {activeWedding?.name || 'Make My Marriage'}
            </h2>
            <p className="text-[10px] text-gray-400 hidden sm:block">
              {activeWedding?.brideName} & {activeWedding?.groomName} • {activeWedding?.weddingDate}
            </p>
          </div>
        </div>
      </div>

        {/* Action Controls & Profile */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Stitch Atelier Showcase Link */}
        <Link
          to="/"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#C5A059]/40 text-xs bg-[#0D221A] hover:bg-[#16382C] text-[#C5A059] font-semibold shadow-xs transition-colors"
          title="Return to Stitch Landing Showcase"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Stitch Atelier</span>
        </Link>

        {/* Supabase status indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border border-surface-border bg-surface-muted/40">
          {isSupabaseConfigured ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300">Supabase Connected</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-3.5 h-3.5 text-primary-400" />
              <span className="text-gray-300">Sandbox Mode</span>
            </>
          )}
        </div>

        {/* Role Switcher Pill (Interactive Boilerplate Testing) */}
        <div className="relative">
          <button
            onClick={() => setShowRolePicker(!showRolePicker)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-surface-border text-xs bg-surface-muted hover:border-primary-500/40 text-gray-200 transition-colors"
            title="Click to preview different role permissions"
          >
            <Shield className="w-3.5 h-3.5 text-primary-400" />
            <span className="capitalize font-semibold text-primary-300">{role}</span>
          </button>

          {showRolePicker && (
            <div className="absolute right-0 mt-2 w-48 bg-surface-card border border-surface-border rounded-xl shadow-luxury p-2 z-50">
              <p className="text-[10px] uppercase font-bold text-gray-400 px-2 py-1 tracking-wider">Preview Role</p>
              {Object.values(ROLES).filter(r => r !== 'guest').map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    setShowRolePicker(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs capitalize transition-colors flex items-center justify-between ${
                    role === r ? 'bg-primary-500/20 text-primary-300 font-semibold' : 'text-gray-300 hover:bg-surface-muted'
                  }`}
                >
                  <span>{r}</span>
                  {role === r && <span className="text-primary-400">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Selector Modal Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowThemePicker(!showThemePicker)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-surface-border text-xs bg-surface-muted hover:border-primary-500/40 text-gray-200 transition-colors"
            title="Select luxury theme"
          >
            <Palette className="w-3.5 h-3.5 text-primary-400" />
            <span className="hidden sm:inline font-medium capitalize">
              {themes.find((t) => t.id === theme)?.name || 'Theme'}
            </span>
          </button>

          {showThemePicker && (
            <div className="absolute right-0 mt-2 w-56 bg-surface-card border border-surface-border rounded-xl shadow-luxury p-2 z-50">
              <p className="text-[10px] uppercase font-bold text-gray-400 px-2 py-1 tracking-wider">Luxury Themes</p>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setShowThemePicker(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors flex items-center gap-2.5 ${
                    theme === t.id ? 'bg-primary-500/15 border border-primary-500/40 text-primary-200 font-medium' : 'text-gray-300 hover:bg-surface-muted'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                    style={{ backgroundColor: t.primaryColor }}
                  />
                  <div>
                    <div className="font-medium text-gray-100">{t.name}</div>
                    <div className="text-[10px] text-gray-400">{t.description}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-surface-border">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-600 to-primary-400 text-black flex items-center justify-center font-serif font-bold text-xs shadow-sm">
            {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-medium text-gray-200 leading-tight">{user?.displayName}</p>
            <Badge variant={familySide === 'bride' ? 'bride' : 'groom'} className="text-[9px] py-0 px-1.5 mt-0.5">
              {familySide === 'bride' ? "Bride's Side" : "Groom's Side"}
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
}
