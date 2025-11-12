import { useState, useEffect } from 'react';

function getStorageValue(key, initialValue) {
  const saved = localStorage.getItem(key);
  try {
    const initial = saved ? JSON.parse(saved) : initialValue;
    return initial;
  } catch (e) {
    return initialValue;
  }
}

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};