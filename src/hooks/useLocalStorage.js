import { useCallback, useState } from "react";

const resolveInitialValue = (initialValue) =>
  initialValue instanceof Function ? initialValue() : initialValue;

export default function useLocalStorage(key, initialValue) {
  const readValue = useCallback(() => {
    if (typeof window === "undefined") {
      return resolveInitialValue(initialValue);
    }

    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        return resolveInitialValue(initialValue);
      }
      return JSON.parse(item);
    } catch {
      return resolveInitialValue(initialValue);
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState(readValue);

  const setValue = useCallback(
    (value) => {
      setStoredValue((previousValue) => {
        const valueToStore =
          value instanceof Function ? value(previousValue) : value;

        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch {
          // Swallow localStorage write errors (private mode / quota exceeded).
        }

        return valueToStore;
      });
    },
    [key],
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore cleanup errors.
    }
    setStoredValue(resolveInitialValue(initialValue));
  }, [initialValue, key]);

  return [storedValue, setValue, removeValue];
}
