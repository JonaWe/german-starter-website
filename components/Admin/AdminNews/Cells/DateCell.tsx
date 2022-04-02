import { useRouter } from 'next/router';

import { Timestamp } from '@firebase/firestore';

import { checkIfSameDay } from '../../../../lib/checkIfSameDay';

interface DateCellProps {
  value: Timestamp;
}

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export default function DateCell({ value: timestamp }: DateCellProps) {
  const { locale } = useRouter();
  return (
    <span>
      {checkIfSameDay(timestamp.toDate())
        ? locale === 'en'
          ? 'Today'
          : 'Heute'
        : timestamp.toDate().toLocaleDateString(locale, dateFormatOptions)}
    </span>
  );
}
