import { useContext, createContext } from "react";
import { INote } from "../../types";

export type globalContextType = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  authUser: {
    email: string;
    id: string;
  };
  setAuthUser: (value: any) => void;
  error: string;
  setError: (value: string) => void;
};

export const AppContext = createContext<globalContextType>({
  isAuthenticated: false,
  setAuthenticated: () => { },
  authUser: {
    email: "",
    id: "",
  },
  setAuthUser: () => { },
  error: "",
  setError: () => { },
});

export function useAppContext() {
  return useContext(AppContext);
}
