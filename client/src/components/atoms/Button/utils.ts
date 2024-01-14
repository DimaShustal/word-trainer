import { ButtonVariants } from './Button.types';
import { IconButton, PrimaryButton, SecondaryButton, TextButton } from './Button.styles';

export const getComponent = (
  type: keyof ButtonVariants,
): typeof PrimaryButton | typeof IconButton | typeof TextButton => {
  switch (type) {
    case 'primary':
      return PrimaryButton;

    case 'secondary':
      return SecondaryButton;

    case 'icon':
      return IconButton;

    case 'text':
      return TextButton;

    default:
      return getComponent('primary');
  }
};
