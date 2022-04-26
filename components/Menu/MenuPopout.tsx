import { Menu, Transition } from '@headlessui/react';

import MenuPopoutItem from './MenuPopoutItem';

interface MenuPopoutItemProps {
  options: Option[];
}

export interface Option {
  onClick: () => void;
  labelCell: React.ReactNode;
  tooltip?: string;
}

export default function MenuPopout({ options }: MenuPopoutItemProps) {
  return (
    <div className="bg-background-800/95 mt-2 flex flex-col">
      {options.map((option) => {
        return <MenuPopoutItem option={option} />;
      })}
    </div>
  );
}
