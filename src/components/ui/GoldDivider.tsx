import { motion } from 'framer-motion';

interface GoldDividerProps {
  width?: string;
  style?: React.CSSProperties;
}

export default function GoldDivider({ width = '48px', style }: GoldDividerProps) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
      style={{
        width,
        height: '1px',
        background: 'var(--color-gold)',
        transformOrigin: 'left center',
        ...style,
      }}
    />
  );
}
