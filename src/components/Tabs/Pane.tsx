import React, { memo, ReactNode, useEffect, useRef } from 'react';
import classnames from 'classnames';

import { prefixCls } from './style';

export interface TabPaneProps {
    /** @ignore */
    className?: string;
    /**
     * @ignore
     * 内部属性
     */
    active?: boolean;
    /**
     * @ignore
     * 内部属性
     */
    destroyInactiveTabPane?: boolean;
    /** 是否强制渲染 */
    forceRender?: boolean;
    /** @ignore */
    placeholder?: ReactNode;
    /** 面板内容 */
    children?: ReactNode;
    /** 是否禁用 */
    disabled?: boolean;
    /** tab 的 title */
    tab: ReactNode;
}

const Pane = ({
    className,
    active,
    destroyInactiveTabPane,
    forceRender,
    placeholder,
    children,
    ...rest
}: TabPaneProps) => {
    const alreadyActiveRef = useRef(false);
    const panePrefixCls = `${prefixCls}-tabpane`;
    const cls = classnames(panePrefixCls, active ? `${panePrefixCls}-active` : `${panePrefixCls}-inactive`, className);
    const isRender = active || (!destroyInactiveTabPane && alreadyActiveRef.current);
    const shouldRender = isRender || forceRender;

    useEffect(() => {
        if (shouldRender) alreadyActiveRef.current = true;
    }, [shouldRender]);

    return (
        <div className={cls} {...rest}>
            {shouldRender ? children : placeholder}
        </div>
    );
};

export default memo(Pane);
