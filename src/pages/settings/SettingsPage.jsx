import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Palette, Shield, Heart, User, Sparkles } from 'lucide-react';

export function SettingsPage() {
  const { user, familySide, setFamilySide, activeWedding, setActiveWedding, isSupabaseConfigured } = useAuth();
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-100">Settings & Customization</h1>
        <p className="text-xs md:text-sm text-gray-400 mt-1">
          Personalize luxury themes, family affiliation, and wedding workspace properties.
        </p>
      </div>

      {/* Luxury Theme Selector (PRD Section 13.2) */}
      <Card className="space-y-4">
        <CardHeader
          title="Luxury Visual Theme"
          subtitle="Choose from the 4 curated royal color schemes"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {themes.map((t) => (
            <div
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                theme === t.id
                  ? 'border-primary-500 bg-primary-500/10 shadow-luxury'
                  : 'border-surface-border bg-surface-muted/40 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                  style={{ backgroundColor: t.primaryColor }}
                />
                <div>
                  <h4 className="font-semibold text-xs text-gray-100">{t.name}</h4>
                  <p className="text-[11px] text-gray-400">{t.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Profile & Family Affiliation */}
      <Card className="space-y-4 text-xs">
        <CardHeader
          title="Member Profile & Affiliation"
          subtitle="Your personal identification within the wedding workspace"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 mb-1">Display Name</label>
            <input
              type="text"
              disabled
              value={user?.displayName || ''}
              className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-300 opacity-80"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Affiliated Family Side</label>
            <select
              value={familySide}
              onChange={(e) => setFamilySide(e.target.value)}
              className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
            >
              <option value="groom">Groom's Side</option>
              <option value="bride">Bride's Side</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Supabase Connectivity Status */}
      <Card className="space-y-2 text-xs">
        <CardHeader
          title="Database & Auth Provider"
          subtitle="Supabase PostgreSQL and Realtime configuration"
        />
        <div className="p-3 rounded-xl bg-surface-muted/40 border border-surface-border flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-200">
              {isSupabaseConfigured ? 'Connected to Supabase Cloud' : 'Running in Local Sandbox Mode'}
            </div>
            <div className="text-[11px] text-gray-400 mt-0.5">
              {isSupabaseConfigured
                ? 'Row Level Security (RLS) and real-time sockets active.'
                : 'Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env to connect real database.'}
            </div>
          </div>
          <Badge variant={isSupabaseConfigured ? 'paid' : 'pending'}>
            {isSupabaseConfigured ? 'Connected' : 'Sandbox'}
          </Badge>
        </div>
      </Card>
    </div>
  );
}
