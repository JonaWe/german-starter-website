import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { auth, db } from '../../../firebase/clientApp';
import useButtonStyle from '../../../hooks/useButtonStyle';
import useLocalization from '../../../hooks/useLocalization';
import usePublicUser from '../../../hooks/usePublicUser';
import useSteamUser from '../../../hooks/useSteamUser';

interface CommentSectionProps {
  id: string;
  className?: string;
}

const schema = yup
  .object({
    comment: yup.string().required().max(30),
  })
  .required();

export default function NewsAddComment({ id }: CommentSectionProps) {
  const [user] = usePublicUser(auth?.currentUser?.uid || '');
  const [steamUser] = useSteamUser(user?.stemaid);

  const t = useLocalization();

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    const commentsRef = collection(db, 'news', id, 'comments');

    addDoc(commentsRef, {
      author: auth?.currentUser?.uid,
      comment: data.comment,
      createdAt: serverTimestamp(),
    });

    reset();
  });

  return (
    <form autoComplete="off" className="mb-6" onSubmit={onSubmit}>
      <input
        autoComplete="false"
        name="hidden"
        type="text"
        className="hidden"
      ></input>
      <div className="flex gap-5 ">
        <img
          src={steamUser ? steamUser.avatar.medium : user?.photoURL}
          alt="avatar"
          className="h-12 aspect-square"
        />
        <input type="text" className="w-full" {...register('comment')} />
      </div>
      <button className={`${useButtonStyle(true)} ml-auto mt-3`}>
        {t.from.general.submit}
      </button>
    </form>
  );
}
