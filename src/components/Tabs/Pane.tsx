import React, { HTMLAttributes, memo, ReactNode, useEffect, useRef } from 'react';
import classnames from 'classnames';

import { prefixCls } from './style';

export interface DefinedTabPaneProps {
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
    /** tab 的 key，由于 react 会在某些情况下改变传递的 key，顾直接使用 key 是不安全的，如发现 key 被修改，可使用 tabKey 来替换 */
    tabKey?: string;
}

export type TabPaneProps = DefinedTabPaneProps & Omit<HTMLAttributes<HTMLDivElement>, keyof DefinedTabPaneProps>;

const Pane = ({
    className,
    active,
    destroyInactiveTabPane,
    forceRender,
    placeholder,
    children,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tabKey,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tab,
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
