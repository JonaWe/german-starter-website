import { format } from 'date-fns';
import { UserRecord } from 'firebase-admin/auth';

import ProfileInfoItem from './ProfileInfoItem';

export default function ProfileInfo({
  user,
}: {
  user: UserRecord | null | undefined;
}) {
  return (
    <>
      <h3 className="font-sans font-semibold mb-2">Profile information</h3>
      <ProfileInfoItem value={user?.email} label={'E-Mail'} />
      <ProfileInfoItem value={user?.displayName} label={'Username'} />
      <ProfileInfoItem
        value={format(
          new Date(user?.metadata.creationTime || ''),
          'MMM dd, yyyy'
        )}
        label={'Profile Created'}
      />
      <ProfileInfoItem
        value={format(
          new Date(user?.metadata.lastSignInTime || ''),
          'MMM dd, yyyy'
        )}
        label={'Last sign in'}
      />
      <ProfileInfoItem
        value={user?.disabled ? 'Disabled' : 'Active'}
        label={'Status'}
      />
    </>
  );
}
