import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStoreSettings } from '../../context/StoreSettingsContext';

const footerCollections = ['Gold Rings', 'Necklaces', 'Chains', 'Bangles', 'Bracelets', 'Earrings'];
const quickLinks = ['Home', 'About Us', "Today's Rates", 'Gallery', 'Contact'];

export default function Footer() {
  const settings = useStoreSettings();
  const nameParts = (settings.storeName || 'Krishna Jewellers').split(/\s+/);
  const brandMain = nameParts[0] || 'Krishna';
  const brandSub = nameParts.slice(1).join(' ') || 'Jewellers';

  const socialLinks = [
    { label: 'Instagram', href: settings.instagramUrl },
    { label: 'Facebook', href: settings.facebookUrl },
  ].filter((s) => !!s.href);

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-dark)',
        color: 'rgba(248,246,242,0.7)',
        paddingTop: '80px',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '64px',
            paddingBottom: '64px',
          }}
          className="footer-grid"
        >
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  color: '#F8F6F2',
                  textTransform: 'uppercase',
                }}
              >
                {brandMain}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.3em',
                  color: 'var(--color-gold)',
                  textTransform: 'uppercase',
                  marginTop: '4px',
                }}
              >
                {brandSub}
              </div>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                lineHeight: 1.8,
                color: 'rgba(248,246,242,0.5)',
                maxWidth: '280px',
              }}
            >
              Three generations of craftsmanship. Each piece is a bridge between heritage and the modern world — designed to endure.
            </p>
            {socialLinks.length > 0 && (
              <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                {socialLinks.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.625rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'rgba(248,246,242,0.45)',
                      borderBottom: '1px solid rgba(199,161,90,0.3)',
                      paddingBottom: '2px',
                      transition: 'color 0.3s',
                    }}
                  >
                    {s.label}
                  </motion.a>
                ))}
              </div>
            )}
          </div>

          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.5625rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: '24px',
              }}
            >
              Quick Links
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {quickLinks.map((l) => (
                <Link
                  key={l}
                  to="/"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    color: 'rgba(248,246,242,0.55)',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F8F6F2')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(248,246,242,0.55)')}
                >
                  {l}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.5625rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: '24px',
              }}
            >
              Collections
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {footerCollections.map((c) => (
                <Link
                  key={c}
                  to="/collections"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    color: 'rgba(248,246,242,0.55)',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F8F6F2')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(248,246,242,0.55)')}
                >
                  {c}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.5625rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: '24px',
              }}
            >
              Contact
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Address', value: settings.address },
                { label: 'Phone', value: settings.phone },
                { label: 'Hours', value: `Mon – Sat: ${settings.weekdayHours}\nSunday: ${settings.sundayHours}` },
              ].map((item) => (
                <div key={item.label}>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.5625rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'rgba(248,246,242,0.3)',
                      marginBottom: '4px',
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8125rem',
                      color: 'rgba(248,246,242,0.55)',
                      whiteSpace: 'pre-line',
                      lineHeight: 1.7,
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(221,215,207,0.15)', paddingBlock: '28px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                color: 'rgba(248,246,242,0.3)',
                letterSpacing: '0.08em',
              }}
            >
              © {new Date().getFullYear()} {settings.storeName}. All rights reserved.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                color: 'rgba(248,246,242,0.2)',
                letterSpacing: '0.08em',
              }}
            >
              BIS Hallmarked · ISO Certified · Est. 1987
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </footer>
  );
}
