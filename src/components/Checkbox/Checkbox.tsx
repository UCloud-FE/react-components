import React, { HTMLAttributes, MouseEvent, ReactNode, useCallback, useEffect } from 'react';
import classnames from 'classnames';

import Card from 'src/components/Radio/Card';
import useUncontrolled from 'src/hooks/useUncontrolled';
import { useItem } from 'src/hooks/selectable';
import { Override } from 'src/type';

import { CheckboxWrap, contentCls, checkedCls, disabledCls, prefixCls, indeterminateCls, cardCls } from './style';
import { Size, StyleType, Value } from './interface';
import CheckboxIcon from './CheckboxIcon';
import CheckboxContext from './CheckboxContext';

export interface CheckboxProps {
    /** 是否选中 */
    checked?: boolean;
    /** 默认是否选中 */
    defaultChecked?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
    /** 点选时的回调 */
    onChange?: (value: boolean) => void;
    /** 一般用于全选，部分选中的状态 */
    indeterminate?: boolean;
    /** checkbox的值 */
    value?: Value;
    /** 尺寸，styleType 为 card 时无效 */
    size?: Size;
    /** 样式风格 */
    styleType?: StyleType;
    /** 标题，styleType 为 card 时使用 */
    title?: ReactNode;
    /**
     * @ignore
     * @deprecated 弃用
     */
    disabledLabel?: ReactNode;
}

const IconCheckboxWithoutMemo = ({
    checked,
    disabled,
    children,
    title,
    onChange,
    className,
    indeterminate,
    ...rest
}: CheckboxProps & Override<HTMLAttributes<HTMLElement>, CheckboxProps>) => {
    return (
        <CheckboxWrap
            checked={checked}
            disabled={disabled}
            className={classnames(
                {
                    [prefixCls]: true,
                    [checkedCls]: checked,
                    [disabledCls]: disabled,
                    [indeterminateCls]: indeterminate
                },
                className
            )}
            {...rest}
        >
            <CheckboxIcon checked={checked} disabled={disabled} indeterminate={indeterminate} />
            {children != null && <span className={contentCls}>{children}</span>}
        </CheckboxWrap>
    );
};
const IconCheckbox = React.memo(IconCheckboxWithoutMemo);

const CardCheckboxWithoutMemo = ({
    onChange,
    className,
    ...rest
}: CheckboxProps & Override<HTMLAttributes<HTMLElement>, CheckboxProps>) => {
    return <Card {...rest} className={classnames(prefixCls, cardCls, className)} multiple />;
};
const CardCheckbox = React.memo(CardCheckboxWithoutMemo);

const Checkbox = ({
    defaultChecked = false,
    checked: _checked,
    onChange: _onChange,
    value = '',
    onClick,
    disabledLabel,
    ...restProps
}: CheckboxProps & Override<HTMLAttributes<HTMLElement>, CheckboxProps>) => {
    const [__checked, onChange] = useUncontrolled(_checked, defaultChecked, _onChange);
    const { checked, toggle, addItem, removeItem, restContext } = useItem(value, __checked, CheckboxContext);

    const finalProps = {
        size: 'md' as Size,
        ...restContext,
        ...restProps,
        checked
    };
    const { disabled } = finalProps;
    const handleClick = useCallback(
        (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
            if (disabled) return;
            onClick?.(e);
            onChange(!checked);
            toggle(value);
        },
        [checked, disabled, onChange, onClick, toggle, value]
    );
    useEffect(() => {
        addItem();
        return () => {
            removeItem();
        };
    }, [addItem, removeItem]);
    const { styleType } = finalProps;

    if (styleType === 'card') {
        return <CardCheckbox {...finalProps} onClick={handleClick} />;
    } else {
        return <IconCheckbox {...finalProps} onClick={handleClick} />;
    }
};

export default React.memo(Checkbox);
