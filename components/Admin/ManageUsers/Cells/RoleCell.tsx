import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { ACCESS_ROLES } from '../../../../data/AccessRoles';
import { db } from '../../../../firebase/clientApp';

interface RoleCellProps {
  row: any;
}

export default function RoleCell({ row }: RoleCellProps) {
  const docRef = doc(db, 'users', row.original.uid || '_');

  //FIXME: #6 Not all admins showing up as admins
  const [userData] = useDocumentData(docRef);

  return (
    <p>
      {row.original.uid ? (
        <span
          className={`text-xs px-2.5 py-1.5 rounded-full border ${
            userData?.role === ACCESS_ROLES.admin.id
              ? 'border-green-500/80 text-green-500/80 bg-green-400/10'
              : userData?.role === ACCESS_ROLES.dev.id
              ? 'border-purple-500/80 text-purple-500/80 bg-purple-400/10'
              : userData?.role === ACCESS_ROLES.owner.id
              ? 'border-blue-500/80 text-blue-500/80 bg-blue-400/10'
              : 'border-sand-500/50 text-sand-500/50 bg-sand-500/10'
          } uppercase mr-2`}
        >
          {userData?.role || 'user'}
        </span>
      ) : (
        <Skeleton />
      )}
    </p>
  );
}
