import { HiClipboard, HiClipboardCheck } from 'react-icons/hi';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface CopyBtnProps {
  text: string;
}

export default function CopyButton({ text }: CopyBtnProps) {
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
      <button onClick={handleClick}>
        <p className="font-bebas mb-3 flex items-center text-sand-600 hover:text-sand-500 transition-all group text-lg leading-none">
          {text}
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
  );
}
