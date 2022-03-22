import { collection, doc } from 'firebase/firestore';
import { db } from '../../../firebase/clientApp';
import useLocalization from '../../../hooks/useLocalization';
import Badge from '../../UI/Badge';
import Button from '../../UI/Button';
import { HiClipboard, HiClipboardCheck } from 'react-icons/hi';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { useState } from 'react';

export default function Header() {
  const configRef = collection(db, 'config');
  const serverRef = doc(configRef, 'server');

  const [serverConfig] = useDocumentDataOnce(serverRef);
  const [copied, setCopied] = useState(false);

  const t = useLocalization();

  const handleClick = () => {
    setCopied(true);
    navigator.clipboard.writeText(serverConfig?.ip);
  };

  return (
    <section className="h-96 my-32 m-10">
      <div className="bg-background-400 h-full max-w-screen-lg mx-auto p-5 text-center">
        <Badge text="Server" className="mx-auto -translate-y-10">
          <img src="/assets/icons/rust2.svg" alt="" className="w-7" />
        </Badge>
        <h2 className="text-5xl">[EU] German Starter Server</h2>
        <button
          onClick={handleClick}
        >
          <p className="font-bebas mb-3 flex items-center text-sand-600 hover:text-sand-500 transition-all group text-lg">
            {serverConfig?.ip}
            {!copied ? (
              <HiClipboard className="fill-sand-600 group-hover:fill-sand-500 transition-all" />
            ) : (
              <HiClipboardCheck className="fill-green-600 group-hover:fill-green-500 transition-all" />
            )}
          </p>
        </button>
        <p>{t.serverDescription}</p>
      </div>
    </section>
  );
}
