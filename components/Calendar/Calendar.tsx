import { Fragment, useState } from 'react';

import { Menu, Transition } from '@headlessui/react';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  setDay,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from 'date-fns';
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineDotsVertical,
} from 'react-icons/hi';

import CalendarDay from './CalendarDay';
import CalendarDayHeader from './CalendarDayHeader';
import CalendarEvent from './CalendarEvent';

export interface CalendarEvent {
  name: string;
  type: 'event' | 'wipe';
  description?: string;
  startDatetime: Date;
  endDatetime: Date;
}

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Calendar({ events }: { events: CalendarEvent[] }) {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  const previousMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  };

  const nextMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  };

  //Move out of the component \/
  const saturday = 4;
  const startOfCurrentMonth = startOfMonth(firstDayCurrentMonth);
  const wipesOfMonth = [
    {
      startDatetime: setDay(startOfCurrentMonth, saturday, {
        weekStartsOn: getDay(startOfCurrentMonth),
      }),
      type: 'wipe',
      name: 'Mr Wiper',
      endDatetime: new Date('2022-06-20T09:00'),
    },
  ] as CalendarEvent[];
  //Move out of the component /\

  const eventsWithWipes = [...events, ...wipesOfMonth];

  const selectedDayEvents = eventsWithWipes.filter((event) =>
    isSameDay(event.startDatetime, selectedDay)
  );

  return (
    <div className="md:grid md:grid-cols-2 md:divide-x-4 md:divide-background-150">
      <div className="md:pr-14">
        <div className="flex items-center">
          <h3 className="flex-auto text-2xl">
            {format(firstDayCurrentMonth, 'MMMM yyyy')}
          </h3>
          <button
            type="button"
            onClick={previousMonth}
            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-sand-400 hover:text-sand-500"
          >
            <span className="sr-only">Previous month</span>
            <HiChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            onClick={nextMonth}
            type="button"
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-sand-400 hover:text-sand-500"
          >
            <span className="sr-only">Next month</span>
            <HiChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        <CalendarDayHeader />
        <div className="grid grid-cols-7 mt-2 text-sm">
          {days.map((day, dayIdx) => (
            <CalendarDay
              events={eventsWithWipes}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              day={day}
              firstDayCurrentMonth={firstDayCurrentMonth}
              index={dayIdx}
            />
          ))}
        </div>
      </div>
      <section className="mt-12 md:mt-0 md:pl-14">
        <h3 className="text-2xl">
          Events for{' '}
          <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
            {format(selectedDay, 'MMM dd, yyy')}
          </time>
        </h3>
        <ol className="mt-4 space-y-1 text-sm leading-6 text-sand-500">
          {selectedDayEvents.length > 0 ? (
            selectedDayEvents.map((meeting) => (
              <CalendarEvent meeting={meeting} key={meeting.name} />
            ))
          ) : (
            <p>No meetings for today.</p>
          )}
        </ol>
      </section>
    </div>
  );
}
