import React, { useCallback } from 'react';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import type { CustomColorOverrides } from 'src/types/color.type';
import type { CustomCheckboxPropsSizeOverrides } from 'src/types/size.type';
import { tokens } from 'src/theme/tokens';

declare module '@mui/material/Checkbox' {
  interface CheckboxPropsSizeOverrides extends CustomCheckboxPropsSizeOverrides {}
  interface CheckboxPropsColorOverrides extends CustomColorOverrides {}
}

export interface MuiCheckboxProps extends CheckboxProps {}

const sizeMapper = {
  small: 14,
  medium: 16,
  large: 24,
};

const Svg: React.FC = ({ children }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    {children}
  </svg>
);

const UncheckedIcon = (
  <Svg>
    <rect x="0.5" y="0.5" width="13" height="13" rx="2.5" stroke="currentColor" strokeOpacity="0.13" />
  </Svg>
);

const CheckedIcon = (
  <Svg>
    <rect width="14" height="14" rx="3" fill="currentColor" />
    <path
      d="M5.24994 9.45L2.79994 7L1.98328 7.81666L5.24994 11.0833L12.2499 4.08333L11.4333 3.26666L5.24994 9.45Z"
      fill="white"
    />
  </Svg>
);

const MuiCheckbox = ({ size = 'medium', sx, ...props }: MuiCheckboxProps) => {
  const svgSize = sizeMapper[size] ?? sizeMapper.medium;

  const getColor = useCallback((color: typeof props.color = 'grey') => {
    const defaultColor = tokens.colors.grey[400];
    // if a color is not in the tokens color palette, return grey 400 as default
    if (color === 'default' || color === 'secondary' || color === 'success') {
      return { color: defaultColor, strokeOpacity: 0.13 };
    }
    return { color: tokens.colors[color][400] ?? defaultColor, strokeOpacity: 1 };
  }, []);

  return (
    <Checkbox
      size={size}
      sx={{
        padding: 0,
        marginInline: '9px',
        width: svgSize,
        color: `${getColor(props.color).color} !important`,
        rect: {
          strokeOpacity: getColor(props.color).strokeOpacity,
        },
        ...sx,
      }}
      {...props}
      disableRipple
      icon={UncheckedIcon}
      checkedIcon={CheckedIcon}
    />
  );
};

export { MuiCheckbox };
