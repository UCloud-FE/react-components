import React, { HTMLAttributes, ReactNode, useMemo } from 'react';

import { Key } from 'src/hooks/group';
import { Override } from 'src/type';
import isFunction from 'src/utils/isFunction';

import { PanelWrap } from './style';
import { usePanel } from './hooks';

export interface PanelProps {
    /** 标题项，为函数时会传入面板当前 open 和 disabled 状态，和 toggle 函数 */
    title?: ReactNode | ((options: { open: boolean; disabled?: boolean; toggle: () => void }) => ReactNode);
    /** 修改回调 */
    onChange?: (open: boolean) => void;
    /** 是否展开，controlled */
    open?: boolean;
    /** 默认展开状态，uncontrolled */
    defaultOpen?: boolean;
    /** 是否强制渲染 */
    forceRender?: boolean;
    /** 关闭时子组件不会更新 */
    ignoreUpdateWhenClose?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
    /** 唯一键值 */
    panelKey?: Key;
    /** title的位置 */
    titlePosition?: 'top' | 'bottom';
}

const Panel = ({
    open: _open,
    defaultOpen,
    onChange,
    disabled,
    panelKey = '',
    titlePosition = 'top',
    title,
    ignoreUpdateWhenClose,
    forceRender,
    children,
    ...rest
}: PanelProps & Override<HTMLAttributes<HTMLDivElement>, PanelProps>) => {
    const [shouldRender, open, handleToggle] = usePanel({
        open: _open,
        defaultOpen,
        onChange,
        disabled,
        panelKey,
        forceRender,
        ignoreUpdateWhenClose
    });
    const finalTitle = useMemo(() => {
        return (
            <div onClick={handleToggle}>
                {isFunction(title) ? title({ open, disabled, toggle: handleToggle }) : title}
            </div>
        );
    }, [disabled, handleToggle, open, title]);

    return (
        <div {...rest}>
            {titlePosition === 'top' && finalTitle}
            <PanelWrap open={open}>{shouldRender ? children : null}</PanelWrap>
            {titlePosition === 'bottom' && finalTitle}
        </div>
    );
};

const MemoPanel = React.memo(Panel);
(MemoPanel as typeof MemoPanel & { isCollapsePanel?: boolean }).isCollapsePanel = true;

export default MemoPanel;
