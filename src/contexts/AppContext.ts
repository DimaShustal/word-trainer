import { createContext, useContext } from 'react';
import { IAppContext } from '../types/AppContext';

const AppContext = createContext<null | IAppContext>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context as IAppContext;
};

export default AppContext;
