import { observer } from 'mobx-react-lite';
import { useAppContext } from '../../../contexts/AppContext';
import Alert from '../../molecules/Alert/Alert';
import { AlertsContainer } from './AlertsPortal.style';

// TODO change alert order, new alerts should be on top
function AlertsPortal() {
  const { store } = useAppContext();

  return (
    <AlertsContainer>
      {store.alerts.stack.map(alert => (
        <Alert key={alert.id} alert={alert} />
      ))}
    </AlertsContainer>
  );
}

export default observer(AlertsPortal);
