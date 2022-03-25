import { Combobox } from '@headlessui/react';

import useLocalization from '../../hooks/useLocalization';
import { NavigationItem } from '../Navbar/NavItems';

interface CommandPalletOptionProps {
  item: NavigationItem;
}

export default function CommandPalletOption({
  item,
}: CommandPalletOptionProps) {
  const t = useLocalization();
  return (
    <Combobox.Option value={item.href} key={item.id}>
      {({ active }) => (
        <div className={`space-x-1 px-4 py-2 ${active ? 'bg-rust-500' : ''}`}>
          <span
            className={`font-medium ${
              active ? 'text-rust-100' : 'text-sand-500'
            }`}
          >
            {t.navigation[item.id]}
          </span>{' '}
          <span className={`${active ? 'text-rust-200' : 'text-sand-700 '}`}>
            {item.href}
          </span>
        </div>
      )}
    </Combobox.Option>
  );
}
