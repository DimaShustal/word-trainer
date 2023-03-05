import { StyledConfig } from 'styled-components';

export default function omitForwardedProps<PropType extends {}>(props: Array<keyof PropType>): StyledConfig<PropType> {
  return {
    shouldForwardProp: (prop, defPropValFN) => !props.includes(prop) && defPropValFN(prop),
  };
}
