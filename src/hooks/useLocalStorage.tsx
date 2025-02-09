import { useState } from 'react';

function useLocalStorage(key: string, initialValue: string = '') {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? stored : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return initialValue;
    }
  });

  const setStoredValue = (newValue: string) => {
    try {
      localStorage.setItem(key, newValue);
      setValue(newValue);
    } catch (error) {
      console.error('Error setting to localStorage', error);
    }
  };

  return [value, setStoredValue] as const;
}

export default useLocalStorage;
