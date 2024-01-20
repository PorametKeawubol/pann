import { useEffect, useState } from "react";

function useLocalState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    try {
      const localStorageValue = localStorage.getItem(key);
      return localStorageValue !== null ? JSON.parse(localStorageValue) : defaultValue;
    } catch (error) {
      console.error(`Error parsing localStorage value for key ${key}:`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export { useLocalState };