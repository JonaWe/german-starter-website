import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

interface NameCellProps {
  value: string;
  row: any;
}

export default function NameCell({ value: name }: NameCellProps) {
  return (
    <>
      <p>{name || <Skeleton />}</p>
    </>
  );
}
