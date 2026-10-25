import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { isAdminOrOwner } from '../../lib/permissions';
import {
  LayoutDashboard,
  Receipt,
  MessageCircle,
  Mail,
  BarChart3,
  Settings,
  ShieldAlert,
  Sparkles,
  X,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function Sidebar({ isOpen, onClose }) {
  const { role } = useAuth();
  const showAdmin = isAdminOrOwner(role);

  const navItems = [
    { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { name: 'Expenses', to: '/expenses', icon: Receipt },
    { name: 'Family Chat', to: '/chat', icon: MessageCircle },
    { name: 'Digital Invitation', to: '/invitation', icon: Mail },
    { name: 'Reports', to: '/reports', icon: BarChart3 },
    { name: 'Settings', to: '/settings', icon: Settings },
  ];

  if (showAdmin) {
    navItems.push({ name: 'Admin Panel', to: '/admin', icon: ShieldAlert, badge: 'Admin' });
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed md:static inset-y-0 left-0 z-50 w-64 bg-surface-base border-r border-surface-border flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* App Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-surface-border">
          <NavLink to="/" className="flex items-center gap-2.5 group" title="Return to Stitch Landing Showcase">
            <div className="w-8 h-8 rounded-full border border-[#C5A059]/40 bg-[#FAF6EF] p-1 flex items-center justify-center shadow-xs">
              <img src="/wedding-rings.svg" alt="Brandmark" className="w-5 h-5 object-contain" />
            </div>
            <div>
              <span className="font-serif text-base font-bold tracking-wider gold-gradient-text">
                MAKE MY
              </span>
              <span className="block text-[10px] tracking-[0.25em] text-[#C5A059] font-sans font-semibold -mt-1 uppercase">
                MARRIAGE
              </span>
            </div>
          </NavLink>

          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-surface-muted"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
            Wedding Management
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => onClose?.()}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary-500/15 text-primary-300 border border-primary-500/30 shadow-sm'
                      : 'text-gray-400 hover:text-gray-100 hover:bg-surface-muted'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={cn(
                          'w-4 h-4 transition-colors',
                          isActive ? 'text-primary-400' : 'text-gray-400 group-hover:text-gray-200'
                        )}
                      />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-primary-500/20 text-primary-300 border border-primary-500/30">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-surface-border/60 bg-surface-card/40">
          <div className="p-3 rounded-lg bg-surface-muted/50 border border-surface-border text-xs">
            <p className="text-gray-300 font-medium">Gold Noir Edition</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Role-Based Luxury Platform</p>
          </div>
        </div>
      </aside>
    </>
  );
}
