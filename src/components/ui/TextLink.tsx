import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface TextLinkProps {
  to: string;
  children: React.ReactNode;
  light?: boolean;
  style?: React.CSSProperties;
}

export default function TextLink({ to, children, light, style }: TextLinkProps) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ display: 'inline-block' }}
    >
      <Link
        to={to}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8125rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: light ? 'var(--color-gold)' : 'var(--color-text)',
          borderBottom: `1px solid ${light ? 'var(--color-gold)' : 'var(--color-text)'}`,
          paddingBottom: '2px',
          transition: 'opacity 0.3s',
          ...style,
        }}
      >
        {children}
      </Link>
    </motion.div>
  );
}
