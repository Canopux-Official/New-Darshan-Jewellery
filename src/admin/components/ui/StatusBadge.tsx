type Variant = 'active' | 'inactive' | 'hidden' | 'pending' | 'approved' | 'scheduled' | 'expired' | 'featured' | 'new';

interface StatusBadgeProps {
  variant: Variant;
  label?: string;
}

const CONFIG: Record<Variant, { bg: string; color: string; dot: string; defaultLabel: string }> = {
  active:    { bg: 'rgba(22,163,74,0.1)',   color: '#16A34A', dot: '#16A34A', defaultLabel: 'Active' },
  inactive:  { bg: 'rgba(107,105,102,0.1)', color: '#6B6966', dot: '#6B6966', defaultLabel: 'Inactive' },
  hidden:    { bg: 'rgba(220,38,38,0.08)',  color: '#DC2626', dot: '#DC2626', defaultLabel: 'Hidden' },
  pending:   { bg: 'rgba(217,119,6,0.1)',   color: '#D97706', dot: '#D97706', defaultLabel: 'Pending' },
  approved:  { bg: 'rgba(22,163,74,0.1)',   color: '#16A34A', dot: '#16A34A', defaultLabel: 'Approved' },
  scheduled: { bg: 'rgba(37,99,235,0.08)',  color: '#2563EB', dot: '#2563EB', defaultLabel: 'Scheduled' },
  expired:   { bg: 'rgba(107,105,102,0.1)', color: '#6B6966', dot: '#6B6966', defaultLabel: 'Expired' },
  featured:  { bg: 'rgba(199,161,90,0.12)', color: '#C7A15A', dot: '#C7A15A', defaultLabel: 'Featured' },
  new:       { bg: 'rgba(199,161,90,0.12)', color: '#C7A15A', dot: '#C7A15A', defaultLabel: 'New' },
};

export default function StatusBadge({ variant, label }: StatusBadgeProps) {
  const key = (variant || 'inactive').toLowerCase() as Variant;
  const c = CONFIG[key] ?? CONFIG.inactive;
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '5px',
        padding: '3px 10px', borderRadius: '100px',
        backgroundColor: c.bg,
        fontFamily: 'var(--font-body)', fontSize: '0.6875rem',
        fontWeight: 500, color: c.color, whiteSpace: 'nowrap',
        letterSpacing: '0.02em',
      }}
    >
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: c.dot, flexShrink: 0 }} />
      {label ?? c.defaultLabel}
    </span>
  );
}
