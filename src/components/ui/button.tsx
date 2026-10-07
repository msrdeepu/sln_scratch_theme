import * as React from 'react';
import { cn } from '../../lib/utils';

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'icon';

const variants: Record<ButtonVariant, string> = {
  default:
    'inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-800 disabled:pointer-events-none disabled:opacity-50',
  outline:
    'inline-flex items-center justify-center rounded-xl border border-slate-700 bg-transparent px-4 py-2 text-sm font-semibold text-slate-200 transition-all hover:bg-white/10 disabled:pointer-events-none disabled:opacity-50',
  ghost:
    'inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all hover:bg-white/10 disabled:pointer-events-none disabled:opacity-50',
  link:
    'inline-flex items-center justify-center rounded-xl text-sm font-semibold text-amber-400 underline-offset-4 hover:underline disabled:pointer-events-none disabled:opacity-50',
};

const sizes: Record<ButtonSize, string> = {
  default: 'h-10 px-4 py-2',
  sm: 'h-8 px-3 text-xs',
  icon: 'h-9 w-9 p-0',
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, type = 'button', variant = 'default', size = 'default', ...props },
    ref,
  ) => {
    return (
      <button
        type={type}
        className={cn(variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };
