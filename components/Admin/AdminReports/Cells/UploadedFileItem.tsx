import {
  arrayRemove,
  deleteField,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { HiOutlineTrash } from 'react-icons/hi';

import { db, storage } from '../../../../firebase/clientApp';

export default function UploadedFileItem({
  name,
  link,
  ticketPath,
  filePath,
  fileId,
}: {
  link: string;
  name: string;
  filePath: string;
  ticketPath: string;
  fileId: string;
}) {
  const handleDelete = async () => {
    const fileRef = ref(storage, filePath);

    try {
      await deleteObject(fileRef);

      await updateDoc(doc(db, ticketPath), {
        uploads: arrayRemove({ id: fileId, url: link }),
      });
      console.log('deleted');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li
      key={name}
      className="text-sm flex justify-between group bg-background-600 w-52 flex-col"
    >
      <a
        href={link ? link : '#'}
        target={link ? '_blank' : '_self'}
        rel="noreferrer"
        className={`${
          link ? 'cursor-pointer' : 'cursor-default'
        } w-full aspect-square overflow-hidden`}
      >
        <img
          src={link}
          alt={name}
          className="object-cover w-full aspect-square hover:scale-105 scale-100  transition-all"
        />
      </a>
      <span className="flex gap-1 transition-all items-center justify-between overflow-hidden px-2 py-3">
        <p className={`truncate `}>{name}</p>
        <button onClick={() => handleDelete()} type="button">
          <HiOutlineTrash className="text-lg stroke-background-400 hover:stroke-red-600 transition-all" />
        </button>
      </span>
    </li>
  );
}
