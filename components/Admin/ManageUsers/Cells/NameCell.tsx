import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

interface NameCellProps {
  value: string;
  row: any;
}

export default function NameCell({ value: name, row }: NameCellProps) {
  return (
    <>
      <p>{row.original.uid ? name || '-' : <Skeleton />}</p>
    </>
  );
}
