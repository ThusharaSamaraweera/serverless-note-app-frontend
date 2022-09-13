import { useContext, createContext } from "react";

export type globalContextType = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  authUser: {
    email: string;
    id: string;
    token: string;
  };
  setAuthUser: (value: any) => void;
};

export const AppContext = createContext<globalContextType>({
  isAuthenticated: false,
  setAuthenticated: () => { },
  authUser: {
    email: "",
    id: "",
    token: "",
  },
  setAuthUser: () => { },
});

export function useAppContext() {
  return useContext(AppContext);
}
