import { updateProfile } from 'firebase/auth';

import { auth } from '../../firebase/clientApp';

export default async function addAvatar(overwrite = false) {
  if (!auth) return;

  const user = auth.currentUser;

  if (!user || user.photoURL || (user.photoURL && !overwrite)) return;
  const photoURL = `https://ui-avatars.com/api/?format=svg&background=323232&color=707070&bold=true&name=${user.email?.substring(
    0,
    2
  )}`;

  try {
    await updateProfile(user, { photoURL });
  } catch (e) {
    console.log('Could not set photoURL: \n', e);
  }
}
