import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Outer, Inner, TextWrap, EndText, CurrentText } from './style';

class Progress extends Component {
    static propTypes = {
        /** 当前百分比 */
        percent: PropTypes.number,
        /** 进度条颜色，内置 success、warn、error */
        color: PropTypes.oneOfType([PropTypes.oneOf(['success', 'warn', 'error']), PropTypes.string]),
        /**
         * 展示文字的格式化，为 null 时隐藏文字
         * @argument percent - 格式化的百分比
         */
        format: PropTypes.func
    };
    static defaultProps = {
        percent: 0,
        format: percent => `${percent}%`
    };
    render() {
        let { percent, format, color, ...rest } = this.props;
        percent = (percent < 0 ? 0 : percent > 100 ? 100 : percent) >> 0;
        return (
            <div {...rest}>
                {format !== null && (
                    <TextWrap>
                        <CurrentText percent={percent}>{format(percent)}</CurrentText>
                    </TextWrap>
                )}
                <Outer>
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
