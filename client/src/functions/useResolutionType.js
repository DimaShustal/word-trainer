import { useMemo } from 'react';
import { RESOLUTION_TYPES, RESOLUTION_WIDTHS } from '../constants/resolution';

export const calcResolutionType = () => {
  const screenWidth = window.innerWidth;

  if (screenWidth <= RESOLUTION_WIDTHS.PHONE) return RESOLUTION_TYPES.PHONE;
  if (screenWidth <= RESOLUTION_WIDTHS.TABLET) return RESOLUTION_TYPES.TABLET;

  return RESOLUTION_TYPES.DESKTOP;
};

const useResolutionType = () => {
  return useMemo(calcResolutionType, []);
};

export default useResolutionType;
