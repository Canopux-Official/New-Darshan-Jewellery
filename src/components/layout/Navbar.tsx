import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrolled } from '../../hooks/useScrolled';
import { NAV_LINKS } from '../../utils/constants';

export default function Navbar() {
  const scrolled = useScrolled(60);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 'var(--navbar-height)',
          backgroundColor: scrolled ? 'rgba(248,246,242,0.96)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--color-divider)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'background-color 0.6s ease, border-color 0.6s ease, backdrop-filter 0.6s ease',
        }}
      >
        <div
          className="container"
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.375rem',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  color: scrolled ? 'var(--color-text)' : '#F8F6F2',
                  transition: 'color 0.6s ease',
                  textTransform: 'uppercase',
                }}
              >
                Krishna
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.3em',
                  color: scrolled ? 'var(--color-gold)' : 'rgba(199,161,90,0.9)',
                  transition: 'color 0.6s ease',
                  textTransform: 'uppercase',
                  marginTop: '3px',
                }}
              >
                Jewellers
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '36px',
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.625rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: scrolled
                      ? active
                        ? 'var(--color-gold)'
                        : 'var(--color-text)'
                      : active
                      ? 'var(--color-gold)'
                      : 'rgba(248,246,242,0.85)',
                    transition: 'color 0.3s ease',
                    paddingBottom: active ? '2px' : '2px',
                    borderBottom: active ? '1px solid var(--color-gold)' : '1px solid transparent',
                    fontWeight: 400,
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Search Icon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              aria-label="Search"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: scrolled ? 'var(--color-text)' : '#F8F6F2',
                transition: 'color 0.6s ease',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Hamburger for mobile */}
            <button
              className="hamburger"
              aria-label="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: scrolled ? 'var(--color-text)' : '#F8F6F2',
                transition: 'color 0.6s ease',
                display: 'none',
                flexDirection: 'column',
                gap: '5px',
                padding: '4px',
              }}
            >
              <span style={{ display: 'block', width: '20px', height: '1px', background: 'currentColor', transition: 'all 0.3s' }} />
              <span style={{ display: 'block', width: '20px', height: '1px', background: 'currentColor', transition: 'all 0.3s' }} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: 'var(--navbar-height)',
              left: 0,
              right: 0,
              zIndex: 99,
              backgroundColor: 'rgba(248,246,242,0.98)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid var(--color-divider)',
              padding: '32px 24px 40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeInOut' }}
              >
                <Link
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: location.pathname === link.href ? 'var(--color-gold)' : 'var(--color-text)',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
