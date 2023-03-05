import React from 'react';
import { StackProps } from './Stack.types';
import { StackContainer } from './Stack.styles';

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      children,
      direction = 'row',
      gap = 0,
      alignItems = 'center',
      justifyContent = 'center',
      component,
      fullWidth = false,
      ...props
    },
    ref,
  ) => {
    return (
      <StackContainer
        {...props}
        direction={direction}
        gap={gap}
        alignItems={alignItems}
        justifyContent={justifyContent}
        as={component}
        fullWidth={fullWidth}
        ref={ref}
      >
        {children}
      </StackContainer>
    );
  },
);

export default Stack;
