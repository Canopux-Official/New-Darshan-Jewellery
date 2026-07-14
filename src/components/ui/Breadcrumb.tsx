import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  light?: boolean;
}

export default function Breadcrumb({ items, light }: BreadcrumbProps) {
  const textColor = light ? 'rgba(248,246,242,0.5)' : 'var(--color-muted)';
  const activeColor = light ? 'rgba(248,246,242,0.9)' : 'var(--color-text)';
  const hoverColor = light ? '#F8F6F2' : 'var(--color-gold)';

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      aria-label="Breadcrumb"
      style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {item.href && !isLast ? (
              <Link
                to={item.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: textColor,
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = textColor)}
              >
                {item.label}
              </Link>
            ) : (
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: isLast ? activeColor : textColor,
                }}
              >
                {item.label}
              </span>
            )}
            {!isLast && (
              <span style={{ color: textColor, fontSize: '0.5rem', opacity: 0.6 }}>◆</span>
            )}
          </span>
        );
      })}
    </motion.nav>
  );
}
