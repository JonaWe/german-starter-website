import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

import { db } from '../../firebase/clientApp';
import { NewsItem } from '../../pages/news';

export default async function getPublicNewsArticle() {
  const collectionRef = collection(db, 'news');
  const q = query(
    collectionRef,
    orderBy('releaseDate', 'desc'),
    where('published', '==', true)
  );

  const docs = await getDocs(q);

  let newsItems: NewsItem[] = [];
  docs.forEach((doc) => {
    const docData = doc.data();
    newsItems.push({
      de: docData.de,
      en: docData.en,
      authors: docData.authors,
      releaseDate: JSON.stringify(docData.releaseDate),
      published: docData.published,
      id: doc.id,
    });
  });

  return newsItems;
}
