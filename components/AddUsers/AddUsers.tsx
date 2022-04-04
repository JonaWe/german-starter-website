import { useState } from 'react';

import { HiUserAdd } from 'react-icons/hi';

export default function AddUsers({
  onChange,
}: {
  onChange: (author: string[]) => void;
}) {
  const [authors, setAuthors] = useState();

  const addAuthor = () => {
    
  }

  return (
    <>
      <div className="flex justify-between gap-5">
        <input id="author" className="w-full" />
        <button
          type="button"
          className="bg-green-600/60 transition-colors hover:bg-green-600 h-full aspect-square flex justify-center items-center"
        >
          <HiUserAdd className="fill-sand-500/50 text-xl" />
        </button>
      </div>
    </>
  );
}
