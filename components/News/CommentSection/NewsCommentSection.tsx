import { useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { Timestamp } from '@firebase/firestore';
import Markdown from 'markdown-to-jsx';

import useLocalization from '../../../hooks/useLocalization';
import { checkIfSameDay } from '../../../lib/checkIfSameDay';
import Badge from '../../UI/Badge';
import Divider from '../../UI/Divider';
import NewsAddComment from './NewsAddComment';
import NewsComments from './NewsComments';

interface CommentSectionProps {
  id: string;
  className?: string;
}

export default function NewsCommentSection({ id }: CommentSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const t = useLocalization();

  return (
    <div className="mt-10">
      <NewsAddComment id={id} />
      <NewsComments showAll={showAll} id={id} />
      <button className="text-rust-500/60 hover:text-rust-500 transition" onClick={() => setShowAll(!showAll)}>
        {showAll ? t.newsPage.comments.showLess : t.newsPage.comments.showMore}
      </button>
    </div>
  );
}
