import { DocumentReference, arrayUnion, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from '../../firebase/clientApp';

export default async function uploadTicketImage(
  file: File,
  ticketRef: DocumentReference,
  id: string
) {
  const fileRef = ref(storage, `tickets/${ticketRef.id}/${id}`);

  const uploadTask = await uploadBytes(fileRef, file);

  const downloadURL = await getDownloadURL(uploadTask.ref);

  updateDoc(ticketRef, { uploads: arrayUnion(downloadURL) });

  return downloadURL;
}
