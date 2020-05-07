import {
  useState, useEffect, Dispatch, SetStateAction,
} from 'react';

type persistedState<T> = [T, Dispatch<SetStateAction<T>>]

export default function usePersistedState<T>(key: string, defaultValue: T) : persistedState<T> {
  const [state, setState] = useState<T>(() => {
    const localValue = localStorage.getItem(key);
    if (localValue) { return JSON.parse(localValue); }
    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
