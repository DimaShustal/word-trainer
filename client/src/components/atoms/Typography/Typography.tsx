import { useMemo, forwardRef } from 'react';
import { StyledComponent } from 'styled-components';
import { TTypographyVariant, TypographyProps, TypographyRootProps } from './Typography.types';
import { H1, H2, H3, H4, H5, H6, ParagraphLarge, ParagraphMedium, ParagraphSmall } from './Typography.styles';

const getComponent = (variant: TTypographyVariant): StyledComponent<any, any, TypographyRootProps> => {
  switch (variant) {
    case 'h1':
      return H1;

    case 'h2':
      return H2;

    case 'h3':
      return H3;

    case 'h4':
      return H4;

    case 'h5':
      return H5;

    case 'h6':
      return H6;

    case 'paragraphLarge':
      return ParagraphLarge;

    case 'paragraphMedium':
      return ParagraphMedium;

    case 'paragraphSmall':
      return ParagraphSmall;

    default:
      return getComponent('paragraphLarge');
  }
};

const Typography = forwardRef<any, TypographyProps>(
  (
    {
      children,
      align = 'inherit',
      fontWeight,
      textTransform,
      textDecoration,
      bMargin = 0,
      lMargin = 0,
      rMargin = 0,
      tMargin = 0,
      noWrap = false,
      variant = 'paragraphLarge',
      color = 'currentColor',
      component,
      ...props
    },
    ref,
  ) => {
    const Component = useMemo(() => getComponent(variant), [variant]);

    return (
      <Component
        align={align}
        fontWeight={fontWeight}
        textTransform={textTransform}
        textDecoration={textDecoration}
        bMargin={bMargin}
        lMargin={lMargin}
        rMargin={rMargin}
        tMargin={tMargin}
        noWrap={noWrap}
        variant={variant}
        color={color}
        as={component}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

export default Typography;
