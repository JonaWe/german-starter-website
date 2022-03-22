import { FirebaseError } from 'firebase/app';
import { collection, doc, DocumentData } from 'firebase/firestore';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { db } from '../firebase/clientApp';

export default function useDocumentDataFromCollectionOnce(
  collectionName: string,
  documentName: string
): [DocumentData | undefined, boolean, FirebaseError | undefined] {
  const collectionRef = collection(db, collectionName);
  const documentRef = doc(collectionRef, documentName);
  const [value, loading, error] = useDocumentDataOnce(documentRef);
  return [value, loading, error];
}
