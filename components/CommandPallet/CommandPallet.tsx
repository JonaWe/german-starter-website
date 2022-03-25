import { Dialog, Combobox, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useKeyboardShortcut from '../../hooks/useKeyboardShortcut';
import useLocalization from '../../hooks/useLocalization';
import { navigationItems } from '../Navbar/NavItems';
import CommandPalletOptions from './CommandPalletOptions';
import CommandPalletOverlay from './CommandPalletOverlay';
import CommandPalletSearchBar from './CommandPalletSearchBar';

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

  useKeyboardShortcut('m', () => setIsOpen((value) => !value), {
    forceCtrl: true,
  });

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
        <CommandPalletOverlay />
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
            <CommandPalletSearchBar setSearchQuery={setSearchQuery} />
            <CommandPalletOptions
              filteredNavigationItems={filteredNavigationItems}
              searchQuery={searchQuery}
            />
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
