import { useState } from 'react';
import { useSearch } from '../../../context/SearchContext';

interface AdminTopbarProps {
  collapsed: boolean;
  onMobileMenuOpen: () => void;
}

export default function AdminTopbar({ collapsed, onMobileMenuOpen }: AdminTopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const { openSearch } = useSearch();

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

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            style={{
              position: 'relative', width: '36px', height: '36px', borderRadius: '8px',
              border: '1px solid var(--admin-border)', backgroundColor: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--admin-text-2)',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--admin-bg)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            {/* Badge */}
            <span style={{ position: 'absolute', top: '7px', right: '7px', width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--color-gold)', border: '1.5px solid var(--admin-card)' }} />
          </button>

          {/* Dropdown */}
          {notifOpen && (
            <div style={{ position: 'absolute', top: '44px', right: 0, width: '300px', backgroundColor: 'var(--admin-card)', border: '1px solid var(--admin-border)', borderRadius: '10px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', zIndex: 200, overflow: 'hidden' }}>
              <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--admin-text)' }}>Notifications</p>
                <button onClick={() => setNotifOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--admin-text-3)' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>
              {[
                { msg: 'New review from Rina Joshi awaiting approval', time: '2h ago', dot: 'var(--admin-warning)' },
                { msg: 'Gold rates updated successfully', time: '4h ago', dot: 'var(--admin-success)' },
                { msg: 'Bridal Kundan Ring added to catalogue', time: 'Yesterday', dot: 'var(--color-gold)' },
              ].map((n, i) => (
                <div key={i} style={{ padding: '12px 16px', borderBottom: i < 2 ? '1px solid var(--admin-border)' : 'none', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: n.dot, flexShrink: 0, marginTop: '5px' }} />
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--admin-text)', lineHeight: 1.4, marginBottom: '2px' }}>{n.msg}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', color: 'var(--admin-text-3)' }}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Admin avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 10px', borderRadius: '8px', border: '1px solid var(--admin-border)', cursor: 'pointer', transition: 'background-color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--admin-bg)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <div style={{ width: '26px', height: '26px', borderRadius: '6px', backgroundColor: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', fontWeight: 600, color: '#fff' }}>RP</span>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 500, color: 'var(--admin-text)' }}>Admin</p>
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
