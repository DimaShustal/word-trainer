import IconEnglish from '../components/atoms/IconEnglish/IconEnglish';
import IconPolish from '../components/atoms/IconPolish/IconPolish';

const PL_CODE = 'PL';
const EN_CODE = 'EN';

export const SUPPORTED_LANGUAGES = [PL_CODE, EN_CODE];

export const LANGUAGES = [
  {
    code: PL_CODE,
    name: 'Polski',
    Icon: IconPolish,
  },
  {
    code: EN_CODE,
    name: 'English',
    Icon: IconEnglish,
  },
];
