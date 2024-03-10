import { useMemo, forwardRef, MouseEvent } from 'react';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import { getColor } from '../../../functions/colors';
import { pixelsToRems } from '../../../functions/pixelsToRems';
import { ButtonProps } from './Button.types';
import { getComponent } from './utils';
import { Text } from './Button.styles';

const colorConfig = {
  primary: {
    normal: {
      background: getColor('secondary3'),
      text: getColor('primary2'),
    },
    hover: {
      background: `${getColor('secondary3')}cc`,
      text: `${getColor('primary2')}cc`,
    },
    pressed: {
      background: getColor('tertiary5'),
      text: getColor('primary2'),
    },
    active: {
      background: getColor('tertiary5'),
      text: getColor('primary2'),
    },
    disabled: {
      background: `${getColor('secondary3')}66`,
      text: `${getColor('primary2')}66`,
    },
  },
  secondary: {
    normal: {
      background: getColor('secondary1'),
      text: getColor('primary1'),
    },
    hover: {
      background: `${getColor('secondary1')}cc`,
      text: `${getColor('primary1')}cc`,
    },
    pressed: {
      background: getColor('secondary4'),
      text: getColor('primary1'),
    },
    active: {
      background: getColor('secondary4'),
      text: getColor('primary1'),
    },
    disabled: {
      background: `${getColor('secondary1')}66`,
      text: `${getColor('primary1')}66`,
    },
  },
  icon: {
    normal: {
      background: undefined,
      text: getColor('primary2'),
    },
    hover: {
      background: undefined,
      text: `${getColor('primary2')}cc`,
    },
    pressed: {
      background: undefined,
      text: getColor('secondary2'),
    },
    active: {
      background: undefined,
      text: getColor('secondary2'),
    },
    disabled: {
      background: undefined,
      text: `${getColor('primary2')}66`,
    },
  },
  text: {
    normal: {
      background: undefined,
      text: getColor('primary2'),
    },
    hover: {
      background: undefined,
      text: `${getColor('primary2')}cc`,
    },
    pressed: {
      background: undefined,
      text: getColor('secondary2'),
    },
    active: {
      background: undefined,
      text: getColor('secondary2'),
    },
    disabled: {
      background: undefined,
      text: `${getColor('primary2')}66`,
    },
  },
};

const sizeConfig = {
  primary: {
    large: {
      width: pixelsToRems(170),
      height: pixelsToRems(60),
      fontSize: pixelsToRems(16),
    },
    medium: {
      width: pixelsToRems(150),
      height: pixelsToRems(50),
      fontSize: pixelsToRems(15),
    },
    small: {
      width: pixelsToRems(130),
      height: pixelsToRems(40),
      fontSize: pixelsToRems(14),
    },
  },
  secondary: {
    large: {
      width: pixelsToRems(170),
      height: pixelsToRems(60),
      fontSize: pixelsToRems(16),
    },
    medium: {
      width: pixelsToRems(150),
      height: pixelsToRems(50),
      fontSize: pixelsToRems(15),
    },
    small: {
      width: pixelsToRems(130),
      height: pixelsToRems(40),
      fontSize: pixelsToRems(14),
    },
  },
  icon: {
    large: {
      fontSize: pixelsToRems(30),
    },
    medium: {
      fontSize: pixelsToRems(25),
    },
    small: {
      fontSize: pixelsToRems(20),
    },
  },
  text: {
    large: {
      width: 'auto',
      height: pixelsToRems(20),
      fontSize: pixelsToRems(20),
      fontWeight: '500',
    },
    medium: {
      width: 'auto',
      height: pixelsToRems(15),
      fontSize: pixelsToRems(15),
      fontWeight: '500',
    },
    small: {
      width: 'auto',
      height: pixelsToRems(10),
      fontSize: pixelsToRems(10),
      fontWeight: '500',
    },
  },
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      disabled = false,
      active = false,
      size = 'large',
      type = 'primary',
      Icon,
      fullWidth = false,
      href,
      buttonType,
      loading = false,
      ...props
    },
    ref,
  ) => {
    const handleClick = (e: MouseEvent<HTMLElement>) => typeof props.onClick === 'function' && props.onClick(e);

    const Component = useMemo(() => type && getComponent(type), [type]);
    const sConf = useMemo(() => sizeConfig[type][size] || sizeConfig[type].large, [sizeConfig, size, type]);
    const cConf = useMemo(() => colorConfig[type], [type]);

    const contentRenderer = () => {
      if (type && ['primary', 'secondary'].includes(type) && loading) {
        return <LoadingOutlined style={{ fontSize: sConf.fontSize }} />;
      }

      if (type && ['icon'].includes(type) && Icon) {
        return <Icon style={{ fontSize: sConf.fontSize }} />;
      }

      return <Text>{children}</Text>;
    };

    return (
      <Component
        onClick={handleClick}
        active={!!active}
        disabled={!!disabled}
        loading={!!loading}
        href={href || ''}
        cConf={cConf}
        sConf={sConf}
        fullWidth={!!fullWidth}
        ref={ref}
        type={buttonType}
        role="button"
        {...props}
      >
        {contentRenderer()}
      </Component>
    );
  },
);

export default Button;
