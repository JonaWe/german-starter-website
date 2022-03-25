import { Dialog, Combobox, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import useLocalization from '../../hooks/useLocalization';
import { navigationItems } from '../Navbar/NavItems';

export default function CommandPallet() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const t = useLocalization();

  const filteredNavigationItems = searchQuery
    ? navigationItems.filter((item) => {
        return (
          t.navigation[item.id]
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.href.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    : navigationItems;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'm' && (event.ctrlKey || event.metaKey)) {
        setIsOpen((value) => !value);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <Transition.Root
      show={isOpen}
      as={React.Fragment}
      afterLeave={() => {
        setSearchQuery('');
      }}
    >
      <Dialog
        onClose={() => {
          setIsOpen(false);
        }}
        className="fixed inset-0 z-[100] p-8 pt-[20vh]"
      >
        <Transition.Child
          enter="duration-200 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-background-500/80" />
        </Transition.Child>
        <Transition.Child
          enter="duration-200 ease-out"
          enterFrom="opacity-0 lg:translate-y-4 lg:scale-100 scale-95"
          enterTo="opacity-100 translate-y-0 scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 -translate-y-0 scale-100"
          leaveTo="opacity-0 lg:-translate-y-4 lg:scale-100 scale-95"
        >
          <Combobox
            onChange={(value) => {
              router.push(value);
              setIsOpen(false);
            }}
            value={searchQuery}
            as="div"
            className="relative mx-auto max-w-xl divide-y divide-background-400 bg-background-500 shadow-2xl ring-1 ring-black/5 transition-all duration-[400ms] 2xl:max-w-3xl"
          >
            <div className="flex items-center gap-3 px-4 py-3">
              <HiOutlineSearch className="h-5 w-5" />
              <Combobox.Input
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                }}
                className="w-full border-0 bg-transparent text-sand-500 placeholder-sand-700 focus:outline-none"
                placeholder={t.commandPallet.searchPlaceholder}
              />
            </div>
            <div className="py-2">
              {filteredNavigationItems.length === 0 && (
                <div className="px-4 py-2">
                  <p className="text-sm text-sand-700">
                    {t.commandPallet.noResults}
                    <span className="font-bold text-sand-700">
                      {searchQuery}
                    </span>
                  </p>
                </div>
              )}
              {filteredNavigationItems.length > 0 && (
                <Combobox.Options
                  static
                  className="h-fit max-h-[30vh] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-background-300 scrollbar-track-background-500 hover:scrollbar-thumb-background-200"
                >
                  {filteredNavigationItems.map((item) => (
                    <Combobox.Option value={item.href} key={item.id}>
                      {({ active }) => (
                        <div
                          className={`space-x-1 px-4 py-2 ${
                            active ? 'bg-rust-500' : ''
                          }`}
                        >
                          <span
                            className={`font-medium ${
                              active ? 'text-rust-100' : 'text-sand-500'
                            }`}
                          >
                            {t.navigation[item.id]}
                          </span>{' '}
                          <span
                            className={`${
                              active ? 'text-rust-200' : 'text-sand-700 '
                            }`}
                          >
                            {item.href}
                          </span>
                        </div>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
