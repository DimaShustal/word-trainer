import styled, { css } from 'styled-components';
import { TypographyRootProps } from './Typography.types';
import { getColor } from '../../../functions/colors';
import omitForwardedProps from '../../../functions/omitForwardedProps';
import { pixelsToRems } from '../../../functions/pixelsToRems';

const omittedProps: Array<keyof TypographyRootProps> = [
  'align',
  'fontWeight',
  'textTransform',
  'textDecoration',
  'bMargin',
  'lMargin',
  'rMargin',
  'noWrap',
  'variant',
  'color',
  'lineThrough',
];

const commonStyle = css<TypographyRootProps>`
  text-align: ${({ align }) => align || 'left'};
  margin-bottom: ${({ bMargin }) => (bMargin ? pixelsToRems(bMargin) : 0)};
  margin-left: ${({ lMargin }) => (lMargin ? pixelsToRems(lMargin) : 0)};
  margin-right: ${({ rMargin }) => (rMargin ? pixelsToRems(rMargin) : 0)};
  margin-top: ${({ tMargin }) => (tMargin ? pixelsToRems(tMargin) : 0)};
  color: ${({ color }) => getColor(color || 'primary1')};
  text-decoration: ${({ lineThrough }) => (lineThrough ? 'line-through' : 'none')};

  ${({ fontWeight }) =>
    fontWeight &&
    css`
      font-weight: ${fontWeight};
    `};

  ${({ textTransform }) =>
    textTransform &&
    css`
      text-transform: ${textTransform};
    `};

  ${({ textDecoration }) =>
    textDecoration &&
    css`
      text-decoration: ${textDecoration};
    `};

  ${({ noWrap }) =>
    noWrap &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    `};
`;

export const H1 = styled.h1.withConfig(omitForwardedProps<TypographyRootProps>(omittedProps))<TypographyRootProps>`
  font-weight: 700;
  font-size: ${pixelsToRems(50)};
  line-height: ${pixelsToRems(57)};
  ${commonStyle};
`;

export const H2 = styled.h2.withConfig(omitForwardedProps<TypographyRootProps>(omittedProps))<TypographyRootProps>`
  font-weight: 600;
  font-size: ${pixelsToRems(40)};
  line-height: ${pixelsToRems(46)};
  ${commonStyle};
`;

export const H3 = styled.h3.withConfig(omitForwardedProps<TypographyRootProps>(omittedProps))<TypographyRootProps>`
  font-weight: 600;
  font-size: ${pixelsToRems(30)};
  line-height: ${pixelsToRems(34)};
  ${commonStyle};
`;

export const H4 = styled.h4.withConfig(omitForwardedProps<TypographyRootProps>(omittedProps))<TypographyRootProps>`
  font-weight: 500;
  font-size: ${pixelsToRems(28)};
  line-height: ${pixelsToRems(32)};
  ${commonStyle};
`;

export const H5 = styled.h5.withConfig(omitForwardedProps<TypographyRootProps>(omittedProps))<TypographyRootProps>`
  font-weight: 500;
  font-size: ${pixelsToRems(24)};
  line-height: ${pixelsToRems(27)};
  ${commonStyle};
`;

export const H6 = styled.h6.withConfig(omitForwardedProps<TypographyRootProps>(omittedProps))<TypographyRootProps>`
  font-weight: 600;
  font-size: ${pixelsToRems(20)};
  line-height: ${pixelsToRems(23)};
  ${commonStyle};
`;

export const ParagraphLarge = styled.p.withConfig(
  omitForwardedProps<TypographyRootProps>(omittedProps),
)<TypographyRootProps>`
  font-weight: 400;
  font-size: ${pixelsToRems(18)};
  line-height: ${pixelsToRems(24)};
  ${commonStyle};
`;

export const ParagraphMedium = styled.p.withConfig(
  omitForwardedProps<TypographyRootProps>(omittedProps),
)<TypographyRootProps>`
  font-weight: 400;
  font-size: ${pixelsToRems(16)};
  line-height: ${pixelsToRems(20)};
  ${commonStyle};
`;

export const ParagraphSmall = styled.p.withConfig(
  omitForwardedProps<TypographyRootProps>(omittedProps),
)<TypographyRootProps>`
  font-weight: 400;
  font-size: ${pixelsToRems(14)};
  line-height: ${pixelsToRems(20)};
  ${commonStyle};
`;
