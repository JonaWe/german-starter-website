import { useRouter } from 'next/router';

import { Timestamp } from '@firebase/firestore';
import Markdown from 'markdown-to-jsx';

import { checkIfSameDay } from '../../../lib/checkIfSameDay';
import Badge from '../../UI/Badge';
import Divider from '../../UI/Divider';
import NewsCommentSection from '../CommentSection/NewsCommentSection';
import NewsAuthor from './NewsAuthor';

interface NewsItemProps {
  title: string;
  releaseDate: Timestamp;
  content: string;
  authors: string[];
  id: string;
  className?: string;
}

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export default function NewsItem({
  title,
  content,
  releaseDate,
  authors,
  id,
  className,
}: NewsItemProps) {
  const { locale } = useRouter();

  return (
    <article className={`${className} mb-10`}>
      <div className="border-b-2 pb-7 border-background-150">
        <h2 className="leading-none">{title}</h2>
        <p className="text-xs text-sand-500/80">
          {checkIfSameDay(releaseDate.toDate())
            ? locale === 'en'
              ? 'Today'
              : 'Heute'
            : releaseDate
                .toDate()
                .toLocaleDateString(locale, dateFormatOptions)}
        </p>
        <div className="prose prose-invert prose-red">
          <Markdown>{content}</Markdown>
        </div>
        <div className="flex gap-3 mt-10">
          {authors &&
            authors.map((author) => {
              return <NewsAuthor key={author} uid={author} />;
            })}
        </div>
      </div>
      <NewsCommentSection id={id} />
      {/* Display authors of Post */}
      {/* Authors have accounts and one Post can have multiple authors */}
      {/* Add editor for admin accounts to create posts */}
      {/* Add user accounts for comments on news posts */}
      {/* Connect to steam account to link to server statistics in forum */}
    </article>
  );
}
