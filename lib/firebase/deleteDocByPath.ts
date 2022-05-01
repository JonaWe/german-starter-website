import { deleteDoc, doc } from 'firebase/firestore';

import { db } from '../../firebase/clientApp';

export default function deleteDocByPath(path: string) {
  const commentRef = doc(db, path);

  deleteDoc(commentRef);

  return true;
}
