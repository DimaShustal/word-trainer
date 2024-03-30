import { createContext, FC, ReactNode, useContext, useMemo, useRef } from 'react';
import { IAppContext } from '../types/AppContext';
import AppStore from '../stores/AppStore';

const AppContext = createContext<null | IAppContext>(null);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
  const store = useRef(new AppStore());

  const value = useMemo(
    () => ({
      store: store.current,
    }),
    [],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context as IAppContext;
};
