interface BadgeProps {
  children: React.ReactNode;
  variant?: 'newArrival' | 'featured' | 'unavailable';
}

export default function Badge({ children, variant = 'newArrival' }: BadgeProps) {
  const styles: Record<string, React.CSSProperties> = {
    newArrival: {
      border: '1px solid var(--color-gold)',
      backgroundColor: 'rgba(24,24,24,0.55)',
      color: 'var(--color-gold)',
    },
    featured: {
      border: '1px solid rgba(248,246,242,0.4)',
      backgroundColor: 'rgba(24,24,24,0.55)',
      color: 'rgba(248,246,242,0.8)',
    },
    unavailable: {
      border: '1px solid rgba(248,246,242,0.2)',
      backgroundColor: 'rgba(24,24,24,0.55)',
      color: 'rgba(248,246,242,0.4)',
    },
  };

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 10px',
        backdropFilter: 'blur(4px)',
        fontFamily: 'var(--font-body)',
        fontSize: '0.5625rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        lineHeight: 1,
        ...styles[variant],
      }}
    >
      {children}
    </span>
  );
}
