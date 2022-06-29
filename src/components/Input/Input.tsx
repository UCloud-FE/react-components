import React, {
    FocusEvent,
    MouseEvent,
    ChangeEvent,
    InputHTMLAttributes,
    ReactNode,
    Ref,
    useCallback,
    useRef,
    useState,
    useImperativeHandle,
    useContext,
    forwardRef
} from 'react';

import ControllerContext from 'src/components/Form/ControllerContext';
import noop from 'src/utils/noop';
import useUncontrolled from 'src/hooks/useUncontrolled';
import { Size } from 'src/type';

import { InputWrap, inputBlockWrapCls, Suffix, Clear, Prefix } from './style';

export interface DefinedInputProps {
    /**
     * @deprecated 使用 suffix 替换
     * 图标，传入 string 时为图标类型，也可直接传入图标组件
     */
    icon?: string | ReactNode;
    /** 前缀 */
    prefix?: ReactNode;
    /** 后缀 */
    suffix?: ReactNode;
    /** 是否可清空 */
    clearable?: boolean | { autoFocus?: boolean; callOnChange?: boolean };
    /** 尺寸 */
    size?: Size;
    /** 状态 */
    status?: 'default' | 'error' | string;
    /** 展示变更为块占位 */
    block?: boolean;
    /** 点击 clear 按钮回调 */
    onClear?: () => void;
    /** 自定义样式 */
    customStyle?: {
        border?: string;
        boxShadow?: string;
        background?: string;
    };
    /** @ignore */
    onFocus?: InputHTMLAttributes<HTMLInputElement>['onFocus'];
    /** @ignore */
    onBlur?: InputHTMLAttributes<HTMLInputElement>['onBlur'];
}

export type InputRef = {
    /** input 焦点 */
    focus: (options?: FocusOptions) => void;
    /** input 元素 */
    input?: HTMLInputElement | null;
};

export type InputProps = DefinedInputProps & Omit<InputHTMLAttributes<HTMLInputElement>, keyof DefinedInputProps>;

const Input = forwardRef(
    (
        {
            value: _value,
            defaultValue,
            onChange: _onChange,
            disabled,
            size = 'md',
            icon,
            prefix,
            suffix,
            clearable,
            block,
            style,
            status: _status,
            customStyle,
            className,
            onFocus = noop,
            onBlur = noop,
            onClear = noop,
            ...rest
        }: InputProps,
        ref: Ref<InputRef>
    ) => {
        const valueGetter = useCallback((e: ChangeEvent<HTMLInputElement>) => e.target.value, []);
        const [value, onChange] = useUncontrolled(_value, defaultValue || '', _onChange, { getter: valueGetter });
        const [focused, setFocused] = useState(false);
        const inputRef = useRef<HTMLInputElement>(null);
        const focus = useCallback((options?: FocusOptions) => {
            inputRef.current && inputRef.current.focus(options);
        }, []);
        useImperativeHandle(
            ref,
            () => {
                return {
                    input: inputRef.current,
                    focus
                };
            },
            [focus]
        );
        const handleFocus = useCallback(
            (e: FocusEvent<HTMLInputElement>) => {
                setFocused(true);
                onFocus(e);
            },
            [onFocus]
        );
        const handleBlur = useCallback(
            (e: FocusEvent<HTMLInputElement>) => {
                setFocused(false);
                onBlur(e);
            },
            [onBlur]
        );
        const handleClearMouseDown = useCallback((e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
        }, []);
        const handleClear = useCallback(
            (e: MouseEvent) => {
                if (disabled) return;
                e.stopPropagation();
                onClear();
                const input = inputRef.current;
                if (!input) return;
                e.target = input;
                e.currentTarget = input;
                const cacheV = input.value;
                if ((clearable as any)?.callOnChange !== false) {
                    input.value = '';
                    onChange(e as any);
                    input.value = cacheV;
                }
                if ((clearable as any)?.autoFocus !== false) {
                    input.focus();
                }
            },
            [clearable, disabled, onChange, onClear]
        );
        const handleWrapMouseDown = useCallback((e: MouseEvent) => {
            // 避免影响输入框的选中、移动光标等操作
            if (e.target === inputRef.current) return;
            e.preventDefault();
            inputRef.current?.focus();
        }, []);

        const { status } = useContext(ControllerContext);

        return (
            <InputWrap
                {...{ size, focused, style, disabled, status: _status || status, customStyle, block, className }}
                empty={!value}
                onMouseDown={handleWrapMouseDown}
            >
                <Prefix>{prefix}</Prefix>
                <span className={inputBlockWrapCls}>
                    <input
                        {...rest}
                        value={value}
                        onChange={onChange}
                        ref={inputRef}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        disabled={disabled}
                    />
                    <Clear clearable={clearable} onMouseDown={handleClearMouseDown} onClick={handleClear} />
                </span>
                <Suffix icon={icon}>{suffix}</Suffix>
            </InputWrap>
        );
    }
);

export default React.memo(Input);
