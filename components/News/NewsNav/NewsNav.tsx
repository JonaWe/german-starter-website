import { useState } from 'react';

import { useRouter } from 'next/router';

import { Timestamp } from 'firebase/firestore';
import { AnimateSharedLayout } from 'framer-motion';

import { checkIfSameDay } from '../../../lib/checkIfSameDay';
import { NewsItemSerialisiert } from '../../../pages/news';
import { NewsNavItem } from './NewsNavItem';

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
            const releasTime = checkIfSameDay(release.toDate())
              ? locale === 'en'
                ? 'Today'
                : 'Heute'
              : release.toDate().toLocaleDateString(locale, dateFormatOptions);

            const isActive = id === current;

            return (
              <NewsNavItem
                key={i}
                title={title}
                id={id}
                setCurrent={setCurrent}
                releaseDate={releasTime}
                isActive={isActive}
              />
            );
          })}
          <div className="h-full w-[2px] bg-background-400/30 absolute -left-3"></div>
        </ul>
      </AnimateSharedLayout>
    </nav>
  );
}
