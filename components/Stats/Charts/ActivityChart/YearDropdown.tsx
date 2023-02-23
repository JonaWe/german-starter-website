import { useState } from 'react';

export default function YearDropdown({
  onChange,
  year,
}: {
  onChange: (year: number) => void;
  year: number;
}) {
  const currentYear = new Date().getFullYear();

  const [years, setYears] = useState();

  const range = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );

  return (
    <select
      className="bg-background-150 h-fit p-2"
      value={year}
      onChange={(e) => {
        onChange(Number(e.target.value));
      }}
    >
      {range(2021, currentYear, 1).map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}
