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
    <>
      {comments &&
        comments.map(({ author, createdAt, comment }) => {
          return (
            <NewsComment uid={author} date={createdAt} comment={comment} />
          );
        })}
    </>
  );
}
