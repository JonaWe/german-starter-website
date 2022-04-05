import Link from 'next/link';

import { deleteDoc, doc, setDoc } from '@firebase/firestore';
import { HiEye, HiEyeOff, HiOutlineTrash, HiPencil } from 'react-icons/hi';

import { db } from '../../../../firebase/clientApp';
import Tooltip from '../../../UI/Tooltip';

interface ActionCellProps {
  value: string;
  row: any;
}

export default function ActionCell({ value: id, row }: ActionCellProps) {
  const published = row.original.published;

  const handleDelete = () => {
    const newsRef = doc(db, `news/${id}`);
    deleteDoc(newsRef);
  };

  const changePublished = () => {
    const newsItemRef = doc(db, `news/${id}`);
    setDoc(newsItemRef, { published: !published }, { merge: true });
  };

  return (
    <span className="flex gap-3 items-center">
      <Tooltip text="Delete">
        <HiOutlineTrash
          className="stroke-red-500/75 hover:stroke-red-500 text-2xl transition hover:cursor-pointer"
          onClick={handleDelete}
        />
      </Tooltip>
      <Link href={`/admin/news/${id}`}>
        <a>
          <Tooltip text="Edit">
            <HiPencil className="fill-sand-500/75 hover:fill-sand-500 text-2xl transition hover:cursor-pointer" />
          </Tooltip>
        </a>
      </Link>
      {published ? (
        <Tooltip text="Make Private">
          <HiEyeOff
            className="fill-sand-500/75 hover:fill-sand-500 text-2xl transition hover:cursor-pointer"
            onClick={changePublished}
          />
        </Tooltip>
      ) : (
        <Tooltip text="Publish">
            <HiEye
              className="fill-sand-500/75 hover:fill-sand-500 text-2xl transition hover:cursor-pointer"
              onClick={changePublished}
            />
        </Tooltip>
      )}
    </span>
  );
}
