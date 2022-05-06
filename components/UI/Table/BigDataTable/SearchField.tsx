import { HiX } from 'react-icons/hi';

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
        placeholder={t.support.report.search}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value.length !== 0 && (
        <button onClick={() => onChange('')}>
          <HiX className="absolute top-1/2 -translate-y-1/2 right-3 text-xl opacity-50 hover:opacity-60 transition-opacity" />
        </button>
      )}
    </span>
  );
}
