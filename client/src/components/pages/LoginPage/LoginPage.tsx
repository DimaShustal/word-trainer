import { ChangeEvent, useState } from 'react';
import * as yup from 'yup';
import { observer } from 'mobx-react-lite';
import { useAppContext } from '../../../contexts/AppContext';
import { Navigate } from 'react-router-dom';
import { ROOT_PATH } from '../../../constants/path';
import { Container } from './LoginPage.style';
import TextField from '../../atoms/TextField/TextField';
import Button from '../../atoms/Button';
import normalizeYupError from '../../../functions/normalizeYupError';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(6, 'Минимум 6 символов')
    .matches(/^[A-Za-z\d.,@$!%*?&=\-+_]+$/i, 'Используйте только латинские буквы, цифры и спецсимволы (.,@$!%*?&=-+_)'),
  password: yup
    .string()
    .min(6, 'Минимум 6 символов')
    .matches(/^[A-Za-z\d.,@$!%*?&=\-+_]+$/i, 'Используйте только латинские буквы, цифры и спецсимволы (.,@$!%*?&=-+_)')
    .matches(/^(?=.*[a-z])/, 'Минимум 1 строчная буква')
    .matches(/^(?=.*[A-Z])/, 'Минимум 1 заглавная буква')
    .matches(/^(?=.*\d)/, 'Минимум 1 цифра'),
});

function LoginPage() {
  const { store } = useAppContext();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'name') {
      setName(e.target.value);
      return;
    }

    if (e.target.name === 'password') {
      setPassword(e.target.value);
      return;
    }
  };

  const authHandler = async (callback: (name: string, password: string) => Promise<boolean>) => {
    try {
      setNameError('');
      setPasswordError('');

      await validationSchema.validate({ name, password }, { abortEarly: false });
      await callback(name, password);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = normalizeYupError(error);

        if (yupErrors?.name) setNameError(yupErrors.name[0]);
        if (yupErrors?.password) setPasswordError(yupErrors.password[0]);
      } else {
        console.error('LoginPage.authHandler', error);
      }
    }
  };

  const loginHandler = () => {
    authHandler(store.user.login);
  };

  const createUserHandler = () => {
    authHandler(store.user.createUser);
  };

  if (store.user.isLogged) {
    return <Navigate to={ROOT_PATH} replace={true} />;
  }

  return (
    <Container>
      <TextField
        label="Name"
        type="name"
        name="name"
        placeholder="Name"
        value={name}
        onChange={inputHandler}
        error={nameError}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={inputHandler}
        error={passwordError}
      />
      <Button size="small" fullWidth onClick={loginHandler}>
        Войти
      </Button>
      <Button size="small" fullWidth onClick={createUserHandler}>
        Создать
      </Button>
    </Container>
  );
}

export default observer(LoginPage);
