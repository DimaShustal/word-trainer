import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({
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

export default loginValidationSchema;
