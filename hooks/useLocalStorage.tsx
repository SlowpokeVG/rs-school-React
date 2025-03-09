import { useState, useEffect } from 'react';

function useLocalStorage(key: string, initialValue: string = '') {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          setValue(stored);
        } else {
          setValue(initialValue);
        }
      } catch (error) {
        console.error('Error reading from localStorage', error);
        setValue(initialValue);
      }
    }
  }, [key, initialValue]);

  const setStoredValue = (newValue: string) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, newValue);
        setValue(newValue);
      } catch (error) {
        console.error('Error setting to localStorage', error);
      }
    }
  };

  return [value, setStoredValue] as const;
}

export default useLocalStorage;
