import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import RcSlider from 'rce-slider';

import Tooltip from 'components/Tooltip';
import NumberInput from 'components/NumberInput';
import uncontrolledDecorator from 'src/decorators/uncontrolled';

import { prefixCls, SliderWrap } from './style';

const Handle = RcSlider.Handle;

const Size = ['sm', 'md', 'lg'];

const handle = props => {
    const { value, dragging, index, tipFormatter, ...restProps } = props;
    return (
        <Tooltip
            popupClassName={`${prefixCls}-tooltip`}
            popup={_.isFunction(tipFormatter) ? tipFormatter(value) : value}
            visible={dragging && tipFormatter !== null}
            placement="top"
            key={index}
            theme="dark"
            getPopupContainer={triggerNode => triggerNode}
            forceAlignWhenUpdate
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

@uncontrolledDecorator({})
class Slider extends Component {
    static propTypes = {
        /** 值，受控 */
        value: PropTypes.number,
        /** 默认值，非受控 */
        defaultValue: PropTypes.number,
        /** 修改回调 */
        onChange: PropTypes.func,
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
        /** number input 的自定义 props */
        numberInput: PropTypes.object,
        /**
         * 提示语格式化，传入null隐藏
         * @param value - 当前值
         */
        tipFormatter: PropTypes.func,
        /** 尺寸 */
        size: PropTypes.oneOf(Size)
    };
    static defaultProps = {
        onChange: () => {},
        defaultValue: 0,
        step: 1,
        size: 'md',
        min: 0,
        max: 100
    };
    constructor(props) {
        super(props);
        this.state = {};
        this.state.cacheMarks = { ...props.marks };
        this.state.marks = this.computeMarks(props.marks);
        this.state.marksForSlider = this.computeMarksForSlider(this.state.marks);
        this.cache = {
            valueToSliderValueMap: {},
            sliderValueToValueMap: {}
        };
    }
    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.marks, this.props.marks)) {
            const marks = this.computeMarks(nextProps.marks);
            this.setState({
                cacheMarks: { ...nextProps.marks },
                marks,
                marksForSlider: this.computeMarksForSlider(marks)
            });
            this.cache = {
                valueToSliderValueMap: {},
                sliderValueToValueMap: {}
            };
        }
    }
    computeMarks = _marks => {
        if (_.isEmpty(_marks)) {
            return null;
        }
        const { min, max, step } = this.props;
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
    computeMarksForSlider = _marks => {
        if (_.isEmpty(_marks)) {
            return null;
        }
        const { max } = this.props;
        const marks = {};
        let baseRatio = 0;
        _.each(_marks, _mark => {
            if (_mark.label == null) {
                return;
            }
            const value = (baseRatio += _mark.ratio) / 100 * sliderSplit;
            const mark = {
                label: _mark.label,
                style: _mark.style
            };
            if (_mark.value == max) {
                mark.style = { ..._mark.style, borderRight: 'none' };
            }
            marks[value] = mark;
        });
        return marks;
    };
    onNumberChange = v => {
        const { onChange } = this.props;
        const value = this.computeValidNumber(v);
        onChange(value);
    };
    onSliderChange = v => {
        const { onChange } = this.props;
        const value = this.translateSliderValueToValue(v);
        onChange(value);
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
            const { ratioBefore, range, ratio } = mark;
            value = this.computeValidNumber((vRatio - ratioBefore) / ratio * (range[1] - range[0]) + range[0], {
                min: range[0],
                max: range[1],
                step: mark.step
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
        if (_.isEmpty(marks)) {
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
    computeValidNumber = (number, options) => {
        let { step, min, max } = options || this.props;
        if (number < min) {
            number = min;
        }
        if (number > max) {
            number = max;
        }
        const stepPrecision = getPrecision(step);
        const numberPrecision = getPrecision(number);
        const maxPrecision = getPrecision(max);
        const minPrecision = getPrecision(min);
        const precision = Math.max(stepPrecision, numberPrecision, maxPrecision, minPrecision);
        number = +(((number - min) / step).toFixed(0) * step + min).toFixed(precision);
        if (number < min) {
            number = +(number + step).toFixed(precision);
        }
        if (number > max) {
            number = +(number - step).toFixed(precision);
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
            tipFormatter,
            size,
            marks: _marks,
            ...rest
        } = this.props;
        /* eslint-enable no-unused-vars */
        const { marksForSlider } = this.state;
        const sharingProps = {
            disabled
        };
        const sliderProps = {
            ...rest,
            className: sliderClassName,
            style: sliderStyle,
            onChange: this.onSliderChange
        };
        const inputProps = {
            ..._inputProps,
            min,
            max,
            step,
            value,
            onNumberChange: this.onNumberChange,
            size,
            computeValidNumber: this.computeValidNumber
        };
        return (
            <SliderWrap style={style} size={size}>
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
                    computeMarkStyle={(info, vertical) => {
                        const { point, min, range } = info;
                        const bottomStyle = {
                            marginBottom: '-50%',
                            bottom: `${(point - min) / range * 100}%`
                        };
                        const leftStyle = {
                            width: `30%`,
                            marginLeft: `-30%`,
                            overflow: 'hidden',
                            left: `${(point - min) / range * 100}%`
                        };
                        const style = vertical ? bottomStyle : leftStyle;
                        return style;
                    }}
                    marks={marksForSlider || {}}
                    {...sliderProps}
                    {...sharingProps}
                />
                <NumberInput {...inputProps} {...sharingProps} />
            </SliderWrap>
        );
    }
}
Slider.Size = Size;
export default Slider;
