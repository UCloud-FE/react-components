import React from 'react';

import Text from './Text';
import createTypo from './createTypo';
import { SizeLineHeightType, SizeType, TextProps } from './interface';

/**
 * SubTitle
 * @description 继承 Typography.Text API
 */
const SubTitle = (props: TextProps): JSX.Element => {
  return <Text {...props} strong isCode={false} />;
};

const WrappedSubTitle = createTypo(
  SubTitle,
  { limit: ['dark', 'light', 'white', 'primary'], defaultColor: 'dark' },
  {
    sizeMap: {
      sm: {
        size: 't1',
        lineHeight: 'md',
      },
      lg: {
        size: 't2',
        lineHeight: 'md',
      },
    } as Record<SizeType, SizeLineHeightType>,
    defaultSize: 'sm',
  },
  'capitalize',
  'div',
) as React.FC<TextProps>;

export default WrappedSubTitle;
