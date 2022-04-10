import { useEffect, useState } from 'react';

import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { HiUserAdd } from 'react-icons/hi';

import UserPill from './UserPill';

interface AddUserPorps {
  value: string[];
  onChange: (user: string[]) => void;
}

export default function AddUsers({ onChange, value: users }: AddUserPorps) {
  const [input, setInput] = useState('');

  const fetchUser = async (email: string) => {
    try {
      const data = await axios.post('/api/users/getPublicProfiles/byId', {
        email,
      });
      return data;
    } catch (error) {
      toast.error('User not found');
      return null;
    }
  };

  const addUser = async () => {
    const data = await fetchUser(input);

    if (!data) return;

    const uid = data.data.uid;

    if (users.includes(uid)) return toast.error('User in list');

    onChange([...users, data.data.uid]);
    setInput('');

    toast.success('User added');
  };

  const removeUser = async (id: string) => {
    if (users.length === 1) return toast.error('User must be one');
    onChange(
      users.filter((uid: string) => {
        return uid !== id;
      })
    );
    toast.success('User removed');
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        {users.map((uid: string) => {
          return (
            <span className="inline-block mr-2 mb-2" key={uid}>
              <UserPill id={uid} onClick={(uid) => removeUser(uid)} />
            </span>
          );
        })}
      </div>
      <div className="flex justify-between gap-5">
        <input
          id="author"
          className="w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={() => addUser()}
          type="button"
          className="bg-green-600/60 transition-colors hover:bg-green-600 h-full aspect-square flex justify-center items-center"
        >
          <HiUserAdd className="fill-sand-500/50 text-xl" />
        </button>
      </div>
    </>
  );
}
