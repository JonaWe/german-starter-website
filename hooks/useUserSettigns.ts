import { doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { auth, db } from '../firebase/clientApp';
import { UserSettings } from '../interfaces/UserSettings';
import updateSettings from '../lib/firebase/updateSettings';

export default function useUserSettigns() {
  const user = auth.currentUser;

  //insert invalid user id if no user avilable because else doc() will thorw a error
  const userRef = doc(db, 'Users', user?.uid || 'invalidUID');
  const [userData] = useDocumentData(userRef);

  const setSettigns = (settings: UserSettings) => {
    updateSettings(user?.uid || 'invalidUID', settings);
  };
  return [userData?.settings, setSettigns];
}
