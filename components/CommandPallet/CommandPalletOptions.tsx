import { Combobox } from '@headlessui/react';

import useLocalization from '../../hooks/useLocalization';
import { NavigationItem } from '../Navbar/NavItems';
import CommandPalletOption from './CommandPalletOption';

interface CommandPalletOptionsProps {
  filteredNavigationItems: NavigationItem[];
  searchQuery: string;
}

export default function CommandPalletOptions({
  filteredNavigationItems,
  searchQuery,
}: CommandPalletOptionsProps) {
  const t = useLocalization();
  return (
    <div className="py-2">
      {filteredNavigationItems.length === 0 && (
        <div className="px-4 py-2">
          <p className="text-sm text-sand-700">
            {t.commandPallet.noResults}
            <span className="font-bold text-sand-700">{searchQuery}</span>
          </p>
        </div>
      )}
      {filteredNavigationItems.length > 0 && (
        <Combobox.Options
          static
          className="h-fit max-h-[30vh] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-background-300 scrollbar-track-background-500 hover:scrollbar-thumb-background-200"
        >
          {filteredNavigationItems.map((item) => (
            <CommandPalletOption item={item} key={item.id} />
          ))}
        </Combobox.Options>
      )}
    </div>
  );
}
