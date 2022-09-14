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
  noteList: INote[],
  setNoteList: (value: INote[]) => void
};

export const AppContext = createContext<globalContextType>({
  isAuthenticated: false,
  setAuthenticated: () => { },
  authUser: {
    email: "",
    id: "",
  },
  setAuthUser: () => { },
  noteList: [],
  setNoteList: () => { }
});

export function useAppContext() {
  return useContext(AppContext);
}
