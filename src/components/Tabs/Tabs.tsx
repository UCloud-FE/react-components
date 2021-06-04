import React, { Key, ReactElement, ReactNode, UIEvent, KeyboardEvent, useCallback, useMemo, memo } from 'react';
import classnames from 'classnames';

import KeyCode from 'src/interfaces/KeyCode';
import useUncontrolled from 'src/hooks/useUncontrolled';

import TabBar from './TabBar';
import TabContent from './TabContent';
import { TabPaneProps } from './Pane';
import { Panes, TabBarPosition, Size, StyleType } from './shared';
import { SWrap, prefixCls } from './style';

function getDefaultActiveKey(panes: Panes): Key | null {
    let activeKey: Key | null = null;
    for (let i = 0; i < panes.length; i++) {
        const pane = panes[i];
        if (!pane.pane.props.disabled) {
            activeKey = pane.key;
            break;
        }
    }
    return activeKey;
}

function getNextActiveKey(panes: Panes, currentKey: Key, next?: boolean): Key {
    const keys: Key[] = [];
    panes.forEach(pane => {
        if (!pane.pane.props.disabled) keys.push(pane.key);
    });
    const currentIndex = keys.findIndex(_key => _key === currentKey);
    if (currentIndex >= 0) {
        const index = next ? currentIndex + 1 : currentIndex + keys.length - 1;
        return keys[index % keys.length];
    } else {
        return keys[0];
    }
}

const getPanesFromChildren = (children: ReactElement<TabPaneProps>[]) => {
    const panes: Panes = [];
    React.Children.forEach(children, (pane, index) => {
        if (React.isValidElement(pane)) {
            panes.push({
                pane,
                key: pane.key == null ? `__default_tab_key_${index}` : pane.key + ''
            });
        }
    });
    return panes;
};

const getNextPrevActiveKey = (e: KeyboardEvent, activeKey: Key | null, panes: Panes) => {
    if (activeKey == null) return;
    const eventKeyCode = e.keyCode;
    if (eventKeyCode === KeyCode.ARROW_RIGHT || eventKeyCode === KeyCode.ARROW_DOWN) {
        e.preventDefault();
        const nextKey = getNextActiveKey(panes, activeKey, true);
        return nextKey;
    } else if (eventKeyCode === KeyCode.ARROW_LEFT || eventKeyCode === KeyCode.ARROW_UP) {
        e.preventDefault();
        const previousKey = getNextActiveKey(panes, activeKey);
        return previousKey;
    }
};

export interface TabsProps {
    /** 当前激活的 tab key，受控 */
    activeKey?: string;
    /** 默认激活的 tab key，非受控 */
    defaultActiveKey?: string;
    /** tab 修改时的回调 */
    onChange?: (activeKey: string) => void;
    /** 是否销毁不展示的 tab 内容 */
    destroyInactiveTabPane?: boolean;
    /** panes */
    children: ReactElement<TabPaneProps>[];
    /** @ignore */
    className?: string;
    /** bar 的定位 */
    tabBarPosition?: TabBarPosition;
    /** @ignore */
    direction?: string;
    /** 样式风格 */
    styleType?: StyleType;
    /** 尺寸 */
    size?: Size;
}
const Tabs = ({
    activeKey: _activeKey,
    defaultActiveKey,
    onChange: _onChange,
    destroyInactiveTabPane = false,
    children,
    className,
    tabBarPosition = 'top',
    direction = 'ltr',
    styleType = 'default',
    size = 'sm',
    ...restProps
}: TabsProps) => {
    const panes = useMemo(() => getPanesFromChildren(children), [children]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const _defaultActiveKey = useMemo(() => getDefaultActiveKey(panes), []);
    const [activeKey, _setActiveKey] = useUncontrolled(
        _activeKey,
        defaultActiveKey == null ? _defaultActiveKey : defaultActiveKey,
        _onChange
    );
    const setActiveKey = useCallback((key: Key) => _setActiveKey(key + ''), []);
    const onNavKeyDown = useCallback(
        (e: KeyboardEvent) => {
            const nextPrevKey = getNextPrevActiveKey(e, activeKey, panes);
            if (nextPrevKey != null) setActiveKey(nextPrevKey);
        },
        [activeKey, panes, setActiveKey]
    );
    const onScroll = useCallback(({ target, currentTarget }: UIEvent<HTMLDivElement>) => {
        if (target === currentTarget && (target as HTMLDivElement).scrollLeft > 0) {
            (target as HTMLDivElement).scrollLeft = 0;
        }
    }, []);
    const cls = useMemo(
        () =>
            classnames(
                prefixCls,
                `${prefixCls}-${tabBarPosition}`,
                direction === 'rtl' && `${prefixCls}-rtl`,
                className
            ),
        [className, direction, prefixCls, tabBarPosition]
    );

    const tabBar = (
        <TabBar
            key="tabBar"
            {...{
                onKeyDown: onNavKeyDown,
                tabBarPosition,
                onTabClick: setActiveKey,
                panes: panes,
                activeKey,
                direction,
                styleType
            }}
        />
    );
    const tabContent = (
        <TabContent
            key="tabContent"
            {...{
                tabBarPosition,
                activeKey,
                destroyInactiveTabPane,
                panes,
                onChange: setActiveKey,
                direction,
                styleType
            }}
        />
    );

    let contents: ReactNode;
    if (tabBarPosition === 'bottom') {
        contents = (
            <>
                {tabContent}
                {tabBar}
            </>
        );
    } else {
        contents = (
            <>
                {tabBar}
                {tabContent}
            </>
        );
    }

    return (
        <SWrap
            {...restProps}
            size={size}
            styleType={styleType}
            tabBarPosition={tabBarPosition}
            className={cls}
            onScroll={onScroll}
        >
            {contents}
        </SWrap>
    );
};

export default memo(Tabs);
