import React, { ReactNode } from 'react';

import { SelectedStatus, useGroup } from 'src/hooks/selectable';
import useUncontrolled from 'src/hooks/useUncontrolled';

import Checkbox, { CheckboxProps } from './Checkbox';
import CheckboxContext from './CheckboxContext';
import { Size, StyleType, Value } from './interface';
import { CheckboxGroupWrap } from './style';

export interface GroupProps {
    /** 当前值，controlled */
    value?: Value[];
    /** 默认值，uncontrolled */
    defaultValue?: Value[];
    /** 修改时的回调 */
    onChange?: (value: Value[], selectedStatus: SelectedStatus) => void;
    /** 快速定义选项 */
    options?: ({ label: ReactNode } & CheckboxProps)[];
    /** 禁用 */
    disabled?: boolean;
    /** 尺寸 */
    size?: Size;
    /** 样式风格 */
    styleType?: StyleType;
    /** @ignore */
    children?: ReactNode;
}

const Group = ({
    value: _value,
    defaultValue = [],
    onChange: _onChange,
    options,
    disabled,
    size,
    styleType,
    children,
    ...rest
}: GroupProps) => {
    const [value, onChange] = useUncontrolled(_value, defaultValue, _onChange);
    const { valueMap, toggleSelect, addItem, removeItem } = useGroup(value, onChange);
    const renderOptions = () => {
        if (options) {
            return options.map(option => {
                const { label, ...restOptionProps } = option;
                return (
                    <Checkbox key={option.value} {...restOptionProps}>
                        {label !== undefined ? label : option.value}
                    </Checkbox>
                );
            });
        } else {
            return children;
        }
    };
    return (
        <CheckboxContext.Provider value={{ disabled, size, styleType, valueMap, toggleSelect, addItem, removeItem }}>
            <CheckboxGroupWrap {...rest}>{renderOptions()}</CheckboxGroupWrap>
        </CheckboxContext.Provider>
    );
};

export default React.memo(Group);
