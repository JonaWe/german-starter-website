import { useState } from 'react';

import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

import { Tab } from '../../../interfaces/Tab';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

interface TabProps {
  tabs: Tab[];
}
export default function Tabs({ tabs }: TabProps) {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  // const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="w-full h-full overflow-hidden relative">
      <AnimateSharedLayout>
        <ul className="flex relative gap-5">
          {tabs.map(({ title }, i) => {
            const isActive = i === page;
            return (
              <li
                key={i}
                className={`${
                  isActive ? 'text-white' : ''
                } w-fit cursor-pointer group`}
                onClick={() => {
                  setPage([i, i - page]);
                }}
              >
                <h4
                  className={`font-sans group-hover:text-sand-500 transition-colors ${
                    isActive ? 'text-sand-500' : 'text-sand-500/40 '
                  }`}
                >
                  {title}
                </h4>
                {isActive && (
                  <motion.div
                    className="w-full h-[2px] bg-rust-500 relative z-10"
                    layoutId="underline"
                  />
                )}
              </li>
            );
          })}
          <div className="w-full h-[2px] bg-background-400/30 absolute bottom-0"></div>
        </ul>
        <AnimatePresence initial={false} custom={direction}>
          <motion.section
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className={`w-full absolute`}
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30, duration: 2 },
              opacity: { duration: 0.2 },
            }}
          >
            {tabs[page].body}
          </motion.section>
        </AnimatePresence>
      </AnimateSharedLayout>
    </div>
  );
}
