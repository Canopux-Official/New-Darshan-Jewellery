import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface AdminButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
  icon?: ReactNode;
  children?: ReactNode;
}

const VARIANTS = {
  primary: {
    bg: 'var(--admin-text)',
    color: '#FFFFFF',
    border: 'var(--admin-text)',
    hoverBg: '#333',
  },
  secondary: {
    bg: 'transparent',
    color: 'var(--admin-text)',
    border: 'var(--admin-border)',
    hoverBg: 'var(--admin-bg)',
  },
  ghost: {
    bg: 'transparent',
    color: 'var(--admin-text-2)',
    border: 'transparent',
    hoverBg: 'var(--admin-bg)',
  },
  danger: {
    bg: 'rgba(220,38,38,0.06)',
    color: 'var(--admin-danger)',
    border: 'rgba(220,38,38,0.2)',
    hoverBg: 'rgba(220,38,38,0.12)',
  },
};

export default function AdminButton({
  variant = 'secondary',
  size = 'md',
  icon,
  children,
  style,
  ...props
}: AdminButtonProps) {
  const v = VARIANTS[variant];
  const padding = size === 'sm' ? '6px 12px' : '9px 18px';
  const fontSize = size === 'sm' ? '0.75rem' : '0.8125rem';

  return (
    <button
      {...props}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '7px',
        padding, fontFamily: 'var(--font-body)', fontSize, fontWeight: 500,
        letterSpacing: '0.02em', color: v.color,
        backgroundColor: v.bg, border: `1px solid ${v.border}`,
        borderRadius: '6px', cursor: 'pointer',
        transition: 'background-color 0.2s, border-color 0.2s',
        whiteSpace: 'nowrap',
        ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = v.hoverBg; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = v.bg; }}
    >
      {icon}
      {children}
    </button>
  );
}
