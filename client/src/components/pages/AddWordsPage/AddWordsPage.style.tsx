import styled from 'styled-components';
import Stack from '../../atoms/Stack';

export const Container = styled(Stack).attrs({
  gap: 20,
})`
  flex-wrap: wrap;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;
