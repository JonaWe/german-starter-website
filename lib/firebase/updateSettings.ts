import { doc, setDoc } from 'firebase/firestore';

import { db } from '../../firebase/clientApp';
import { UserSettings } from '../../interfaces/UserSettings';

/**
 * Update the users settings, new ones will be merged with existing settings
 * @param {string} uid - User id
 * @param {Object} settings - These settings will be written or updated in the users profile.
 */

export default async function updateSettings(
  uid: string,
  settings: UserSettings
) {
  if (!uid) return;

  const userRef = doc(db, 'users', uid);
  const result = await setDoc(userRef, { settings }, { merge: true });
  return result;
}
