import { useState, useEffect } from 'react';

// Returns `value` only after it stops changing for `delay` ms.
export default function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // cleanup on change/unmount
  }, [value, delay]);
  return debounced;
}
