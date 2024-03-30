import { observer } from 'mobx-react-lite';
import { useAppContext } from '../../../contexts/AppContext';
import Typography from '../../atoms/Typography';

function RootPage() {
  const { store } = useAppContext();

  return (
    <>
      <Typography variant="h5" bMargin={20}>
        Добро пожаловать в лчушее приложение для изучения иностранных фраз!
      </Typography>
      <Typography variant="paragraphLarge" bMargin={10}>
        Тут должен быть мотивационный текс и 100500 причин почему мы лучшие, но пока так.
      </Typography>
      <Typography variant="paragraphLarge">
        В общем {store.user.isLogged ? 'фразы сами себя не выучат' : 'кнопка "Войти" себя не нажмет'}, начинай.
      </Typography>
    </>
  );
}

export default observer(RootPage);
