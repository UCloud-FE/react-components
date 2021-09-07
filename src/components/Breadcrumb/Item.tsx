import React, { HTMLAttributes, useCallback } from 'react';

import { ItemSpan, ItemA } from './style';

export interface ItemProps {
    /** 禁用 */
    disabled?: boolean;
    /** 标明当前路由 */
    current?: boolean;
    /** 标明节点无点击跳转事件 */
    noAction?: boolean;
    /** @ignore */
    href?: string;
}

const Item = ({ disabled, onClick, href, ...rest }: ItemProps & HTMLAttributes<HTMLElement>) => {
    const handleClick = useCallback(
        e => {
            if (disabled) return;
            onClick?.(e);
        },
        [disabled, onClick]
    );
    const Component = href ? ItemA : ItemSpan;
    return <Component {...{ disabled, href }} {...rest} onClick={handleClick} />;
};
Item.__IS_BREADCRUMB_ITEM = true;

export default Item;
