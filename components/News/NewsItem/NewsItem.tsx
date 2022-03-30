import Markdown from 'markdown-to-jsx';

import Badge from '../../UI/Badge';

interface NewsItemProps {
  title: string;
  releaseDate: Date;
  content: string;
  className?: string;
}

export default function NewsItem({
  title,
  content,
  releaseDate,
  className,
}: NewsItemProps) {
  return (
    <article
      className={`relative inline-block bg-background-600 px-10 pb-10 pt-14 sm:w-4/6 w-full max-w-screen-2xl ${className}`}
    >
      <Badge className="absolute -top-6 left-6">{title}</Badge>
      <div className="prose prose-invert prose-red">
        <Markdown>{content}</Markdown>
      </div>
      {/* Display authors of Post */}
      {/* Authors have accounts and one Post can have multiple authors */}
      {/* Add editor for admin accounts to create posts */}
      {/* Add user accounts for comments on news posts */}
      {/* Connect to steam account to link to server statistics in forum */}
    </article>
  );
}
