import { useContext, createContext } from "react";

export type globalContextType = {
  isAuthenticated: boolean
  setAuthenticated: (value: boolean) => void
}

export const AppContext = createContext<globalContextType>({
  isAuthenticated: false,
  setAuthenticated: () => {}
});

export function useAppContext() {
  return useContext(AppContext);
}
