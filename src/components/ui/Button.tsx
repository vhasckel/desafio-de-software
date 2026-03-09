'use client';

import { forwardRef } from 'react';
import Link from 'next/link';

const baseStyles =
  'inline-flex shrink-0 items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

const variants = {
  primary: 'bg-accent text-white hover:bg-accent-hover focus:ring-accent',
  secondary:
    'border border-border bg-background text-foreground hover:bg-muted/20 focus:ring-accent',
  ghost: 'text-foreground hover:bg-muted/20 focus:ring-accent',
  link: 'text-accent hover:text-accent-hover hover:underline focus:ring-accent',
  danger:
    'bg-sc-red text-white hover:bg-sc-red/90 focus:ring-sc-red',
} as const;

const sizes = {
  sm: 'px-3 py-1.5',
  md: 'px-5 py-2.5',
  lg: 'px-6 py-3 text-base',
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      className = '',
      href,
      type = 'button',
      disabled,
      ...rest
    },
    ref,
  ) => {
    const styles =
      `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim();

    if (href !== undefined) {
      const linkClass = disabled ? `${styles} pointer-events-none` : styles;
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={disabled ? '#' : href}
          className={linkClass}
          aria-disabled={disabled}
          {...(disabled && { tabIndex: -1 })}
          onClick={disabled ? (e) => e.preventDefault() : undefined}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        className={styles}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
