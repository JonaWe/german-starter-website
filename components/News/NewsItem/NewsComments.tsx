import { collection, doc } from 'firebase/firestore';
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

  const [data, loading, error] = useCollection(commentsRef)

  const comments = getDataWithId(data);

  return (
    <>
      {comments.map(({author, createdAt, comment}) => {
        return <NewsComment uid={author} date={createdAt} comment={comment} />;
      })}
    </>
  );
}
