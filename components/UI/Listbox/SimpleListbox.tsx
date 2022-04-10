import { Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi';

interface DropdownProps {
  options: { name: string; id: string }[];
  selected: { name: string; id: string };
  setSelected: any;
}

export default function SimpleListbox({
  options,
  selected,
  setSelected,
}: DropdownProps) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full py-3 pl-3 pr-10 text-left bg-background-150 shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 sm:text-sm">
          <span className="block truncate font-sans">{selected.name}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <HiChevronDown className="text-lg" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-background-150 shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm scrollbar-thin scrollbar-thumb-bg-background-200/20">
            {options.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `cursor-default select-none relative py-2 pl-10 pr-4 ${
                    active
                      ? 'text-rust-900 bg-background-200/30'
                      : 'text-rust-900'
                  }`
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {person.name}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
