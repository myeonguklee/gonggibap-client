import { useState, useEffect } from 'react';

export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedInput, setDebouncedInput] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedInput;
};
