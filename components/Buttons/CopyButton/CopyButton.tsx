import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { HiClipboard, HiClipboardCheck } from 'react-icons/hi';

interface CopyBtnProps {
  text: string;
  title?: string;
}

export default function CopyButton({ text, title }: CopyBtnProps) {
  const [copied, setCopied] = useState(false);
  const handleClick = () => {
    setCopied(true);
    navigator.clipboard.writeText(text);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      <button onClick={handleClick} title={title}>
        <p className="group flex items-center font-bebas text-lg leading-none text-sand-600 transition-all hover:text-sand-500">
          {text}
          {!copied ? (
            <motion.span
              key={'copy'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HiClipboard className="translate-y-[-0.12rem] fill-sand-600 transition-all group-hover:fill-sand-500" />
            </motion.span>
          ) : (
            <motion.span
              key={'copied'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HiClipboardCheck className="translate-y-[-0.12rem] fill-green-600 transition-all group-hover:fill-green-500" />
            </motion.span>
          )}
        </p>
      </button>
    </AnimatePresence>
  );
}
