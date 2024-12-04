import React from 'react';
import Text from './Text';
import createTypo from './createTypo';
import { SizeLineHeightType, SizeType, TextProps } from './interface';

/**
 * Typography
 * @description 继承 Typography.Text API
 */
const Typography = (props: TextProps): JSX.Element => {
  return <Text {...props} strong={false} isCode={false} />;
};

const WrappedTypography = createTypo(
  Typography,
  { limit: ['light', 'dark', 'white', 'primary'], defaultColor: 'light' },
  {
    sizeMap: {
      sm: {
        size: 't1',
        lineHeight: 'md',
      },
      md: {
        size: 't2',
        lineHeight: 'md',
      },
      lg: {
        size: 't3',
        lineHeight: 'md',
      },
    } as Record<SizeType, SizeLineHeightType>,
    defaultSize: 'md',
  },
  'none',
  'div',
) as React.FC<TextProps>;

export default WrappedTypography;
