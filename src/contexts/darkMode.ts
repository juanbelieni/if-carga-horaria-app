import { createContext, Dispatch } from 'react';

interface DarkModeContextData {
  darkMode: boolean,
  setDarkMode: Dispatch<any>,
}

const DarkModeContext = createContext<DarkModeContextData>({} as DarkModeContextData);

export default DarkModeContext;
