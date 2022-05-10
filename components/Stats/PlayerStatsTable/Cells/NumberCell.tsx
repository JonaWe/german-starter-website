import Skeleton from 'react-loading-skeleton';

interface CellProps {
  value: number;
}

export default function NumberCell({ value: number }: CellProps) {
  return (
    <p className="text-sand-500/70">
      {number || number === 0 ? number : <Skeleton width={40} />}
    </p>
  );
}
