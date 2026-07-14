interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ width = '100%', height = '16px', borderRadius = '4px', style }: SkeletonProps) {
  return (
    <div
      style={{
        width, height, borderRadius,
        backgroundColor: 'var(--admin-border)',
        backgroundImage: 'linear-gradient(90deg, var(--admin-border) 0%, rgba(255,255,255,0.4) 50%, var(--admin-border) 100%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-shimmer 1.6s ease-in-out infinite',
        ...style,
      }}
    />
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--admin-border)' }}>
          <Skeleton width="40px" height="40px" borderRadius="6px" />
          <Skeleton width="180px" />
          <Skeleton width="100px" />
          <Skeleton width="60px" />
          <Skeleton width="60px" />
          <Skeleton width="80px" borderRadius="100px" />
        </div>
      ))}
      <style>{`
        @keyframes skeleton-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
