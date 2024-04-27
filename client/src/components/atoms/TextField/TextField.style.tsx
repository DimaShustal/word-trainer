import styled from 'styled-components';
import { pixelsToRems } from '../../../functions/pixelsToRems';
import { getColor } from '../../../functions/colors';

interface InputProps {
  $hasError: boolean;
}

export const Input = styled.input<InputProps>`
  all: unset;
  box-sizing: inherit;
  width: 100%;
  height: ${pixelsToRems(40)};
  padding: 0 ${pixelsToRems(10)};
  background: transparent;
  border: 1px solid ${getColor('primary2')};
  color: ${getColor('primary2')};
  -webkit-text-fill-color: ${getColor('primary2')};
  font-weight: 400;
  font-size: ${pixelsToRems(14)};

  ${({ $hasError }) => {
    if ($hasError) {
      return `
        border-color: ${getColor('tertiary4')};
      `;
    }
  }}

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
`;
