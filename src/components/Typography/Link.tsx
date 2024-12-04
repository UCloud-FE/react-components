import React from 'react';

import Text from './Text';
import createTypo from './createTypo';
import { TextProps } from './interface';

/**
 * Typography.Link
 * @description 继承 Typography.Text API
 */
const Link = (props: TextProps): JSX.Element => {
  return <Text {...props} isLink />;
};

const WrappedLink = createTypo(
  Link,
  {
    limit: ['primary'],
    defaultColor: 'primary',
  },
  undefined,
  undefined,
  'a',
) as React.FC<TextProps>;

export default WrappedLink;
