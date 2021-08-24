import React, { ElementType, HTMLAttributes } from 'react';

import { Key } from 'src/hooks/group';
import { Override } from 'src/type';

import CollapseContext from './CollapseContext';
import { useCollapse } from './hooks';

export interface CollapseProps {
    /** 激活的面板，multiple 时为数组值，controlled */
    openKeys?: Key[];
    /** 默认激活的面板，multiple 时为数组值，uncontrolled */
    defaultOpenKeys?: Key[];
    /** 变化回调 */
    onChange?: (keys: Key[]) => void;
    /** 是否可以多个同时打开 */
    multiple?: boolean;
    /**
     * @ignore
     * 自定义包裹容器组件
     */
    component?: ElementType;
}

const Collapse = ({
    openKeys,
    defaultOpenKeys,
    onChange,
    multiple = true,
    component,
    children,
    ...rest
}: CollapseProps & Override<HTMLAttributes<HTMLDivElement>, CollapseProps>) => {
    const [collapseContext] = useCollapse({
        openKeys,
        defaultOpenKeys,
        onChange,
        multiple
    });

    return (
        <CollapseContext.Provider value={collapseContext}>
            {React.createElement(component || 'div', rest, children)}
        </CollapseContext.Provider>
    );
};

export default React.memo(Collapse);
