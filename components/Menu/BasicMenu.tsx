import { Menu, Transition } from '@headlessui/react';
import { HiTrash } from 'react-icons/hi';

import useLocalization from '../../hooks/useLocalization';
import MenuPopout, { Option } from './MenuPopout';

interface BasicMenuProps {
  children: React.ReactNode;
  options: Option[];
}

export default function BasicMenu({ children, options}: BasicMenuProps) {
  return (
    <Menu className="relative" as="div">
      <Menu.Button className="flex items-center gap-1">{children}</Menu.Button>
      <Transition
        enter="transition ease-out duration-175"
        enterFrom="opacity-0 -translate-y-3"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-3"
      >
        <Menu.Items className="absolute z-10 right-0" as="div">
          <MenuPopout options={options} />
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
