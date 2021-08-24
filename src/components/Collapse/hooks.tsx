import { useCallback, useContext, useMemo, useRef } from 'react';

import { Key, useGroup, useItem } from 'src/hooks/group';
import useUncontrolled from 'src/hooks/useUncontrolled';

import CollapseContext from './CollapseContext';

export interface CollapseProps {
    /** 激活的面板，multiple 时为数组值，controlled */
    openKeys?: Key[];
    /** 默认激活的面板，multiple 时为数组值，uncontrolled */
    defaultOpenKeys?: Key[];
    /** 变化回调 */
    onChange?: (keys: Key[]) => void;
    /** 是否可以多个同时打开 */
    multiple?: boolean;
}

export const useCollapse = ({
    openKeys: _openKeys,
    defaultOpenKeys = [],
    onChange: _onChange,
    multiple = true
}: CollapseProps) => {
    const [openKeys, onChange] = useUncontrolled(_openKeys, defaultOpenKeys, _onChange);
    const [collapseContext] = useGroup(openKeys, onChange, multiple);
    return [collapseContext];
};

export interface PanelProps {
    /** 是否展开，controlled */
    open?: boolean;
    /** 默认展开状态，uncontrolled */
    defaultOpen?: boolean;
    /** 修改回调 */
    onChange?: (open: boolean) => void;
    /** 是否禁用 */
    disabled?: boolean;
    /** 唯一键值 */
    panelKey?: Key;
    /** 是否强制渲染 */
    forceRender?: boolean;
    /** 关闭时子组件不会更新 */
    ignoreUpdateWhenClose?: boolean;
}

export const usePanel = ({
    open: _open,
    defaultOpen,
    onChange: _onChange,
    disabled,
    panelKey = '',
    forceRender,
    ignoreUpdateWhenClose
}: PanelProps): [boolean, boolean, () => void] => {
    const [openS, onChange] = useUncontrolled(_open, defaultOpen, _onChange);
    const collapseContext = useContext(CollapseContext);
    const [open, toggle] = useItem(panelKey, collapseContext, openS);

    const handleToggle = useCallback(() => {
        if (!disabled) {
            onChange(!open);
            toggle(!open);
        }
    }, [disabled, onChange, open, toggle]);
    const renderedRef = useRef<boolean>(false);
    const shouldRender = useMemo(() => {
        const shouldRender = forceRender || open || (ignoreUpdateWhenClose && renderedRef.current) || false;
        if (renderedRef.current || shouldRender) renderedRef.current = shouldRender;
        return shouldRender;
    }, [forceRender, ignoreUpdateWhenClose, open]);
    return [shouldRender, open, handleToggle];
};
