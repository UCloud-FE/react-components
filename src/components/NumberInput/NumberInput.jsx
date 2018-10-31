/**
 * copy from rc-input-number
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon';

import KEYCODE from 'interfaces/KeyCode';
import { NumberInputWrap, InputWrap, HandlerUp, HandlerDown, Input, InputSuffix } from './style';

function noop() {}

function defaultParser(input) {
    return input.replace(/[^\w.-]+/g, '');
}

const SPEED = 200;
const DELAY = 600;

const StyleType = ['default', 'split', 'pagination'];
const Size = ['sm', 'md', 'lg'];
/**
 * Max Safe Integer -- on IE this is not available, so manually set the number in that case.
 * The reason this is used, instead of Infinity is because numbers above the MSI are unstable
 */
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

class NumberInput extends Component {
    static propTypes = {
        /** 值，受控 */
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /** 默认值，非受控 */
        defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /** @ignore */
        focusOnUpDown: PropTypes.bool,
        /** @ignore */
        autoFocus: PropTypes.bool,
        /** 修改回调 */
        onChange: PropTypes.func,
        /**
         * 有效的修改回调，使用按钮改变值或者输入、回车后失焦时触发，可防止监听到无效的回调
         * @param value - 当前的值，必为有效数字
         */
        onNumberChange: PropTypes.func,
        /** @ignore */
        onKeyDown: PropTypes.func,
        /** @ignore */
        onKeyUp: PropTypes.func,
        /** @ignore */
        onEnter: PropTypes.func,
        /** 禁用 */
        disabled: PropTypes.bool,
        /** @ignore */
        onFocus: PropTypes.func,
        /** @ignore */
        onBlur: PropTypes.func,
        /** 只读 */
        readOnly: PropTypes.bool,
        /** 最大值 */
        max: PropTypes.number,
        /** 最小值 */
        min: PropTypes.number,
        /** 按钮每次变动大小 */
        step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /** @ignore */
        upStep: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /** @ignore */
        downStep: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /** 自定义'+'按钮 */
        upHandler: PropTypes.node,
        /** 自定义'-'按钮 */
        downHandler: PropTypes.node,
        /** 定义数值展示格式化 */
        formatter: PropTypes.func,
        /** 定义输入内容过滤 */
        parser: PropTypes.func,
        /** 精度，小数点位数 */
        precision: PropTypes.number,
        /** @ignore */
        className: PropTypes.string,
        /** @ignore */
        style: PropTypes.object,
        /** 样式风格 */
        styleType: PropTypes.oneOf(StyleType),
        /** 尺寸 */
        size: PropTypes.oneOf(Size),
        /** 自定义后缀 */
        suffix: PropTypes.node,
        /** input框自定义样式 */
        inputStyle: PropTypes.object,
        /** 计算合法值 */
        computeValidNumber: PropTypes.func,
        /** 是否隐藏操作按钮 */
        hideHandler: PropTypes.bool
    };

    static defaultProps = {
        focusOnUpDown: true,
        min: -MAX_SAFE_INTEGER,
        step: 1,
        onChange: noop,
        onNumberChange: noop,
        onKeyDown: noop,
        onEnter: noop,
        onFocus: noop,
        onBlur: noop,
        parser: defaultParser,
        styleType: StyleType[0],
        size: 'md',
        computeValidNumber: v => v
    };

    constructor(props) {
        super(props);

        let value;
        if ('value' in props) {
            value = props.value;
        } else {
            value = props.defaultValue;
        }
        value = this.toNumber(value);

        this.state = {
            inputValue: this.toPrecisionAsStep(value),
            value,
            focused: props.autoFocus
        };
    }

