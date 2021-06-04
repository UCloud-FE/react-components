import React, { Key, memo, useMemo } from 'react';
import classnames from 'classnames';

import { Panes, TabBarPosition } from './shared';
import { prefixCls } from './style';

interface TabContentProps {
    panes: Panes;
    activeKey: Key | null;
    tabBarPosition: TabBarPosition;
    destroyInactiveTabPane?: boolean;
    styleType: string;
    className?: string;
}

const getTabPanes = (panes: Panes, activeKey: Key | null, destroyInactiveTabPane?: boolean) => {
    const newChildren: React.ReactElement[] = [];
    panes.forEach(panel => {
        const { pane, key } = panel;
        const active = activeKey === key;
        newChildren.push(
            React.cloneElement(pane, {
                key,
                active,
                destroyInactiveTabPane
            })
        );
    });
    return newChildren;
};

const TabContent = ({
    panes,
    activeKey,
    tabBarPosition,
    destroyInactiveTabPane,
    styleType,
    className
}: TabContentProps) => {
    const tabPanes = useMemo(() => getTabPanes(panes, activeKey, destroyInactiveTabPane), [
        activeKey,
        destroyInactiveTabPane,
        panes
    ]);
    const classes = classnames(
        `${prefixCls}-content`,
        `${prefixCls}-${tabBarPosition}-content`,
        `${prefixCls}-styletype-${styleType}-content`,
        className
    );
    let style;
    return (
        <div className={classes} style={style}>
            {tabPanes}
        </div>
    );
};

export default memo(TabContent);
