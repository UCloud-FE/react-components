import React, { HTMLAttributes } from 'react';
import { Override } from 'src/type';
import classnames from 'classnames';

import { LayoutWrap, prefixCls, prefixClsHasSider } from './style';

export interface LayoutProps {
    /**
     * 是否有侧边导航
     */
    hasSider?: boolean;
}

const Layout = ({ hasSider, ...rest }: LayoutProps & Override<HTMLAttributes<HTMLDivElement>, LayoutProps>) => {
    return <LayoutWrap {...rest} className={classnames(prefixCls, rest.className, hasSider && prefixClsHasSider)} />;
};

const MemoLayout = React.memo(Layout);

export default MemoLayout;
