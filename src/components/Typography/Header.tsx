import React from 'react';

import Text from './Text';
import createTypo from './createTypo';
import { SizeLineHeightType, SizeType, TextProps } from './interface';

export default (Tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' ) => {
  /**
   * Typography.Header
   * @description 分为 H1, H2, H3, H4, H5 不同的组件，表示不同层级，继承 Typography.Text API
   */
  const Header = (props: TextProps): JSX.Element => {
    return <Text {...props} component={Tag} strong isCode={false} />;
  };

  Header.displayName = Tag.toUpperCase();

  const WrappedHeader = createTypo(
    Header,
    { limit: ['dark', 'white', 'primary'], defaultColor: 'dark' },
    {
      sizeMap: {
        h1: {
          size: 'h1',
          lineHeight: 'h1',
          fontWeight: 'h1',
        },
        h2: {
          size: 'h2',
          lineHeight: 'h2',
          fontWeight: 'h2',
        },
        h3: {
          size: 'h3',
          lineHeight: 'h3',
          fontWeight: 'h3',
        },
        h4: {
          size: 'h4',
          lineHeight: 'h4',
          fontWeight: 'h4',
        },
        h5: {
          size: 'h5',
          lineHeight: 'h5',
          fontWeight: 'h5',
        },
      } as Record<SizeType, SizeLineHeightType>,
      defaultSize: Tag,
      enableSizeProp: false,
    },
    'capitalize',
  ) as React.FC<TextProps>;

  return WrappedHeader;
};
