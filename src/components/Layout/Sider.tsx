import React, { HTMLAttributes } from 'react';
import { Override } from 'src/type';
import classnames from 'classnames';

import { SiderWrap, prefixClsSider } from './style';

export interface SiderProps {
    /**
     * 宽度
     */
    width?: number;
}

const Sider = ({ width = 200, style, ...rest }: SiderProps & Override<HTMLAttributes<HTMLDivElement>, SiderProps>) => {
    const divStyle = {
        flex: `0 0 ${width}`,
        width: width
    };
    return (
        <SiderWrap
            {...rest}
            style={{ ...style, ...divStyle }}
            className={classnames(prefixClsSider, rest.className)}
        ></SiderWrap>
    );
};

const MemoSider = React.memo(Sider);

export default MemoSider;
