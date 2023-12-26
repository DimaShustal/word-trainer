import { FC } from 'react';
import { IIconProps } from '../../../types/IconSize';
import { iconSize } from '../../../functions/iconSize';

const IconPolish: FC<IIconProps> = ({ size }) => {
  const { width, height } = iconSize(size);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 82 66" version="1.1">
      <title>pl</title>
      <g id="pl" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Group" transform="translate(6.000000, 6.000000)" fillRule="nonzero">
          <path
            d="M57.4369625,-2 L12.5630375,-2 C7.62820119,-2 5.86681923,-1.41548743 4.07025832,-0.45467615 C2.11952904,0.588585286 0.588585286,2.11952904 -0.45467615,4.07025832 C-1.41548743,5.86681923 -2,7.62820119 -2,12.5630375 L-2,41.4369625 C-2,46.3717988 -1.41548743,48.1331808 -0.45467615,49.9297417 C0.588585286,51.880471 2.11952904,53.4114147 4.07025832,54.4546762 C5.86681923,55.4154874 7.62820119,56 12.5630375,56 L57.4369625,56 C62.3717988,56 64.1331808,55.4154874 65.9297417,54.4546762 C67.880471,53.4114147 69.4114147,51.880471 70.4546762,49.9297417 C71.4154874,48.1331808 72,46.3717988 72,41.4369625 L72,12.5630375 C72,7.62820119 71.4154874,5.86681923 70.4546762,4.07025832 C69.4114147,2.11952904 67.880471,0.588585286 65.9297417,-0.45467615 C64.1331808,-1.41548743 62.3717988,-2 57.4369625,-2 Z"
            id="Rectangle-3"
            stroke="#FFFFFF"
            strokeWidth="4"
            fill="#EEEEEE"
          />
          <path
            d="M70,27 L70,41.4369625 C70,45.8054044 69.5451545,47.3895069 68.6910498,48.986544 C67.836945,50.583581 66.583581,51.836945 64.986544,52.6910498 C63.3895069,53.5451545 61.8054044,54 57.4369625,54 L12.5630375,54 C8.19459564,54 6.61049308,53.5451545 5.01345604,52.6910498 C3.41641901,51.836945 2.163055,50.583581 1.30895025,48.986544 C0.454845494,47.3895069 0,45.8054044 0,41.4369625 L0,27 L70,27 Z"
            id="Path"
            fill="#FF4B4B"
          />
        </g>
      </g>
    </svg>
  );
};

export default IconPolish;
