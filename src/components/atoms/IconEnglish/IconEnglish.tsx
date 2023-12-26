import { FC } from 'react';
import { IIconProps } from '../../../types/IconSize';
import { iconSize } from '../../../functions/iconSize';

const IconEnglish: FC<IIconProps> = ({ size }) => {
  const { width, height } = iconSize(size);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 82 66" version="1.1">
      <title>en</title>
      <g id="en" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Group" transform="translate(6.000000, 6.000000)">
          <path
            d="M57.4369625,-2 L12.5630375,-2 C7.62820119,-2 5.86681923,-1.41548743 4.07025832,-0.45467615 C2.11952904,0.588585286 0.588585286,2.11952904 -0.45467615,4.07025832 C-1.41548743,5.86681923 -2,7.62820119 -2,12.5630375 L-2,41.4369625 C-2,46.3717988 -1.41548743,48.1331808 -0.45467615,49.9297417 C0.588585286,51.880471 2.11952904,53.4114147 4.07025832,54.4546762 C5.86681923,55.4154874 7.62820119,56 12.5630375,56 L57.4369625,56 C62.3717988,56 64.1331808,55.4154874 65.9297417,54.4546762 C67.880471,53.4114147 69.4114147,51.880471 70.4546762,49.9297417 C71.4154874,48.1331808 72,46.3717988 72,41.4369625 L72,12.5630375 C72,7.62820119 71.4154874,5.86681923 70.4546762,4.07025832 C69.4114147,2.11952904 67.880471,0.588585286 65.9297417,-0.45467615 C64.1331808,-1.41548743 62.3717988,-2 57.4369625,-2 Z"
            id="Rectangle-3"
            stroke="#FFFFFF"
            strokeWidth="4"
            fill="#EEEEEE"
          />
          <path
            d="M12.5630375,-1.33226763e-15 L57.4369625,-1.33226763e-15 C61.8054044,-1.33226763e-15 63.3895069,0.454845494 64.986544,1.30895025 C66.583581,2.163055 67.836945,3.41641901 68.6910498,5.01345604 C68.8631227,5.33520441 69.0189902,5.65642778 69.158198,6 L0.841802033,6 C0.981009754,5.65642778 1.13687734,5.33520441 1.30895025,5.01345604 C2.163055,3.41641901 3.41641901,2.163055 5.01345604,1.30895025 C6.61049308,0.454845494 8.19459564,-1.33226763e-15 12.5630375,-1.33226763e-15 Z"
            id="Path"
            fill="#FF4B4B"
          />
          <path
            d="M69.9973404,12 C69.9991119,12.1824033 70,12.370002 70,12.5630375 L70,18 L-7.10542736e-15,18 L-7.10542736e-15,12.5630375 C-7.10542736e-15,12.370002 0.000888147597,12.1824033 0.00265964657,12 L69.9973404,12 Z"
            id="Path"
            fill="#FF4B4B"
          />
          <polygon id="Path" fill="#FF4B4B" points="70 24 70 30 -4.69576973e-15 30 -7.10542736e-15 24" />
          <path
            d="M70,41.4369625 C70,41.629998 69.9991119,41.8175967 69.9973404,42 L0.00265964657,42 C0.000888147597,41.8175967 -7.10542736e-15,41.629998 -7.10542736e-15,41.4369625 L-7.10542736e-15,36 L70,36 L70,41.4369625 Z"
            id="Path"
            fill="#FF4B4B"
          />
          <path
            d="M69.158198,48 C69.0189902,48.3435722 68.8631227,48.6647956 68.6910498,48.986544 C67.836945,50.583581 66.583581,51.836945 64.986544,52.6910498 C63.3895069,53.5451545 61.8054044,54 57.4369625,54 L12.5630375,54 C8.19459564,54 6.61049308,53.5451545 5.01345604,52.6910498 C3.41641901,51.836945 2.163055,50.583581 1.30895025,48.986544 C1.13687734,48.6647956 0.981009754,48.3435722 0.841802033,48 L69.158198,48 Z"
            id="Path"
            fill="#FF4B4B"
          />
          <path
            d="M12.5630375,0 L35,0 L35,24 L0,24 L0,12.5630375 C0,8.19459564 0.454845494,6.61049308 1.30895025,5.01345604 C2.163055,3.41641901 3.41641901,2.163055 5.01345604,1.30895025 C6.61049308,0.454845494 8.19459564,0 12.5630375,0 Z"
            id="Path"
            fill="#1CB0F6"
          />
          <path
            d="M27.8061079,9.60193513 L26.5305369,10.2725425 C26.130007,10.4831135 25.6346119,10.3291214 25.4240409,9.92859159 C25.3401905,9.76909851 25.3112558,9.58641188 25.3417162,9.40881373 L25.5853286,7.98844455 C25.6085111,7.85328036 25.5636992,7.71536361 25.4654967,7.61963979 L24.4335381,6.61372876 C24.1095026,6.29787227 24.1028723,5.77913737 24.4187288,5.45510193 C24.5445045,5.32606932 24.7093085,5.24209749 24.8876271,5.21618627 L26.3137589,5.0089572 C26.4494714,4.98923701 26.5667904,4.90399977 26.6274829,4.78102332 L27.2652684,3.48872876 C27.4655333,3.08294772 27.9568307,2.91634398 28.3626117,3.1166089 C28.5241958,3.19635544 28.654985,3.32714462 28.7347316,3.48872876 L29.3725171,4.78102332 C29.4332096,4.90399977 29.5505286,4.98923701 29.6862411,5.0089572 L31.1123729,5.21618627 C31.5601788,5.28125629 31.8704476,5.69702442 31.8053776,6.14483038 C31.7794664,6.32314906 31.6954945,6.48795305 31.5664619,6.61372876 L30.5345033,7.61963979 C30.4363008,7.71536361 30.3914889,7.85328036 30.4146714,7.98844455 L30.6582838,9.40881373 C30.7347782,9.85481025 30.4352375,10.2783728 29.989241,10.3548672 C29.8116428,10.3853277 29.6289562,10.356393 29.4694631,10.2725425 L28.1938921,9.60193513 C28.0725071,9.53811925 27.9274929,9.53811925 27.8061079,9.60193513 Z"
            id="Star-Copy"
            fill="#FFFFFF"
            fillRule="nonzero"
          />
          <path
            d="M27.8061079,19.6019351 L26.5305369,20.2725425 C26.130007,20.4831135 25.6346119,20.3291214 25.4240409,19.9285916 C25.3401905,19.7690985 25.3112558,19.5864119 25.3417162,19.4088137 L25.5853286,17.9884446 C25.6085111,17.8532804 25.5636992,17.7153636 25.4654967,17.6196398 L24.4335381,16.6137288 C24.1095026,16.2978723 24.1028723,15.7791374 24.4187288,15.4551019 C24.5445045,15.3260693 24.7093085,15.2420975 24.8876271,15.2161863 L26.3137589,15.0089572 C26.4494714,14.989237 26.5667904,14.9039998 26.6274829,14.7810233 L27.2652684,13.4887288 C27.4655333,13.0829477 27.9568307,12.916344 28.3626117,13.1166089 C28.5241958,13.1963554 28.654985,13.3271446 28.7347316,13.4887288 L29.3725171,14.7810233 C29.4332096,14.9039998 29.5505286,14.989237 29.6862411,15.0089572 L31.1123729,15.2161863 C31.5601788,15.2812563 31.8704476,15.6970244 31.8053776,16.1448304 C31.7794664,16.3231491 31.6954945,16.487953 31.5664619,16.6137288 L30.5345033,17.6196398 C30.4363008,17.7153636 30.3914889,17.8532804 30.4146714,17.9884446 L30.6582838,19.4088137 C30.7347782,19.8548102 30.4352375,20.2783728 29.989241,20.3548672 C29.8116428,20.3853277 29.6289562,20.356393 29.4694631,20.2725425 L28.1938921,19.6019351 C28.0725071,19.5381193 27.9274929,19.5381193 27.8061079,19.6019351 Z"
            id="Star-Copy-4"
            fill="#FFFFFF"
            fillRule="nonzero"
          />
          <path
            d="M17.8061079,9.60193513 L16.5305369,10.2725425 C16.130007,10.4831135 15.6346119,10.3291214 15.4240409,9.92859159 C15.3401905,9.76909851 15.3112558,9.58641188 15.3417162,9.40881373 L15.5853286,7.98844455 C15.6085111,7.85328036 15.5636992,7.71536361 15.4654967,7.61963979 L14.4335381,6.61372876 C14.1095026,6.29787227 14.1028723,5.77913737 14.4187288,5.45510193 C14.5445045,5.32606932 14.7093085,5.24209749 14.8876271,5.21618627 L16.3137589,5.0089572 C16.4494714,4.98923701 16.5667904,4.90399977 16.6274829,4.78102332 L17.2652684,3.48872876 C17.4655333,3.08294772 17.9568307,2.91634398 18.3626117,3.1166089 C18.5241958,3.19635544 18.654985,3.32714462 18.7347316,3.48872876 L19.3725171,4.78102332 C19.4332096,4.90399977 19.5505286,4.98923701 19.6862411,5.0089572 L21.1123729,5.21618627 C21.5601788,5.28125629 21.8704476,5.69702442 21.8053776,6.14483038 C21.7794664,6.32314906 21.6954945,6.48795305 21.5664619,6.61372876 L20.5345033,7.61963979 C20.4363008,7.71536361 20.3914889,7.85328036 20.4146714,7.98844455 L20.6582838,9.40881373 C20.7347782,9.85481025 20.4352375,10.2783728 19.989241,10.3548672 C19.8116428,10.3853277 19.6289562,10.356393 19.4694631,10.2725425 L18.1938921,9.60193513 C18.0725071,9.53811925 17.9274929,9.53811925 17.8061079,9.60193513 Z"
            id="Star-Copy-2"
            fill="#FFFFFF"
            fillRule="nonzero"
          />
          <path
            d="M17.8061079,19.6019351 L16.5305369,20.2725425 C16.130007,20.4831135 15.6346119,20.3291214 15.4240409,19.9285916 C15.3401905,19.7690985 15.3112558,19.5864119 15.3417162,19.4088137 L15.5853286,17.9884446 C15.6085111,17.8532804 15.5636992,17.7153636 15.4654967,17.6196398 L14.4335381,16.6137288 C14.1095026,16.2978723 14.1028723,15.7791374 14.4187288,15.4551019 C14.5445045,15.3260693 14.7093085,15.2420975 14.8876271,15.2161863 L16.3137589,15.0089572 C16.4494714,14.989237 16.5667904,14.9039998 16.6274829,14.7810233 L17.2652684,13.4887288 C17.4655333,13.0829477 17.9568307,12.916344 18.3626117,13.1166089 C18.5241958,13.1963554 18.654985,13.3271446 18.7347316,13.4887288 L19.3725171,14.7810233 C19.4332096,14.9039998 19.5505286,14.989237 19.6862411,15.0089572 L21.1123729,15.2161863 C21.5601788,15.2812563 21.8704476,15.6970244 21.8053776,16.1448304 C21.7794664,16.3231491 21.6954945,16.487953 21.5664619,16.6137288 L20.5345033,17.6196398 C20.4363008,17.7153636 20.3914889,17.8532804 20.4146714,17.9884446 L20.6582838,19.4088137 C20.7347782,19.8548102 20.4352375,20.2783728 19.989241,20.3548672 C19.8116428,20.3853277 19.6289562,20.356393 19.4694631,20.2725425 L18.1938921,19.6019351 C18.0725071,19.5381193 17.9274929,19.5381193 17.8061079,19.6019351 Z"
            id="Star-Copy-5"
            fill="#FFFFFF"
            fillRule="nonzero"
          />
          <path
            d="M7.80610786,9.60193513 L6.53053687,10.2725425 C6.13000704,10.4831135 5.63461194,10.3291214 5.42404095,9.92859159 C5.34019047,9.76909851 5.31125576,9.58641188 5.34171622,9.40881373 L5.58532861,7.98844455 C5.60851108,7.85328036 5.56369921,7.71536361 5.46549668,7.61963979 L4.43353806,6.61372876 C4.10950262,6.29787227 4.10287228,5.77913737 4.41872877,5.45510193 C4.54450448,5.32606932 4.70930846,5.24209749 4.88762714,5.21618627 L6.31375887,5.0089572 C6.44947144,4.98923701 6.56679043,4.90399977 6.62748294,4.78102332 L7.26526843,3.48872876 C7.46553335,3.08294772 7.95683067,2.91634398 8.36261171,3.1166089 C8.52419584,3.19635544 8.65498503,3.32714462 8.73473157,3.48872876 L9.37251706,4.78102332 C9.43320957,4.90399977 9.55052856,4.98923701 9.68624113,5.0089572 L11.1123729,5.21618627 C11.5601788,5.28125629 11.8704476,5.69702442 11.8053776,6.14483038 C11.7794664,6.32314906 11.6954945,6.48795305 11.5664619,6.61372876 L10.5345033,7.61963979 C10.4363008,7.71536361 10.3914889,7.85328036 10.4146714,7.98844455 L10.6582838,9.40881373 C10.7347782,9.85481025 10.4352375,10.2783728 9.98924099,10.3548672 C9.81164283,10.3853277 9.62895621,10.356393 9.46946313,10.2725425 L8.19389214,9.60193513 C8.07250713,9.53811925 7.92749287,9.53811925 7.80610786,9.60193513 Z"
            id="Star-Copy-3"
            fill="#FFFFFF"
            fillRule="nonzero"
          />
          <path
            d="M7.80610786,19.6019351 L6.53053687,20.2725425 C6.13000704,20.4831135 5.63461194,20.3291214 5.42404095,19.9285916 C5.34019047,19.7690985 5.31125576,19.5864119 5.34171622,19.4088137 L5.58532861,17.9884446 C5.60851108,17.8532804 5.56369921,17.7153636 5.46549668,17.6196398 L4.43353806,16.6137288 C4.10950262,16.2978723 4.10287228,15.7791374 4.41872877,15.4551019 C4.54450448,15.3260693 4.70930846,15.2420975 4.88762714,15.2161863 L6.31375887,15.0089572 C6.44947144,14.989237 6.56679043,14.9039998 6.62748294,14.7810233 L7.26526843,13.4887288 C7.46553335,13.0829477 7.95683067,12.916344 8.36261171,13.1166089 C8.52419584,13.1963554 8.65498503,13.3271446 8.73473157,13.4887288 L9.37251706,14.7810233 C9.43320957,14.9039998 9.55052856,14.989237 9.68624113,15.0089572 L11.1123729,15.2161863 C11.5601788,15.2812563 11.8704476,15.6970244 11.8053776,16.1448304 C11.7794664,16.3231491 11.6954945,16.487953 11.5664619,16.6137288 L10.5345033,17.6196398 C10.4363008,17.7153636 10.3914889,17.8532804 10.4146714,17.9884446 L10.6582838,19.4088137 C10.7347782,19.8548102 10.4352375,20.2783728 9.98924099,20.3548672 C9.81164283,20.3853277 9.62895621,20.356393 9.46946313,20.2725425 L8.19389214,19.6019351 C8.07250713,19.5381193 7.92749287,19.5381193 7.80610786,19.6019351 Z"
            id="Star-Copy-6"
            fill="#FFFFFF"
            fillRule="nonzero"
          />
        </g>
      </g>
    </svg>
  );
};

export default IconEnglish;
