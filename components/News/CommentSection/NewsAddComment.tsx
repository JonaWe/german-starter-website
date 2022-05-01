import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { auth, db } from '../../../firebase/clientApp';
import useButtonStyle from '../../../hooks/useButtonStyle';
import useLocalization from '../../../hooks/useLocalization';
import usePublicUser from '../../../hooks/usePublicUser';
import useSteamUser from '../../../hooks/useSteamUser';
import Avatar from '../../UI/Avatar';

interface CommentSectionProps {
  path: string;
  className?: string;
}

const schema = yup
  .object({
    comment: yup.string().required().max(100),
  })
  .required();

export default function NewsAddComment({ path }: CommentSectionProps) {
  const [user] = usePublicUser(auth?.currentUser?.uid || '');
  const [steamUser] = useSteamUser(user?.stemaid);

  const t = useLocalization();

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    const commentsRef = collection(db, path);

    addDoc(commentsRef, {
      author: auth?.currentUser?.uid,
      comment: data.comment,
      createdAt: serverTimestamp(),
    });

    reset();
  });

  return (
    <form autoComplete="off" className="relative" onSubmit={onSubmit}>
      <div className="border-l-4 absolute h-full translate-x-6 border-background-150 z-[1]" />
      <div className="z-[2] relative">
        <input
          autoComplete="false"
          name="hidden"
          type="text"
          className="hidden"
          maxLength={70}
        ></input>
        <div className="flex gap-5 ">
          <Avatar
            className="w-12 h-12"
            url={steamUser ? steamUser.avatar.medium : user?.photoURL}
          />
          <input type="text" className="w-full" {...register('comment')} />
        </div>
        <button className={`${useButtonStyle(true)} ml-auto mt-3`}>
          {t.from.general.submit}
        </button>
      </div>
    </form>
  );
}
