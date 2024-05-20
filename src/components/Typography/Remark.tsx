import React from 'react';

import Text from './Text';
import createTypo from './createTypo';
import { TextProps } from './interface';

/**
 * Typography.Remark
 * @description 继承 Typography.Text API
 */
const Remark = (props: TextProps): JSX.Element => {
  return (
    <Text {...props} size="t1" lineHeight="md" strong={false} isCode={false} />
  );
};

const WrappedRemark = createTypo(
  Remark,
  {
    limit: ['remark', 'light', 'white'],
    defaultColor: 'remark',
  },
  false,
  'initial',
  'span',
) as React.FC<TextProps>;

export default WrappedRemark;