    componentDidMount() {
        this.componentDidUpdate();
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const value = this.state.focused
                ? nextProps.value
                : this.getValidValue(nextProps.value, nextProps.min, nextProps.max);
            this.setState({
                value,
                inputValue: this.inputting ? value : this.toPrecisionAsStep(value)
            });
        }
    }

    componentWillUpdate() {
        try {
            this.start = this.input.selectionStart;
            this.end = this.input.selectionEnd;
        } catch (e) {
            // Fix error in Chrome:
            // Failed to read the 'selectionStart' property from 'HTMLInputElement'
            // http://stackoverflow.com/q/21177489/3040605
        }
    }

    componentDidUpdate() {
        // pressingUpOrDown is true means that someone just click up or down button
        // https://github.com/ant-design/ant-design/issues/9204
        if (!this.pressingUpOrDown) {
            return;
        }
        if (this.props.focusOnUpDown && this.state.focused) {
            const selectionRange = this.input.setSelectionRange;
            if (
                selectionRange &&
                typeof selectionRange === 'function' &&
                this.start !== undefined &&
                this.end !== undefined
            ) {
                this.input.setSelectionRange(this.start, this.end);
            } else {
                this.focus();
            }
            this.pressingUpOrDown = false;
        }
    }

    componentWillUnmount() {
        this.stop();
    }

    onKeyDown = (e, ...args) => {
        if (e.keyCode === KEYCODE['ARROW_UP']) {
            const ratio = this.getRatio(e);
            this.up(e, ratio);
            this.stop();
        } else if (e.keyCode === KEYCODE['ARROW_DOWN']) {
            const ratio = this.getRatio(e);
            this.down(e, ratio);
            this.stop();
        } else if (e.keyCode === KEYCODE['ENTER']) {
            this.onEnter(e, ...args);
        }
        const { onKeyDown } = this.props;
        if (onKeyDown) {
            onKeyDown(e, ...args);
        }
    };

    onKeyUp = (e, ...args) => {
        this.stop();
        const { onKeyUp } = this.props;
        if (onKeyUp) {
            onKeyUp(e, ...args);
        }
    };

    onChange = e => {
        if (this.state.focused) {
            this.inputting = true;
        }
        const input = this.props.parser(this.getValueFromEvent(e));
        this.setState({ inputValue: input });
        this.props.onChange(this.toNumberWhenUserInput(input)); // valid number or invalid string
    };

    onFocus = (...args) => {
        this.setState({
            focused: true
        });
        this.props.onFocus(...args);
    };

    onBlur = (e, ...args) => {
        this.inputting = false;
        this.setState({
            focused: false
        });
        const value = this.getCurrentValidValue(this.state.inputValue);
        e.persist(); // fix https://github.com/react-component/input-number/issues/51
        this.setValue(value, () => {
            this.props.onBlur(e, ...args);
            this.props.onNumberChange(value);
        });
    };

    onEnter = (e, ...args) => {
        const value = this.getCurrentValidValue(this.state.inputValue);
        if (e) {
            e.persist();
            e.preventDefault();
        }
        this.setValue(value, () => {
            this.props.onEnter(e, ...args);
            this.props.onNumberChange(value);
        });
    };

    getCurrentValidValue(value) {
        let val = value;
        if (val === '') {
            val = '';
        } else if (!this.isNotCompleteNumber(val)) {
            val = this.getValidValue(val);
        } else {
            val = this.state.value;
        }
        return this.props.computeValidNumber(this.toNumber(val));
    }

    getRatio(e) {
        let ratio = 1;
        if (e.metaKey || e.ctrlKey) {
            ratio = 0.1;
        } else if (e.shiftKey) {
            ratio = 10;
        }
        return ratio;
    }

    getValueFromEvent(e) {
        return e.target.value.trim().replace(/。/g, '.');
    }

    getValidValue(value, min = this.props.min, max = this.props.max) {
        let val = parseFloat(value, 10);
        // https://github.com/ant-design/ant-design/issues/7358
        if (isNaN(val)) {
            return value;
        }
        if (val < min) {
            val = min;
        }
        if (val > max) {
            val = max;
        }
        return val;
    }

    setValue(v, callback) {
        // trigger onChange
        const newValue = this.isNotCompleteNumber(parseFloat(v, 10)) ? undefined : parseFloat(v, 10);
        const changed = newValue !== this.state.value || `${newValue}` !== `${this.state.inputValue}`; // https://github.com/ant-design/ant-design/issues/7363
        if (!('value' in this.props)) {
            this.setState(
                {
                    value: newValue,
                    inputValue: this.toPrecisionAsStep(v)
                },
                callback
            );
        } else {
            // always set input value same as value
            this.setState(
                {
                    inputValue: this.toPrecisionAsStep(this.state.value)
                },
                callback
            );
        }
        if (changed) {
            this.props.onChange(newValue);
        }
    }

    getPrecision(value) {
        if ('precision' in this.props) {
            return this.props.precision;
        }
        const valueString = value.toString();
        if (valueString.indexOf('e-') >= 0) {
            return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
        }
        let precision = 0;
        if (valueString.indexOf('.') >= 0) {
            precision = valueString.length - valueString.indexOf('.') - 1;
        }
        return precision;
    }

    // step={1.0} value={1.51}
    // press +
    // then value should be 2.51, rather than 2.5
    // if this.props.precision is undefined
    // https://github.com/react-component/input-number/issues/39
    getMaxPrecision(currentValue, ratio = 1) {
        if ('precision' in this.props) {
            return this.props.precision;
        }
        const { step } = this.props;
        const ratioPrecision = this.getPrecision(ratio);
        const stepPrecision = this.getPrecision(step);
        const currentValuePrecision = this.getPrecision(currentValue);
        if (!currentValue) {
            return ratioPrecision + stepPrecision;
        }
        return Math.max(currentValuePrecision, ratioPrecision + stepPrecision);
    }

    getPrecisionFactor(currentValue, ratio = 1) {
        const precision = this.getMaxPrecision(currentValue, ratio);
        return Math.pow(10, precision);
    }

    focus() {
        this.input.focus();
    }

    blur() {
        this.input.blur();
    }

    formatWrapper(num) {
        if (this.props.formatter) {
            return this.props.formatter(num);
        }
        return num;
    }

    toPrecisionAsStep(num) {
        if (this.isNotCompleteNumber(num) || num === '') {
            return num;
        }
        const precision = Math.abs(this.getMaxPrecision(num));
        if (precision === 0) {
            return num.toString();
        }
        if (!isNaN(precision)) {
            return Number(num).toFixed(precision);
        }
        return num.toString();
    }

    // '1.' '1x' 'xx' '' => are not complete numbers
    isNotCompleteNumber(num) {
        return (
            isNaN(num) ||
            num === '' ||
            num === null ||
            (num && num.toString().indexOf('.') === num.toString().length - 1)
        );
    }

    toNumber(num) {
        if (this.isNotCompleteNumber(num)) {
            return num;
        }
        if ('precision' in this.props) {
            return Number(Number(num).toFixed(this.props.precision));
        }
        return Number(num);
    }

    // '1.0' '1.00'  => may be a inputing number
    toNumberWhenUserInput(num) {
        // num.length > 16 => prevent input large number will became Infinity
        if ((/\.\d*0$/.test(num) || num.length > 16) && this.state.focused) {
            return num;
        }
        return this.toNumber(num);
    }

    upStep(val, rat) {
        let { step, upStep, min } = this.props;
        const precisionFactor = this.getPrecisionFactor(val, rat);
        const precision = Math.abs(this.getMaxPrecision(val, rat));
        if (upStep != null) {
            step = upStep;
        }
        let result;
        if (typeof val === 'number') {
            result = ((precisionFactor * val + precisionFactor * step * rat) / precisionFactor).toFixed(precision);
        } else {
            result = min === -Infinity ? step : min;
        }
        return this.toNumber(result);
    }

    downStep(val, rat) {
        let { step, downStep, min } = this.props;
        const precisionFactor = this.getPrecisionFactor(val, rat);
        const precision = Math.abs(this.getMaxPrecision(val, rat));
        if (downStep != null) {
            step = downStep;
        }
        let result;
        if (typeof val === 'number') {
            result = ((precisionFactor * val - precisionFactor * step * rat) / precisionFactor).toFixed(precision);
        } else {
            result = min === -Infinity ? -step : min;
        }
        return this.toNumber(result);
    }

    step(type, e, ratio = 1, recursive) {
        this.stop();
        if (e) {
            e.persist();
            e.preventDefault();
        }
        const props = this.props;
        if (props.disabled) {
            return;
        }
        const value = this.toNumber(this.state.inputValue || 0);
        if (this.isNotCompleteNumber(value)) {
            return;
        }
        let val = this[`${type}Step`](value, ratio);
        const outOfRange = val > props.max || val < props.min;
        if (val > props.max) {
            val = props.max;
        } else if (val < props.min) {
            val = props.min;
        }
        if (outOfRange) {
            return;
        }
        this.setValue(this.getCurrentValidValue(val), () => this.props.onNumberChange(val));
        this.autoStepTimer = setTimeout(() => {
            this[type](e, ratio, true);
        }, recursive ? SPEED : DELAY);
    }

    stop = () => {
        if (this.autoStepTimer) {
            clearTimeout(this.autoStepTimer);
        }
    };

    down = (e, ratio, recursive) => {
        this.pressingUpOrDown = true;
        this.step('down', e, ratio, recursive);
    };

    up = (e, ratio, recursive) => {
        this.pressingUpOrDown = true;
        this.step('up', e, ratio, recursive);
    };

    saveInput = node => {
        this.input = node;
    };
    renderHandler = () => {
        const { upHandler, downHandler, readOnly, max, min, disabled, styleType, hideHandler } = this.props;
        if (hideHandler) return null;

        const { value } = this.state;
        const editable = !readOnly && !disabled;
        let upDisabled;
        let downDisabled;
        if (value || value === 0) {
            if (!isNaN(value)) {
                const val = Number(value);
                if (val >= max) {
                    upDisabled = true;
                }
                if (val <= min) {
                    downDisabled = true;
                }
            } else {
                upDisabled = true;
                downDisabled = true;
            }
        }
        let upEvents;
        let downEvents;

        upEvents = {
            onMouseDown: editable && !upDisabled ? this.up : noop,
            onMouseUp: this.stop,
            onMouseLeave: this.stop
        };
        downEvents = {
            onMouseDown: editable && !downDisabled ? this.down : noop,
            onMouseUp: this.stop,
            onMouseLeave: this.stop
        };

        return (
            <div>
                <HandlerUp unselectable="unselectable" disabled={upDisabled} {...upEvents}>
                    {upHandler || (
                        <Icon
                            type={
                                {
                                    default: 'caret-up',
                                    split: 'plus',
                                    pagination: 'right'
                                }[styleType]
                            }
                        />
                    )}
                </HandlerUp>
                <HandlerDown unselectable="unselectable" disabled={downDisabled} {...downEvents}>
                    {downHandler || (
                        <Icon type={{ default: 'caret-down', split: 'minus', pagination: 'left' }[styleType]} />
                    )}
                </HandlerDown>
            </div>
        );
    };
    render() {
        /* eslint-disable no-unused-vars */
        const {
            disabled,
            className,
            readOnly,
            style,
            defaultValue,
            focusOnUpDown,
            onChange,
            onFocus,
            onBlur,
            upHandler,
            downHandler,
            formatter,
            parser,
            precision,
            styleType,
            suffix,
            inputStyle,
            onNumberChange,
            computeValidNumber,
            hideHandler,
            size,
            ...rest
        } = this.props;
        /* eslint-enable no-unused-vars */

        const { focused, inputValue, value } = this.state;

        // focus state, show input value
        // unfocus state, show valid value
        let inputDisplayValue;
        if (focused) {
            inputDisplayValue = inputValue;
        } else {
            inputDisplayValue = this.toPrecisionAsStep(value);
        }

        if (inputDisplayValue === undefined || inputDisplayValue === null) {
            inputDisplayValue = '';
        }

        const inputDisplayValueFormat = this.formatWrapper(inputDisplayValue);
        const editable = !readOnly && !disabled;
        return (
            <NumberInputWrap
                focused={focused}
                disabled={disabled}
                hideHandler={hideHandler}
                size={size}
                styleType={styleType}
                style={style}
                className={className}
            >
                {this.renderHandler()}
                <InputWrap>
                    <Input
                        {...rest}
                        size={size}
                        autoComplete="off"
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onKeyDown={editable ? this.onKeyDown : noop}
                        onKeyUp={editable ? this.onKeyUp : noop}
                        onChange={this.onChange}
                        disabled={disabled}
                        readOnly={readOnly}
                        innerRef={this.saveInput}
                        value={inputDisplayValueFormat}
                        style={inputStyle}
                    />
                    {suffix && <InputSuffix>{suffix}</InputSuffix>}
                </InputWrap>
            </NumberInputWrap>
        );
    }
}

NumberInput.StyleType = StyleType;
NumberInput.Size = Size;
export default NumberInput;
