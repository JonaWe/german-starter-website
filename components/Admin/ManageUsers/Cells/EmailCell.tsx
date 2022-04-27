import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

interface EmailCellProps {
  value: string;
  row: any;
}

export default function EmailCell({ value: email }: EmailCellProps) {
  return (
    <>
      <p className="text-xs text-sand-600">{email || <Skeleton />}</p>
    </>
  );
}
