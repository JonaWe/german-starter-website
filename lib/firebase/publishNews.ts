import { collection, doc, setDoc } from 'firebase/firestore';

import { db } from '../../firebase/clientApp';

export default function publishNews(id: string | undefined) {
  if (!id) return;
  const newsRef = collection(db, 'news');
  const newsItemRef = doc(newsRef, id);

  setDoc(newsItemRef, { published: true }, { merge: true });
}
