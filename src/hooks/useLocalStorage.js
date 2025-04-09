import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  // 初期値の取得
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Local storage error:', error);
      return initialValue;
    }
  });

  // 値の更新時にローカルストレージも更新
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Local storage error:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
