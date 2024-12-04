/* eslint react/prop-types: 0 */
import React from 'react';

import Text from './Text';
import createTypo from './createTypo';
import { SizeLineHeightType, SizeType, TextProps } from './interface';

/**
 * Typography.Paragraph
 * @description 继承 Typography.Text API
 */
const Paragraph = (props: TextProps): JSX.Element => {
  return <Text {...props} strong={false} isCode={false} />;
};

const WrappedParagraph = createTypo(
  Paragraph,
  { limit: ['light', 'dark', 'white', 'primary'], defaultColor: 'light' },
  {
    sizeMap: {
      normal: {
        size: 'normal',
        lineHeight: 'normal',
      },
      impact: {
        size: 'impact',
        lineHeight: 'impact',
      },
    } as Record<SizeType, SizeLineHeightType>,
    defaultSize: 'normal',
  },
  'initial',
  'div',
) as React.FC<TextProps>;

export default WrappedParagraph;
