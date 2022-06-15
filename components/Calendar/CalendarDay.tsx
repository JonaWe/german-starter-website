import {
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
} from 'date-fns';

import { CalendarEvent, classNames } from './Calendar';

const colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];

export default function CalendarDay({
  events,
  day,
  selectedDay,
  setSelectedDay,
  firstDayCurrentMonth,
  index,
}: {
  events: CalendarEvent[];
  day: Date;
  selectedDay: Date;
  firstDayCurrentMonth: Date;
  setSelectedDay: (day: Date) => void;
  index: number;
}) {
  const isNotSameMonth =
    !isEqual(day, selectedDay) &&
    !isToday(day) &&
    !isSameMonth(day, firstDayCurrentMonth);

  const dayHasEvents = events.some((wipesOfMonth) =>
    isSameDay(wipesOfMonth.startDatetime, day)
  );

  const dayIsWipe = events.some(
    (eventOfMonth) =>
      isSameDay(eventOfMonth.startDatetime, day) && eventOfMonth.type === 'wipe'
  );

  const notSelectedSameDay = !isEqual(day, selectedDay) && isToday(day);

  const selectedToday = isEqual(day, selectedDay) && isToday(day);

  return (
    <div
      key={day.toString()}
      className={classNames(
        index === 0 && colStartClasses[getDay(day)],
        'py-1'
      )}
    >
      <button
        type="button"
        disabled={isNotSameMonth}
        onClick={() => setSelectedDay(day)}
        className={classNames(
          isEqual(day, selectedDay) && 'text-white',
          !isEqual(day, selectedDay) && isToday(day) && 'text-rust-500',

          selectedToday && 'bg-rust-500',
          isEqual(day, selectedDay) && !isToday(day) && 'bg-background-150/70',
          !isEqual(day, selectedDay) &&
            'hover:bg-background-150/80 disabled:hover:bg-transparent',
          'mx-auto flex h-8 w-8 items-center justify-center rounded-md',
          dayIsWipe && 'border-yellow-500 border-2 bg-yellow-500/20',
          dayHasEvents &&
            !dayIsWipe &&
            'border-blue-600 border-2 bg-blue-600/20'
        )}
      >
        <time
          dateTime={format(day, 'yyyy-MM-dd')}
          className={classNames(
            isNotSameMonth && 'text-sand-500/30',
            notSelectedSameDay && 'text-rust-500'
          )}
        >
          {format(day, 'd')}
        </time>
      </button>
    </div>
  );
}
