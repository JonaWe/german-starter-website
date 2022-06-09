import { doc } from 'firebase/firestore';
import {
  useDocumentData,
  useDocumentDataOnce,
} from 'react-firebase-hooks/firestore';
import toast, { Toaster } from 'react-hot-toast';
import { HiTrash } from 'react-icons/hi';

import { db } from '../../../firebase/clientApp';
import usePublicUser from '../../../hooks/usePublicUser';
import deleteDocByPath from '../../../lib/firebase/deleteDocByPath';
import Avatar from '../../UI/Avatar';
import Button from '../../UI/Button';
import InfoBox from '../../UI/Info';

export default function DeleteComment({ path }: { path: string }) {
  const commentRef = doc(db, path);
  const [comment, loading] = useDocumentData(commentRef);

  const [author] = usePublicUser(comment?.author);

  const handelClick = () => {
    deleteDocByPath(path);
    toast.success('Comment deleted');
  };

  return (
    <>
      <Toaster />

      {!comment && !loading && (
        <InfoBox
          info="Comment dose not exist!"
          className="mt-5"
          type={'warning'}
        ></InfoBox>
      )}

      {comment && (
        <>
          <h3 className="mt-5">Comment author</h3>
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12" url={author?.photoURL} />
            <div className="flex flex-col">
              <p className="leading-none font-bold">
                {author?.displayName || '-'}
              </p>
              <p className="text-xs text-sand-500/60">{author?.email || '-'}</p>
            </div>
          </div>
        </>
      )}
      <h3 className="mt-5">Action</h3>
      <Button
        text="Remove comment"
        onClick={handelClick}
        disabled={!comment && !loading}
      >
        <HiTrash />
      </Button>
    </>
  );
}
