import { useSearch } from '../../../context/SearchContext';
import { useAuth } from '../../context/AuthContext';

interface AdminTopbarProps {
  collapsed: boolean;
  onMobileMenuOpen: () => void;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'AD';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function AdminTopbar({ collapsed, onMobileMenuOpen }: AdminTopbarProps) {
  const { openSearch } = useSearch();
  const { user } = useAuth();

  const displayName = user?.name?.trim() || 'Admin';
  const initials = getInitials(displayName);

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const sidebarW = collapsed ? 'var(--admin-sidebar-collapsed)' : 'var(--admin-sidebar-w)';

  return (
    <div
      className="admin-topbar"
      style={{
        position: 'fixed',
        top: 0,
        left: sidebarW,
        right: 0,
        zIndex: 90,
        height: 'var(--admin-topbar-h)',
        backgroundColor: 'var(--admin-card)',
        borderBottom: '1px solid var(--admin-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        transition: 'left 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
        gap: '16px',
      }}
    >
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Mobile menu toggle */}
        <button
          className="admin-mobile-menu-btn"
          onClick={onMobileMenuOpen}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--admin-text-2)', display: 'none', padding: '4px' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Date */}
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--admin-text-2)', whiteSpace: 'nowrap' }}>
          {today}
        </p>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Search trigger */}
        <button
          onClick={openSearch}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '7px 14px', borderRadius: '7px',
            border: '1px solid var(--admin-border)',
            backgroundColor: 'var(--admin-bg)',
            cursor: 'pointer', transition: 'border-color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-gold)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--admin-border)'}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--admin-text-3)" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--admin-text-3)', whiteSpace: 'nowrap' }}>Search…</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'var(--admin-text-3)', border: '1px solid var(--admin-border)', borderRadius: '4px', padding: '1px 5px' }}>⌘K</span>
        </button>

        {/* Admin avatar */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 10px', borderRadius: '8px', border: '1px solid var(--admin-border)', cursor: 'pointer', transition: 'background-color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--admin-bg)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          title={user?.email || displayName}
        >
          <div style={{ width: '26px', height: '26px', borderRadius: '6px', backgroundColor: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', fontWeight: 600, color: '#fff' }}>{initials}</span>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 500, color: 'var(--admin-text)', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {displayName}
          </p>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--admin-text-3)" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-topbar { left: 0 !important; }
          .admin-mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
