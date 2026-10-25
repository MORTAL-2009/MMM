import React from 'react';
import { cn } from '../../lib/utils';

export function Button({
  children,
  className,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0B0C10] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

  const variants = {
    primary:
      'bg-gradient-to-r from-primary-400 to-primary-600 text-black font-semibold hover:from-primary-300 hover:to-primary-500 shadow-luxury focus:ring-primary-400',
    secondary:
      'bg-surface-muted text-gray-100 hover:bg-surface-border border border-surface-border focus:ring-gray-400',
    outline:
      'border border-primary-500 text-primary-400 hover:bg-primary-500/10 focus:ring-primary-500',
    ghost:
      'text-gray-300 hover:text-white hover:bg-surface-muted/60 focus:ring-gray-500',
    danger:
      'bg-red-950/40 text-red-300 border border-red-800/60 hover:bg-red-900/60 focus:ring-red-500',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
