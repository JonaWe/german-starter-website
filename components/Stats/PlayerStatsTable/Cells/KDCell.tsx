import Skeleton from 'react-loading-skeleton';

interface CellProps {
  value: number;
  row: any;
}

const DECIMAL_COUNT = 100;

export default function KDCell({ value: _, row }: CellProps) {
  const { kills, pvpdeaths } = row.original;

  const KD =
    kills !== 0 && pvpdeaths !== 0
      ? Math.floor((kills / pvpdeaths) * DECIMAL_COUNT) / DECIMAL_COUNT
      : 0;

  return (
    <p className="text-sand-500/70">
      {KD || KD === 0 ? KD : <Skeleton width={40} />}
    </p>
  );
}
