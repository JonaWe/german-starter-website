import { collection, doc, setDoc } from 'firebase/firestore';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';

import { db } from '../firebase/clientApp';

interface ServerSettings {
  teamspeakUrl: string;
  discordUrl: string;
  ip: string;
}

export default function useServerConfig() {
  const serverRef = collection(db, 'config');
  const configRef = doc(serverRef, 'server');

  const [config] = useDocumentDataOnce(configRef);

  const setConfig = (settings: ServerSettings) => {
    setDoc(configRef, settings, { merge: true });
  };

  return [config, setConfig];
}
