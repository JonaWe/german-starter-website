import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Timestamp } from 'firebase/firestore';
import { AnimateSharedLayout, motion } from 'framer-motion';

import { checkIfSameDay } from '../../../lib/checkIfSameDay';
import { NewsItemSerialisiert } from '../../../pages/news';

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export default function NewsNav({
  newsItems,
}: {
  newsItems: NewsItemSerialisiert[];
}) {
  const [current, setCurrent] = useState(newsItems[0].id);
  const { locale } = useRouter();
  return (
    <nav className="fixed hidden sm:block">
      <AnimateSharedLayout>
        <ul className="flex relative gap-5 flex-col">
          {newsItems.map(({ en, de, releaseDate, id }, i) => {
            const { title, content } = locale === 'de' ? de : en;
            const { seconds, nanoseconds } = JSON.parse(releaseDate);
            const release = new Timestamp(seconds, nanoseconds);
            const isActive = id === current;
            return (
              <li key={i} className="relative h-10">
                {isActive && (
                  <motion.div
                    className="h-full w-[2px] bg-rust-500 z-10 absolute -left-3"
                    layoutId="underline"
                  />
                )}
                <Link href={`/news#${id}`}>
                  <a onClick={() => setCurrent(id)} className="">
                    <h4
                      className={`group-hover:text-sand-500 transition-colors text-2xl leading-none`}
                    >
                      {title}
                    </h4>
                    <p className="text-xs text-sand-500/60">
                      {checkIfSameDay(release.toDate())
                        ? locale === 'en'
                          ? 'Today'
                          : 'Heute'
                        : release
                            .toDate()
                            .toLocaleDateString(locale, dateFormatOptions)}
                    </p>
                  </a>
                </Link>
              </li>
            );
          })}
          <div className="h-full w-[2px] bg-background-400/30 absolute -left-3"></div>
        </ul>
      </AnimateSharedLayout>
    </nav>
  );
}
