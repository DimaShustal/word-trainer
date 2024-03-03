import { Navigate } from 'react-router-dom';
import { ROOT_PATH } from '../../../constants/path';
import { useAppContext } from '../../../contexts/AppContext';
import { observer } from 'mobx-react-lite';

function AuthorizedRoute({ children }) {
  const { store } = useAppContext();

  if (!store.user.isLogged) return <Navigate to={ROOT_PATH} replace={true} />;
  return children;
}

export default observer(AuthorizedRoute);
