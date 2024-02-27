import { ChangeEvent, useId } from 'react';
import Typography from '../Typography';
import Stack from '../Stack';
import { Input } from './TextField.style';

type TextFieldProps = {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function TextField({ label, error, ...rest }: TextFieldProps) {
  const id = useId();

  return (
    <Stack fullWidth direction="column" alignItems="flex-start">
      {label && (
        <Typography variant="paragraphMedium" as="label" htmlFor={id} bMargin={5}>
          {label}
        </Typography>
      )}
      <Input id={id} $hasError={!!error} {...rest} />
      {error && (
        <Typography variant="paragraphSmall" color="tertiary4">
          {error}
        </Typography>
      )}
    </Stack>
  );
}

export default TextField;
