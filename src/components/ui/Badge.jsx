import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-surface-muted text-gray-300 border-surface-border',
    gold: 'bg-primary-500/15 text-primary-300 border-primary-500/30',
    paid: 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40',
    pending: 'bg-amber-950/40 text-amber-300 border-amber-800/40',
    groom: 'bg-blue-950/40 text-blue-300 border-blue-800/40',
    bride: 'bg-rose-950/40 text-rose-300 border-rose-800/40',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border tracking-wide',
        variants[variant] || variants.default,
        className
      )}
    >
      {children}
    </span>
  );
}
