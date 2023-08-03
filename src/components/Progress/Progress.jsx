import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Outer, Inner, TextWrap, EndText, CurrentText } from './style';
import CircleProgress from './CircleProgress';

class Progress extends Component {
    static propTypes = {
        /**
         * 进度条类型，可选 line、circle
         */
        styleType: PropTypes.oneOf(['line', 'circle']),
        /** 当前百分比 */
        percent: PropTypes.number,
        /** 进度条颜色，内置 success、warn、error */
        color: PropTypes.oneOfType([PropTypes.oneOf(['success', 'warn', 'error']), PropTypes.string]),
        /**
         * 展示文字的格式化，为 null 时隐藏文字
         * @argument percent - 格式化的百分比
         */
        format: PropTypes.func,
        /**
         * 进度条粗度
         */
        strokeWidth: PropTypes.number
    };
    static defaultProps = {
        styleType: 'line',
        percent: 0,
        strokeWidth: 10,
        format: percent => `${percent}%`
    };
    render() {
        let { styleType, percent, format, color, strokeWidth, ...rest } = this.props;
        percent = (percent < 0 ? 0 : percent > 100 ? 100 : percent) >> 0;

        if (styleType === 'circle') {
            return (
                <CircleProgress percent={percent} format={format} color={color} strokeWidth={strokeWidth} {...rest} />
            );
        }
        return (
            <div {...rest}>
                {format !== null && (
                    <TextWrap>
                        <CurrentText percent={percent}>{format(percent)}</CurrentText>
                    </TextWrap>
                )}
                <Outer strokeWidth={strokeWidth}>
                    <Inner color={color} percent={percent} />
                </Outer>
                {format !== null && (
                    <TextWrap>
                        <span>{format(0)}</span>
                        <EndText>{format(100)}</EndText>
                    </TextWrap>
                )}
            </div>
        );
    }
}

export default Progress;
