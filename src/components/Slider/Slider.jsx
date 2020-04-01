import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import RcSlider from 'rc-slider';

import Tooltip from 'components/Tooltip';
import NumberInput from 'components/NumberInput';
import uncontrolledDecorator from 'src/decorators/uncontrolled';
import localeConsumerDecorator from 'src/components/LocaleProvider/localeConsumerDecorator';

import { prefixCls, SliderWrap, RcSliderWrap } from './style';
import LOCALE from './locale/zh_CN';

const Handle = RcSlider.Handle;

const Size = ['sm', 'md', 'lg'];

const handle = props => {
    const { value, dragging, index, tipFormatter, ...restProps } = props;
    return (
        <Tooltip
            popupClassName={`${prefixCls}-tooltip`}
            popup={_.isFunction(tipFormatter) ? tipFormatter(value) : value == null ? '' : value}
            visible={dragging && tipFormatter !== null}
            placement="top"
            key={index}
            theme="dark"
            getPopupContainer={triggerNode => triggerNode}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};
handle.propTypes = {
    value: PropTypes.number,
    dragging: PropTypes.bool,
    index: PropTypes.number,
    tipFormatter: PropTypes.func
};

const getPrecision = n => {
    const valueString = n.toString();
    if (valueString.indexOf('e-') >= 0) {
        return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
    }
    let precision = 0;
    if (valueString.indexOf('.') >= 0) {
        precision = valueString.length - valueString.indexOf('.') - 1;
    }
    return precision;
};

const sliderSplit = 300;

@localeConsumerDecorator({ defaultLocale: LOCALE, localeName: 'Slider' })
@uncontrolledDecorator({})
class Slider extends Component {
    static propTypes = {
        /** 值，受控 */
        value: PropTypes.number,
        /** 默认值，非受控 */
        defaultValue: PropTypes.number,
        /** 修改回调 */
        onChange: PropTypes.func,
        /** 拖拽结束、输入回车、输入失焦、数字输入框上下按钮等时触发 */
        onLastChange: PropTypes.func,
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** 最小值 */
        min: PropTypes.number,
        /** 最大值 */
        max: PropTypes.number,
        /** 每次变动的大小，传入的(最大值-最小值)必须为step的整数倍，大于0 */
        step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /** 标记 */
        marks: PropTypes.object,
        /** @ignore */
        className: PropTypes.string,
        /** @ignore */
        style: PropTypes.object,
        /** slider 类名 */
        sliderClassName: PropTypes.string,
        /** slider 样式 */
        sliderStyle: PropTypes.object,
        /** number input 的自定义 props，为null时隐藏 */
        numberInput: PropTypes.object,
        /** 是否灵敏的触发onChange，为true时当NumberInput中事实输入有效值时会触发onChange */
        isSensitive: PropTypes.bool,
        /**
         * 输入框提示语格式化，传入null隐藏
         * @param option - 包含当前值、生效值等
         */
        numberInputTipFormatter: PropTypes.func,
        /**
         * 提示语格式化，传入null隐藏
         * @param value - 当前值
         */
        tipFormatter: PropTypes.func,
        /** 尺寸 */
        size: PropTypes.oneOf(Size),
        /** @ignore */
        locale: PropTypes.object
    };
    static defaultProps = {
        onChange: () => {},
        onLastChange: () => {},
        defaultValue: 0,
        step: 1,
        size: 'md',
        min: 0,
        max: 100
    };
    constructor(props) {
        super(props);
        this.state = {};
        this.state.cacheMarks = this.simpleClone(props.marks);
        this.state.marks = this.computeMarks(props.marks, props);
        this.state.marksForSlider = this.computeMarksForSlider(this.state.marks, props);
        this.resetCache();
    }
    simpleClone = (obj = null) => {
        return JSON.parse(JSON.stringify(obj));
    };
    componentWillReceiveProps(nextProps) {
        if (
            !(nextProps.marks == this.state.cacheMarks || _.isEqual(nextProps.marks, this.state.cacheMarks)) ||
            nextProps.max !== this.props.max ||
            nextProps.min !== this.props.min ||
            nextProps.step !== this.props.step
        ) {
            const marks = this.computeMarks(nextProps.marks, nextProps);
            this.setState({
                cacheMarks: this.simpleClone(nextProps.marks),
                marks,
                marksForSlider: this.computeMarksForSlider(marks, nextProps)
            });
            this.resetCache();
        }
    }
    resetCache = () => {
        this.cache = {
            valueToSliderValueMap: {},
            sliderValueToValueMap: {},
            numberInputValueToValueMap: {},
            valueToValueStepMap: {}
        };
    };
    computeMarks = (_marks, props) => {
        if (_.isEmpty(_marks)) {
            return null;
        }
        const { min, max, step } = props;
        const values = _.sortBy(_.keys(_marks), v => +v);
        const l = values.length;
        const marks = [];
        const indexWithRatio = [];
        const indexWithoutRatio = [];
        let usedRatio = 0;
        let usedRange = 0;
        if (+values[l - 1] !== +max) {
            values.push(max);
        }
        _.each(values, (v, i) => {
            let info = _marks[v];
            v = +v;
            if (!_.isObject(info)) {
                info = {
                    label: info
                };
            } else {
                info = { ...info };
            }
            const range = [];
            if (i === 0) {
                range[0] = min;
            } else {
                range[0] = +values[i - 1];
            }
            range[1] = v;
            info.range = range;
            info.value = v;
            marks.push(info);
            if (info.ratio) {
                indexWithRatio.push(i);
                usedRatio += info.ratio;
                usedRange += range[1] - range[0];
            } else {
                indexWithoutRatio.push(i);
            }
            if (!('step' in info)) {
                info.step = step;
            }
        });
        const remainRange = max - min - usedRange;
        _.each(indexWithoutRatio, i => {
            const info = marks[i];
            info.ratio = (info.range[1] - info.range[0]) / remainRange * (100 - usedRatio);
        });
        let ratioBefore = 0;
        _.each(marks, mark => {
            mark.ratioBefore = ratioBefore;
            ratioBefore += mark.ratio;
        });
        return marks;
    };
    computeMarksForSlider = (_marks, props) => {
        if (_.isEmpty(_marks)) {
            return null;
        }
        const { max } = props;
        const marks = {};
        let baseRatio = 0;
        _.each(_marks, _mark => {
            if (_mark.label == null) {
                return;
            }
            const value = (baseRatio += _mark.ratio) / 100 * sliderSplit;
            const mark = {
                label: _mark.label,
                style: {
                    transform: 'none',
                    ...(_mark.value == max ? { borderRight: 'none' } : {}),
                    ..._mark.style
                }
            };
            marks[value] = mark;
        });
        return marks;
    };
    handleChange = (v, lastest) => {
        const { onChange, onLastChange, value } = this.props;
        if (v + '' !== value + '') {
            onChange(v);
        }
        if (lastest) {
            onLastChange(v);
        }
    };
    onNumberInputNumberChange = v => {
        this.handleChange(v, true);
    };
    onNumberInputChange = v => {
        const { isSensitive } = this.props;
        if (isSensitive) {
            const validValue = this.translateNumberInputValueToValue(v);
            if (validValue + '' === v + '') {
                this.handleChange(v);
            }
        }
        this.setState({
            numberInputValue: v
        });
    };
    onNumberInputFocus = () => {
        this.setState({
            numberInputValue: this.props.value,
            isNumberInputFocused: true
        });
    };
    onNumberInputBlur = () => {
        this.setState({
            isNumberInputFocused: false
        });
    };
    onSliderChange = (v, lastest) => {
        const value = this.translateSliderValueToValue(v);
        this.handleChange(value, lastest);
    };
    translateSliderValueToValue = v => {
        if (v in this.cache.sliderValueToValueMap) {
            return this.cache.sliderValueToValueMap[v];
        }
        const { marks } = this.state;
        const { min, max, step } = this.props;
        let value;
        if (_.isEmpty(marks)) {
            value = this.computeValidNumber(min + (max - min) * v / sliderSplit, {
                step,
                min,
                max
            });
        } else if (v == sliderSplit) {
            value = max;
        } else {
            const vRatio = v / sliderSplit * 100;
            let mark = _.find(marks, mark => {
                const { ratioBefore, ratio } = mark;
                if (vRatio >= ratioBefore && vRatio < ratioBefore + ratio) {
                    return true;
                }
            });
            if (!mark) mark = marks[0];
            const { ratioBefore, range, ratio, step } = mark;
            value = this.computeValidNumber((vRatio - ratioBefore) / ratio * (range[1] - range[0]) + range[0], {
                min: range[0],
                max: range[1],
                step: step
            });
        }
        this.cache.sliderValueToValueMap[v] = value;
        return value;
    };
    translateValueToSliderValue = v => {
        if (v in this.cache.valueToSliderValueMap) {
            return this.cache.valueToSliderValueMap[v];
        }
        const { marks } = this.state;
        const { min, max } = this.props;
        let value;
        if (v == undefined) {
            value = 0;
        } else if (_.isEmpty(marks)) {
            value = (v - min) / (max - min) * sliderSplit;
        } else if (v == max) {
            value = sliderSplit;
        } else {
            let mark = _.find(marks, mark => {
                const { range } = mark;
                if (v >= range[0] && v < range[1]) {
                    return true;
                }
            });
            if (!mark) mark = marks[0];
            const { range, ratio, ratioBefore } = mark;
            value = ((v - range[0]) / (range[1] - range[0]) * ratio + ratioBefore) / 100 * sliderSplit;
        }
        this.cache.valueToSliderValueMap[v] = value;
        return value;
    };
    translateNumberInputValueToValue = v => {
        if (v in this.cache.numberInputValueToValueMap) {
            return this.cache.numberInputValueToValueMap[v];
        }
        const { marks } = this.state;
        const { min, max, step } = this.props;
        if (isNaN(v) || v + '' !== +v + '') {
            return min;
        }
        let value;
        if (_.isEmpty(marks)) {
            value = this.computeValidNumber(v, {
                step,
                min,
                max
            });
        } else if (v === max) {
            value = max;
        } else {
            let mark = marks[0];
            for (let i in marks) {
                i = +i;
                const _mark = marks[i];
                const { range } = _mark;
                if (v >= range[0] && v < range[1]) {
                    mark = _mark;
                }
            }
            const { range, step } = mark;
            value = this.computeValidNumber(v, {
                min: range[0],
                max: range[1],
                step: step
            });
        }
        this.cache.numberInputValueToValueMap[v] = value;
        return value;
    };
    getValueStep = v => {
        if (v in this.cache.valueToValueStepMap) {
            return this.cache.valueToValueStepMap[v];
        }
        const { marks } = this.state;
        const { step } = this.props;
        let valueStep = { step };
        if (!_.isEmpty(marks)) {
            const l = marks.length;
            for (let i in marks) {
                i = +i;
                const mark = marks[i];
                const { range, step: markStep } = mark;
                if (+v === +range[0]) {
                    valueStep = {
                        upStep: markStep,
                        downStep: i > 0 ? marks[i - 1].step : step
                    };
                    break;
                } else if (v > range[0] && v < range[1]) {
                    valueStep = {
                        upStep: markStep,
                        downStep: markStep
                    };
                    break;
                } else if (+v === +range[1]) {
                    valueStep = {
                        upStep: i < l - 1 ? marks[i + 1].step : step,
                        downStep: markStep
                    };
                    break;
                }
            }
        }
        this.cache.valueToValueStepMap[v] = valueStep;
        return valueStep;
    };
    computeValidNumber = (number, options) => {
        let { step, min, max } = options || this.props;
        if (number < min) {
            return min;
        }
        if (number > max) {
            return max;
        }
        const stepPrecision = getPrecision(step);
        const maxPrecision = getPrecision(max);
        const minPrecision = getPrecision(min);
        const precision = Math.max(stepPrecision, maxPrecision, minPrecision);
        number = +(((number - min) / step).toFixed(0) * step + min).toFixed(precision);
        if (number < min) {
            return min;
        }
        if (number > max) {
            return max;
        }
        return _.isNaN(number) ? 0 : number;
    };
    render() {
        /* eslint-disable no-unused-vars */
        const {
            value,
            defaultValue,
            onChange,
            className,
            style,
            disabled,
            min,
            max,
            step,
            sliderClassName,
            sliderStyle,
            numberInput: _inputProps,
            numberInputTipFormatter,
            tipFormatter,
            size,
            marks: _marks,
            isSensitive,
            locale,
            onLastChange,
            ...rest
        } = this.props;
        /* eslint-enable no-unused-vars */
        const { marksForSlider, isNumberInputFocused, numberInputValue } = this.state;
        const sharingProps = {
            disabled
        };
        const sliderProps = {
            ...rest,
            className: sliderClassName,
            style: sliderStyle,
            onChange: this.onSliderChange,
            onAfterChange: (...args) => this.onSliderChange(...args, true)
        };
        const inputProps = {
            ..._inputProps,
            min,
            max,
            size,
            value: isNumberInputFocused ? numberInputValue : value,
            ...this.getValueStep(value),
            onChange: this.onNumberInputChange,
            onNumberChange: this.onNumberInputNumberChange,
            onFocus: this.onNumberInputFocus,
            onBlur: this.onNumberInputBlur,
            computeValidNumber: this.translateNumberInputValueToValue
        };
        const isNumberInputValid = numberInputValue + '' === value + '';
        return (
            <SliderWrap disabled={disabled} style={style} className={className} size={size}>
                <RcSliderWrap>
                    <RcSlider
                        min={0}
                        max={sliderSplit}
                        step={1}
                        value={this.translateValueToSliderValue(value)}
                        prefixCls={prefixCls}
                        handle={handleProps =>
                            handle({
                                ...handleProps,
                                value,
                                tipFormatter
                            })
                        }
                        marks={marksForSlider || {}}
                        {...sliderProps}
                        {...sharingProps}
                    />
                </RcSliderWrap>
                {_inputProps === null ? null : (
                    <Tooltip
                        popupClassName={`${prefixCls}-tooltip`}
                        popup={
                            _.isFunction(numberInputTipFormatter)
                                ? numberInputTipFormatter({
                                      currentValue: value,
                                      inputValue: numberInputValue,
                                      isSensitive,
                                      locale
                                  })
                                : `${locale.currentValueIs}${value}${locale.comma}${
                                      locale.inputValueIs
                                  }${numberInputValue}` +
                                  (isSensitive
                                      ? `${locale.comma}${locale.input}${
                                            isNumberInputValid ? locale.isValid : locale.isUnvalid
                                        }${isNumberInputValid ? '' : `${locale.comma}${locale.tip}`}`
                                      : '')
                        }
                        visible={isNumberInputFocused && numberInputTipFormatter !== null}
                        placement="top"
                        theme="dark"
                        getPopupContainer={triggerNode => triggerNode.parentNode}
                    >
                        <NumberInput {...inputProps} {...sharingProps} />
                    </Tooltip>
                )}
            </SliderWrap>
        );
    }
}
Slider.Size = Size;
export default Slider;
