import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { db } from '../../../../firebase/clientApp';

interface RoleCellProps {
  row: any;
}

export default function RoleCell({ row }: RoleCellProps) {
  const docRef = doc(db, 'users', row.original.uid || '_');

  const [userData] = useDocumentData(docRef);

  return (
    <>
      <p>{row.original.uid ? userData?.role || 'user' : <Skeleton />}</p>
    </>
  );
}
