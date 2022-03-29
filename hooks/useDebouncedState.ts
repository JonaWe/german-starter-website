import { useState } from 'react';

import useDebounce from './useDebounce';

export default function useDebounceState<T>(
  initial: T,
  delay: number
): [T, (title: T) => void] {
  const [value, setValue] = useState(initial);

  const debouncedValue = useDebounce(value, delay);

  return [debouncedValue, setValue];
}
