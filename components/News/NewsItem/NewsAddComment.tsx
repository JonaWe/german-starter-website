import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../../firebase/clientApp';
import usePublicUser from '../../../hooks/usePublicUser';
import useSteamUser from '../../../hooks/useSteamUser';

interface CommentSectionProps {
  id: string;
  className?: string;
}

export default function NewsAddComment({ id }: CommentSectionProps) {
  const [user] = useAuthState(auth);

  return <></>;
}
