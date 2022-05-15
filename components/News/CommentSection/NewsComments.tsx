import { useEffect, useState } from 'react';

import {
  DocumentData,
  Query,
  collection,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '../../../firebase/clientApp';
import useLocalization from '../../../hooks/useLocalization';
import getDataWithId from '../../../lib/firebase/getDataWithId';
import NewsComment from './NewsComment';

interface NewsCommentsProps {
  path: string;
}

export default function NewsComments({ path }: NewsCommentsProps) {
  const commentsRef = collection(db, path);
  const c: DocumentData[] = [];
  const [comments, setComments] = useState(c);
  const [showAll, setShowAll] = useState(false);
  const t = useLocalization();
  const PREVIEW_COUNT = 3;

  let q: Query;

  if (showAll) q = query(commentsRef, orderBy('createdAt', 'desc'));
  else
    q = query(
      commentsRef,
      orderBy('createdAt', 'desc'),
      limit(PREVIEW_COUNT + 1)
    );

  const [data, loading, error] = useCollection(q);

  useEffect(() => {
    if (!data) return;
    setComments(getDataWithId(data));
  }, [data]);

  return (
    <>
      <div className="relative">
        <div className="border-l-4 absolute h-full translate-x-6 border-background-150 z-[1]" />
        <div className="relative z-[2]">
          {comments.map(({ author, createdAt, comment, __id }, i) => {
            if (i >= PREVIEW_COUNT && !showAll) return;
            return (
              <NewsComment
                uid={author}
                date={createdAt}
                comment={comment}
                path={`${path}/${__id}`}
                key={`${author}-${createdAt?.toDate().getTime()}`}
              />
            );
          })}
        </div>
      </div>
      {comments.length !== 0 ? (
        comments.length > PREVIEW_COUNT && (
          <button
            className="text-rust-500/60 hover:text-rust-500 transition"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll
              ? t.newsPage.comments.showLess
              : t.newsPage.comments.showMore}
          </button>
        )
      ) : (
        <p className="text-sand-500/30 text-xs">
          {t.newsPage.comments.noComments}
        </p>
      )}
    </>
  );
}
