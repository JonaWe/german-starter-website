import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

import { auth, db } from '../../firebase/clientApp';
import announceNews from '../discord/announceNews';

export default async function publishNews(
  id: string | undefined,
  announce: boolean
) {
  if (!id) return;
  const newsRef = collection(db, 'news');
  const newsItemRef = doc(newsRef, id);

  setDoc(
    newsItemRef,
    {
      published: true,
      ...(announce && { announced: true }),
    },
    { merge: true }
  );

  const newsItem = (await getDoc(newsItemRef)).data();
  if (newsItem && announce)
    announceNews(auth, newsItem.en.title, newsItem.de.title, newsItem.__id);
}
