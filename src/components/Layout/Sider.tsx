import React, { HTMLAttributes } from 'react';
import { Override } from 'src/type';
import classnames from 'classnames';

import { SiderWrap, prefixClsSider } from './style';
import { LayoutContext } from './Layout';

export interface SiderProps {
    /**
     * 宽度
     */
    width?: number;
}

const generateId = (() => {
    let i = 0;
    return (prefix = '') => {
        i += 1;
        return `${prefix}${i}`;
    };
})();

const Sider = ({ width = 200, style, ...rest }: SiderProps & Override<HTMLAttributes<HTMLDivElement>, SiderProps>) => {
    const { siderHook } = React.useContext(LayoutContext);

    React.useEffect(() => {
        const uniqueId = generateId('ant-sider-');
        siderHook.addSider(uniqueId);
        return () => siderHook.removeSider(uniqueId);
    }, []);

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
