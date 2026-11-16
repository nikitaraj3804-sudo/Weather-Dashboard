import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const SettingsContext = createContext();

// Context shares unit + theme with any component (no prop drilling).
export function SettingsProvider({ children }) {
  const [unit, setUnit] = useLocalStorage('wd-unit', 'C');
  const [dark, setDark] = useLocalStorage('wd-dark', false);
  return (
    <SettingsContext.Provider value={{ unit, setUnit, dark, setDark }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
