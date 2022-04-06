import { useRouter } from 'next/router';

import { Timestamp } from '@firebase/firestore';
import Markdown from 'markdown-to-jsx';

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
  return (
    <>
      <NewsAddComment id={id} />
      <NewsComments id={id} />
    </>
  );
}
