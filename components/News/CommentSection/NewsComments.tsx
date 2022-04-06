import { collection, doc, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '../../../firebase/clientApp';
import getDataWithId from '../../../lib/firebase/getDataWithId';
import NewsComment from './NewsComment';

interface NewsCommentsProps {
  id: string;
}

export default function NewsComments({ id }: NewsCommentsProps) {
  const newsRef = collection(db, 'news');
  const commentsRef = collection(newsRef, id, 'comments');

  const q = query(commentsRef, orderBy('createdAt', 'asc'));

  const [data, loading, error] = useCollection(q);

  const comments = getDataWithId(data);

  return (
    <div className="relative">
      <div className="border-l-4 absolute h-full translate-x-6 border-background-150 z-[1]" />
      <div className="relative z-[2]">
        {comments &&
          comments.map(({ author, createdAt, comment }) => {
            return (
              <NewsComment uid={author} date={createdAt} comment={comment} />
            );
          })}
      </div>
    </div>
  );
}
