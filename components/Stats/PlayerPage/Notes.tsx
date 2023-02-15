import { useEffect, useState } from 'react';

import { Orbit, Ring } from '@uiball/loaders';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  useDocumentData,
  useDocumentDataOnce,
} from 'react-firebase-hooks/firestore';
import { HiCheck } from 'react-icons/hi';
import { useDebouncedCallback } from 'use-debounce';

import { auth, db } from '../../../firebase/clientApp';
import Button from '../../UI/Button';

export default function PersonalNotes({ id }: { id: string }) {
  const [user] = useAuthState(auth);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const noteRef = doc(db, 'steam_users', id, 'notes', user?.uid || 'invalid');
  const [note] = useDocumentDataOnce(noteRef);

  const onNotesChange = async (text: string) => {
    await setDoc(noteRef, {
      author: user?.uid,
      note: text,
    });
    setLoading(false);
  };

  const debouncedNotesChange = useDebouncedCallback(
    // function
    onNotesChange,
    // delay in ms
    1000
  );

  useEffect(() => {
    setValue(note?.note || '');
  }, [note]);

  return (
    <div>
      {user ? (
        <div className="relative">
          <div className="absolute inset-0 flex justify-end opacity-10 p-2 pointer-events-none">
            {loading ? <Ring color="#fff" size={15} /> : <HiCheck />}
          </div>
          <textarea
            name="notes"
            placeholder="Take some personal notes"
            className="w-full bg-background-150/20 focus-visible:outline-none rounded-md px-3 py-2"
            rows={4}
            maxLength={150}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setLoading(true);
              debouncedNotesChange(e.target.value);
            }}
          />
        </div>
      ) : (
        <div className="bg-background-150/20 rounded-md p-4">
          <p className="mb-2">
            Login to create notes about players that are completely private and
            only visible to you.
          </p>
          <Button
            primary
            text="login"
            useLink
            href={`/signin?successUrl=/profile/${id}`}
          ></Button>
        </div>
      )}
    </div>
  );
}
