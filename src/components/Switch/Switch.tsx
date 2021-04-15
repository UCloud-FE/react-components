import React, { HTMLAttributes, memo, ReactNode, useCallback } from 'react';

import useUncontrolled from 'src/hooks/useUncontrolled';

import { SwitchWrap, buttonCls, onTipCls, offTipCls, innerCls, dotCls } from './style';

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

interface SwitchProps {
    /** 是否选中 */
    checked?: boolean;
    /** 默认选中状态 */
    defaultChecked?: boolean;
    /** 选中状态改变时的回调 */
    onChange?: (checked: boolean) => void;
    /** 是否禁用 */
    disabled?: boolean;
    /** 尺寸 */
    size?: 'sm' | 'md' | 'lg';
    /** 打开的文字 */
    onText?: ReactNode;
    /** 关闭的文字 */
    offText?: ReactNode;
}

const Switch = ({
    checked: _checked,
    defaultChecked,
    onChange: _onChange,
    disabled,
    size = 'md',
    onText = 'ON',
    offText = 'OFF',
    ...rest
}: SwitchProps & Override<HTMLAttributes<HTMLDivElement>, SwitchProps>) => {
    const [checked, onChange] = useUncontrolled(_checked, defaultChecked || false, _onChange);
    const handleClick = useCallback(() => {
        if (disabled) return;
        onChange(!checked);
    }, [checked, disabled, onChange]);
    return (
        <SwitchWrap {...rest} checked={checked} disabled={disabled} size={size} onClick={handleClick}>
            <span className={innerCls}>
                <span className={onTipCls}>{onText}</span>
                <span className={offTipCls}>{offText}</span>
            </span>
            <span className={buttonCls}>
                <span>
                    <span className={dotCls} />
                </span>
            </span>
        </SwitchWrap>
    );
};

export default memo(Switch);
