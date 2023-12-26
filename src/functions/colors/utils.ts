import { TColor } from './colors.types';

export const getColor = (colorKey: TColor): string => {
  switch (colorKey) {
    case 'currentColor':
      return 'currentColor';

    case 'transparent':
      return 'transparent';

    // PRIMARY
    case 'primary1':
      return '#0A0110';

    case 'primary2':
      return '#FFFFFF';

    // SECONDARY
    case 'secondary1':
      return '#AAAAAA';

    case 'secondary2':
      return '#D295FF';

    case 'secondary3':
      return '#B250FF';

    case 'secondary4':
      return '#FFD0C3';

    case 'secondary5':
      return '#C18A8D';

    // TERTIARY
    case 'tertiary1':
      return '#D7FFB8';

    case 'tertiary2':
      return '#58CC05';

    case 'tertiary3':
      return '#FFDFDE';

    case 'tertiary4':
      return '#FF4B4B';

    case 'tertiary5':
      return '#8F6AD3';

    case 'tertiary6':
      return '#220B40';

    case 'tertiary7':
      return '#1A1321';

    default:
      return getColor('primary1');
  }
};
