import { Fragment } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { format, parseISO } from 'date-fns';
import { HiOutlineDotsVertical } from 'react-icons/hi';

import { classNames } from './Calendar';

export default function CalendarEvent({ meeting }: { meeting: any }) {
  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-sand-100 hover:bg-sand-100">
      <img
        src={meeting.imageUrl}
        alt=""
        className="flex-none w-10 h-10 rounded-full"
      />
      <div className="flex-auto">
        <p className="">{meeting.name}</p>
        <p className="mt-0.5">
          <time dateTime={meeting.startDatetime}>
            {format(meeting.startDatetime, 'h:mm a')}
          </time>{' '}
          -{' '}
          <time dateTime={meeting.endDatetime}>
            {format(meeting.endDatetime, 'h:mm a')}
          </time>
        </p>
      </div>
      <Menu
        as="div"
        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
      >
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-sand-500 hover:text-sand-600">
            <span className="sr-only">Open options</span>
            <HiOutlineDotsVertical className="w-6 h-6" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-sand-100 ' : 'text-sand-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Edit
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-sand-100 ' : 'text-sand-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Cancel
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  );
}
