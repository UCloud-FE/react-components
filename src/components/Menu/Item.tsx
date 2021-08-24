import React, { HTMLAttributes, ReactNode, useCallback, useContext } from 'react';
import classnames from 'classnames';

import Checkbox from 'src/components/Checkbox';
import Tooltip from 'src/components/Tooltip';
import { useItem, Key } from 'src/hooks/group';
import { Override } from 'src/type';
import noop from 'src/utils/noop';

import MenuContext from './MenuContext';
import { itemCls, selectedCls, checkboxCls, disabledCls, firstCls, lastCls } from './style';

export interface ItemProps {
    /** item的唯一键，不传使用 key 作为键值 */
    itemKey?: Key;
    /** 是否禁用 */
    disabled?: boolean;
    /**
     * tooltip 提示，可以为文本或 node，也可以是 tooltip 的 props object
     */
    tooltip?: ReactNode | any;
    /** @ignore */
    isFirst?: boolean;
    /** @ignore */
    isLast?: boolean;
}

const Item = ({
    itemKey = '',
    disabled,
    tooltip,
    className,
    children,
    isFirst,
    isLast,
    ...rest
}: ItemProps & Override<HTMLAttributes<HTMLDivElement>, ItemProps>) => {
    const groupContext = useContext(MenuContext);
    const [selected, _toggle] = useItem(itemKey, groupContext);
    const toggle = useCallback(() => _toggle(), [_toggle]);
    const item = (
        <div
            className={classnames(
                itemCls,
                selected && selectedCls,
                disabled && disabledCls,
                className,
                isFirst && firstCls,
                isLast && lastCls
            )}
            onClick={disabled ? noop : toggle}
            {...rest}
        >
            {groupContext.multiple ? (
                <Checkbox className={checkboxCls} checked={selected} disabled={disabled} size="lg">
                    {children}
                </Checkbox>
            ) : (
                children
            )}
        </div>
    );

    return tooltip ? (
        typeof tooltip === 'string' || React.isValidElement(tooltip) ? (
            <Tooltip popup={tooltip} placement="left">
                {item}
            </Tooltip>
        ) : (
            <Tooltip placement="left" {...tooltip}>
                {item}
            </Tooltip>
        )
    ) : (
        item
    );
};

const MemoItem: ReturnType<typeof React.memo> & { isMenuItem?: true } = React.memo(Item);
MemoItem.isMenuItem = true;

export default MemoItem;
