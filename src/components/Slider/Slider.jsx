import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import RcSlider from 'rce-slider';

import Tooltip from 'components/Tooltip';
import NumberInput from 'components/NumberInput';
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
            tooltipStyle="black"
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
        step: 1,
        size: 'md',
        min: 0,
        max: 100
    };
    state = {
        value: 'value' in this.props ? this.props.value : this.props.defaultValue
    };
    componentWillReceiveProps = nextProps => {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value
            });
        }
    };
    onChange = value => {
        const { onChange } = this.props;
        value = this.computeValidNumber(value);
        this.setState({
            value
        });
        onChange(value);
    };
    computeValidNumber = number => {
        const { step, min, max } = this.props;
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
            value: _value,
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
            ...rest
        } = this.props;
        /* eslint-enable no-unused-vars */
        const { value } = this.state;
        const sharingProps = {
            disabled,
            min,
            max,
            step,
            value
        };
        const sliderProps = {
            ...rest,
            className: sliderClassName,
            style: sliderStyle,
            onChange: this.onChange
        };
        const inputProps = {
            ..._inputProps,
            onNumberChange: this.onChange,
            size,
            computeValidNumber: this.computeValidNumber
        };
        return (
            <SliderWrap style={style} size={size}>
                <RcSlider
                    prefixCls={prefixCls}
                    handle={handleProps =>
                        handle({
                            ...handleProps,
                            tipFormatter
                        })
                    }
                    computeMarkStyle={(info, vertical) => {
                        const { point, min, range, markWidth } = info;
                        const bottomStyle = {
                            marginBottom: '-50%',
                            bottom: `${(point - min) / range * 100}%`
                        };
                        const leftStyle = {
                            width: `${markWidth / 2}%`,
                            marginLeft: `${-markWidth / 2}%`,
                            left: `${(point - min) / range * 100}%`
                        };
                        const style = vertical ? bottomStyle : leftStyle;
                        return style;
                    }}
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
