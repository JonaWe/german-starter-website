import { DocumentData, collection, doc, setDoc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { db } from '../firebase/clientApp';

export interface ServerSettings {
  teamspeakUrl?: string;
  discordUrl?: string;
  ip?: string;
}

type configRes = [
  DocumentData | null | undefined,
  (settings: ServerSettings) => Promise<void>
];

export default function useServerConfig() {
  const serverRef = collection(db, 'config');
  const configRef = doc(serverRef, 'server');

  const [config] = useDocumentData(configRef);

  const setConfig = async (settings: ServerSettings) => {
    await setDoc(configRef, settings, { merge: true });
  };

  return [config, setConfig] as configRes;
}
