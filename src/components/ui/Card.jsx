import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ children, className, glow = false, ...props }) {
  return (
    <div
      className={cn(
        'bg-surface-card border border-surface-border rounded-xl p-5 transition-all duration-200',
        glow && 'hover:border-primary-500/50 hover:shadow-luxury',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, title, subtitle, action }) {
  return (
    <div className={cn('flex items-center justify-between pb-4 border-b border-surface-border/60 mb-4', className)}>
      <div>
        {title && <h3 className="font-serif text-lg font-semibold tracking-wide text-gray-100">{title}</h3>}
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        {children}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
