import { DocumentData, QuerySnapshot } from '@firebase/firestore';

export default function getDataWithId(
  snapshot: QuerySnapshot<DocumentData> | undefined
) {
  let entries: DocumentData[] = [];
  if (snapshot) {
    snapshot.forEach((doc) => {
      entries.push({ ...doc.data(), __id: doc.id });
    });
  }
  return entries;
}
