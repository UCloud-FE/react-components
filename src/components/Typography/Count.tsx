/* eslint react/prop-types: 0 */
import React from 'react';

import Text from './Text';
import createTypo from './createTypo';
import { SizeLineHeightType, SizeType, TextProps } from './interface';

/**
 * Count
 * @description 继承 Typography.Text API
 */
const Count = (props: TextProps): JSX.Element => {
  const strongSize = ['t2', 't3', 't4'];
  const strong = strongSize.indexOf(props.size || '') > -1;

  return <Text {...props} strong={strong} isCode={false} isNum />;
};

const WrappedCount = createTypo(
  Count,
  {
    limit: ['light', 'dark', 'white', 'primary', 'success', 'warning', 'error'],
    defaultColor: 'light',
  },
  {
    sizeMap: {
      xs: {
        size: 't1',
        lineHeight: 'lg',
      },
      sm: {
        size: 't2',
        lineHeight: 'lg',
      },
      md: {
        size: 't3',
        lineHeight: 'lg',
      },
      lg: {
        size: 't4',
        lineHeight: 'lg',
      },
      xlg: {
        size: 't5',
        lineHeight: 'lg',
      },
      xxlg: {
        size: 't6',
        lineHeight: 'lg',
      },
      xxxlg: {
        size: 't7',
        lineHeight: 'lg',
      },
      xxxxlg: {
        size: 't8',
        lineHeight: 'lg',
      }
    } as Record<SizeType, SizeLineHeightType>,
    defaultSize: 'sm',
  },
  'none',
  'span',
) as React.FC<TextProps>;

export default WrappedCount;
