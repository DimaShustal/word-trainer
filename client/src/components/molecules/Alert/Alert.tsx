import { QueueAlert } from '../../../types/Alert';
import { AlertContainer } from './Alert.style';
import Typography from '../../atoms/Typography';
import { CloseOutlined } from '@ant-design/icons';
import { useAppContext } from '../../../contexts/AppContext';
import { observer } from 'mobx-react-lite';

interface AlertProps {
  alert: QueueAlert;
}

function Alert({ alert }: AlertProps) {
  const { store } = useAppContext();

  return (
    <AlertContainer
      $isError={alert.type === 'error'}
      $isInfo={alert.type === 'info'}
      $isSuccess={alert.type === 'success'}
    >
      <Typography variant="paragraphMedium">{alert.message}</Typography>
      <CloseOutlined role="button" onClick={() => store.alerts.closeAlert(alert.id)} />
    </AlertContainer>
  );
}

export default observer(Alert);
