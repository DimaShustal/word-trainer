import { ISize } from '../types/IconSize';
import { pixelsToRems } from './pixelsToRems';

export function iconSize(size: ISize): { width: string; height: string } {
  switch (size) {
    case 'large':
      return { width: pixelsToRems(82), height: pixelsToRems(66) };

    case 'medium':
      return { width: pixelsToRems(40), height: pixelsToRems(32) };

    case 'small':
      return { width: pixelsToRems(24), height: pixelsToRems(19) };

    default:
      return iconSize('large');
  }
}
