import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../../firebase/clientApp';
import useLocalization from '../../../hooks/useLocalization';
import Button from '../../UI/Button';
import NewsAddComment from './NewsAddComment';
import NewsComments from './NewsComments';

interface CommentSectionProps {
  id: string;
  className?: string;
}

export default function NewsCommentSection({ id }: CommentSectionProps) {
  const [user] = useAuthState(auth);

  const t = useLocalization();

  return (
    <div className="mt-10">
      {user ? (
        <NewsAddComment path="news" id={id} />
      ) : (
        <div className="bg-background-150 mb-3 p-4 flex justify-between items-center">
          <p className="text-sand-500/30">{t.newsPage.comments.mustSignIn}</p>
          <Button
            text={t.signIn.title}
            primary
            useLink
            href="/signin?successUrl=support"
          />
        </div>
      )}
      <NewsComments path="news" id={id} />
    </div>
  );
}
