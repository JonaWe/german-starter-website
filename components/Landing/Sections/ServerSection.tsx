import useLocalization from '../../../hooks/useLocalization';
import Badge from '../../UI/Badge';
import { HiClipboard, HiClipboardCheck } from 'react-icons/hi';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useDocumentDataFromCollectionOnce from '../../../hooks/useDocumentDataFromCollectionOnce';

export default function Header() {
  const [copied, setCopied] = useState(false);

  const [serverConfig, loading, error] = useDocumentDataFromCollectionOnce(
    'config',
    'server'
  );

  const t = useLocalization();

  const serverIP =
    !loading && !error && serverConfig ? serverConfig.ip : '51.195.60.162:28015';

  const handleClick = () => {
    setCopied(true);
    navigator.clipboard.writeText(serverIP);

    setTimeout(() => {
        setCopied(false);
    }, 3000)
  };

  return (
    <section className="h-96 my-32 m-10">
      <div className="bg-background-400 h-full max-w-screen-lg mx-auto p-5 text-center">
        <Badge text="Server" className="mx-auto -translate-y-10">
          <img src="/assets/icons/rust2.svg" alt="" className="w-7" />
        </Badge>
        <h2 className="text-5xl">[EU] German Starter Server</h2>
        <AnimatePresence>
          <button onClick={handleClick}>
            <p className="font-bebas mb-3 flex items-center text-sand-600 hover:text-sand-500 transition-all group text-lg leading-none">
              {serverIP}
              {!copied ? (
                <motion.span
                  key={'copy'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <HiClipboard className="fill-sand-600 group-hover:fill-sand-500 transition-all translate-y-[-0.12rem]" />
                </motion.span>
              ) : (
                <motion.span
                  key={'copied'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <HiClipboardCheck className="fill-green-600 group-hover:fill-green-500 transition-all translate-y-[-0.12rem]" />
                </motion.span>
              )}
            </p>
          </button>
        </AnimatePresence>
        <p>{t.serverDescription}</p>
      </div>
    </section>
  );
}
