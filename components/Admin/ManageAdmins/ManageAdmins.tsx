import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { HiAnnotation, HiNewspaper, HiUser } from 'react-icons/hi';
import * as yup from 'yup';

import { auth } from '../../../firebase/clientApp';
import InfoBox from '../../UI/Info';

const schema = yup
  .object({
    email: yup.string().required().email(),
    agree: yup
      .boolean()
      .oneOf([true], 'You must agree to the terms and conditions'),
  })
  .required();

interface Info {
  type: 'info' | 'warning' | 'success' | 'error';
  info: string;
}

export default function ManageAdmins() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [user] = useAuthState(auth);
  const [info, setInfo] = useState<Info>();

  const onSubmit = handleSubmit(async (data) => {
    if (!user) return;
    const token = await user.getIdToken();

    try {
      await axios.post(
        `/api/admin/promoteToAdmin`,
        { email: data.email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setInfo({
        type: 'success',
        info: 'promoted user to admin',
      });
    } catch (error) {
      setInfo({
        type: 'error',
        info: (error as Error).message,
      });
    }

    reset();
  });

  return (
    <div className="">
      <form className="w-64" onSubmit={onSubmit}>
        <h2>Promote user to admin</h2>
        <InfoBox
          type={'warning'}
          info="All admins have full access to the Database users Users and this Dashbord"
        />
        <div>
          <label className="block mb-1 text-xl font-bebas">E-Mail</label>
          <input type="email" {...register('email')} />
          {errors.email && (
            <div className={`text-red-400 text-xs mt-2`}>
              {errors.email.message}
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-3">
          <input
            type="checkbox"
            {...register('agree')}
            className="accent-rust-500"
          />
          <span className="text-xs">
            I&apos;m sure I want to grant this user
            <b className="text-rust-500"> full access</b>!
          </span>
        </div>
        {errors.agree && (
          <div className={`text-red-400 text-xs mt-2`}>
            {errors.agree.message}
          </div>
        )}
        {info && <InfoBox className="mt-3" type={info.type} info={info.info} />}
        <button
          type="submit"
          className="font-bebas text-xl py-2 px-4 flex items-center gap-2 text-sand-500 transition duration-150 bg-rust-500 hover:bg-rust-600 w-fit ml-auto mt-2"
        >
          Promote user
        </button>
      </form>
    </div>
  );
}
