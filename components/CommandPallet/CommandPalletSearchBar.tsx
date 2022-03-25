import { HiOutlineSearch } from 'react-icons/hi';
import { Combobox } from '@headlessui/react';
import useLocalization from '../../hooks/useLocalization';

interface CommandPalletSearchBarProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function CommandPalletSearchBar({
  setSearchQuery,
}: CommandPalletSearchBarProps) {
  const t = useLocalization();
  return (
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
  );
}
