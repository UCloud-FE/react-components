import React, { ChangeEvent, KeyboardEvent, ReactNode, memo, useCallback, useRef, useState } from 'react';

import Input, { InputProps } from 'src/components/Input';
import Popover from 'src/components/Popover';
import SvgIcon from 'src/components/SvgIcon';
import useUncontrolled from 'src/hooks/useUncontrolled';
import usePopoverConfig from 'src/hooks/usePopoverConfig';
import KeyCode from 'src/utils/KeyCode';
import { Override } from 'src/type';

import Popup, { ListRef } from './Popup';
import { inputCls, loadingIconCls, SWrap } from './style';

interface Item {
    // 项的值
    value: string;
    // 项的展示，为空时展示 value
    label?: ReactNode;
}
interface AutoCompleteProps {
    /** 待筛选选项 */
    options?: Item[];
    /** 值，controlled */
    value?: string;
    /** 默认值 */
    defaultValue?: string;
    /** 选中回调 */
    onChange?: (v: string) => void;
    /** 是否禁用 */
    disabled?: boolean;
    /** options 加载中状态 */
    loading?: boolean;
    /** 前缀 */
    prefix?: ReactNode;
    /** 展示变更为块占位 */
    block?: boolean;
    /** 自定义搜索，为 false 时不做搜索展示全部 */
    handleSearch?: false | ((v: Item) => boolean);
    /** 自定义 popover 的配置 */
    popoverProps?: { [key: string]: any };
    /** 焦点回调 */
    onFocus?: () => void;
    /** 失焦回调 */
    onBlur?: () => void;
    /** 状态 */
    status: InputProps['status'];
    /** @ignore */
    placeholder?: InputProps['placeholder'];
}

const AutoComplete = ({
    value: _value,
    defaultValue = '',
    onChange: _onChange,
    options = [],
    disabled,
    loading,
    prefix,
    block,
    handleSearch,
    popoverProps,
    onFocus,
    onBlur,
    style,
    className,
    status,
    placeholder
}: AutoCompleteProps & Override<InputProps, AutoCompleteProps>) => {
    const [value, onChange] = useUncontrolled<string>(_value, defaultValue, _onChange);
    const [visible, setVisible] = useState(false);
    const list = useRef<ListRef>(null);
    const onInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
            setVisible(true);
        },
        [onChange]
    );
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        let intercept = true;
        switch (e.keyCode) {
            case KeyCode.ARROW_UP:
                list && list.current && list.current.moveUp();
                setVisible(true);
                break;
            case KeyCode.ARROW_DOWN:
                list && list.current && list.current.moveDown();
                setVisible(true);
                break;
            case KeyCode.ENTER:
                list && list.current && list.current.select();
                break;
            default:
                intercept = false;
                break;
        }
        if (intercept) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, []);
    const handleVisibleChange = useCallback(visible => setVisible(visible), []);
    const onSelect = useCallback(
        (v: string) => {
            onChange(v);
            setVisible(false);
        },
        [onChange]
    );
    const popoverConfigProps = usePopoverConfig();

    return (
        <SWrap {...{ className, style, block }}>
            <Popover
                {...popoverConfigProps}
                {...popoverProps}
                popup={
                    <Popup
                        searchValue={value}
                        options={options}
                        handleSearch={handleSearch}
                        onChange={onSelect}
                        loading={loading}
                        // ref={list}
                    />
                }
                trigger={[]}
                showAction={['click', 'focus']}
                hideAction={['blur']}
                visible={visible}
                stretch={['minWidth']}
                onVisibleChange={handleVisibleChange}
            >
                <Input
                    value={value}
                    onChange={onInputChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}
                    disabled={disabled}
                    prefix={prefix}
                    suffix={loading && <SvgIcon className={loadingIconCls} type="ring-loading" spin />}
                    className={inputCls}
                    block
                    placeholder={placeholder}
                    status={status}
                />
            </Popover>
        </SWrap>
    );
};

export default memo(AutoComplete);
