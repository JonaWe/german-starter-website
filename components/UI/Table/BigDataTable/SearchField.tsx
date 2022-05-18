import { HiSearch, HiX } from 'react-icons/hi';

import useLocalization from '../../../../hooks/useLocalization';

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchFiled({ value, onChange }: SearchFieldProps) {
  const t = useLocalization();

  return (
    <span className="relative">
      <input
        className="pl-10"
        placeholder={t.support.report.search}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <HiSearch className="absolute top-1/2 -translate-y-1/2 left-2 opacity-50 text-2xl" />
      {value.length !== 0 && (
        <button onClick={() => onChange('')}>
          <HiX className="absolute top-1/2 -translate-y-1/2 right-3 text-xl opacity-50 hover:opacity-60 transition-opacity" />
        </button>
      )}
    </span>
  );
}
