import { Menu } from '@headlessui/react';

import { Option } from './MenuPopout';

interface MenuPopoutItemProps {
  option: Option;
}

export default function MenuPopoutItem({ option }: MenuPopoutItemProps) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={() => option.onClick()}
          className={`${
            active ? 'bg-background-400/40 text-sand-500' : ''
          } px-6 py-2`}
        >
          {option.labelCell}
        </button>
      )}
    </Menu.Item>
  );
}
