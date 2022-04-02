import {
  Query,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

import { db } from '../../firebase/clientApp';
import { NewsItem } from '../../pages/news';

export default async function getPublicNewsArticle(
  onlyPublished: boolean = true
) {
  const collectionRef = collection(db, 'news');
  let q: Query;
  if (onlyPublished) {
    q = query(
      collectionRef,
      orderBy('releaseDate', 'desc'),
      where('published', '==', true)
    );
  } else {
    q = query(collectionRef, orderBy('releaseDate', 'desc'));
  }

  const docs = await getDocs(q);

  let newsItems: NewsItem[] = [];
  docs.forEach((doc) => {
    const docData = doc.data();
    newsItems.push({
      de: docData.de,
      en: docData.en,
      authors: docData.authors,
      releaseDate: docData.releaseDate,
      published: docData.published,
      id: doc.id,
    });
  });

  return newsItems;
}
