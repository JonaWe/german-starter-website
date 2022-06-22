import Link from 'next/link';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

interface NameCellProps {
  value: string;
  row: any;
}

export default function NameCell({ value: name, row }: NameCellProps) {
  return (
    <Link href={'/admin/users/' + row.original.uid}>
      <a>{row.original.uid ? name || '-' : <Skeleton />}</a>
    </Link>
  );
}
