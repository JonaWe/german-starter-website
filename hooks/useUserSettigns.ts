import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { auth, db } from '../firebase/clientApp';
import { UserSettings } from '../interfaces/UserSettings';
import updateSettings from '../lib/firebase/updateSettings';

export default function useUserSettings() {
  const user = auth.currentUser;

  //insert invalid user id if no user avilable because else doc() will thorw a error
  const userRef = doc(db, 'users', user?.uid || 'invalid');
  const [userData, error] = useDocumentData(userRef);

  const setSettings = (settings: UserSettings) => {
    updateSettings(user?.uid || 'invalid', settings);
  };
  return [userData?.settings, setSettings, error];
}
