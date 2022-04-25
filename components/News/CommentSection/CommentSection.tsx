import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../../firebase/clientApp';
import useLocalization from '../../../hooks/useLocalization';
import Button from '../../UI/Button';
import NewsAddComment from './NewsAddComment';
import NewsComments from './NewsComments';

interface CommentSectionProps {
  path: string;
  className?: string;
}

export default function CommentSection({ path }: CommentSectionProps) {
  const [user] = useAuthState(auth);

  const t = useLocalization();

  return (
    <div className="mt-10">
      {user ? (
        <NewsAddComment path={path} />
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
      <NewsComments path={path} />
    </div>
  );
}
