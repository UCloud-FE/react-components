import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Outer, Inner, TextWrap, EndText, Bg, CurrentText } from './style';

class Progress extends Component {
    static propTypes = {
        /** 当前百分比 */
        percent: PropTypes.number,
        /**
         * 展示文字的格式化
         * @argument percent - 格式化的百分比
         */
        format: PropTypes.func
    };
    static defaultProps = {
        percent: 0,
        format: percent => `${percent}%`
    };
    render() {
        let { percent, format, ...rest } = this.props;
        percent = percent < 0 ? 0 : percent > 100 ? 100 : percent;
        return (
            <div {...rest}>
                <Outer>
                    <Inner>
                        <Bg percent={percent}>
                            <CurrentText>{format(percent)}</CurrentText>
                        </Bg>
                    </Inner>
                </Outer>
                <TextWrap>
                    <span>{format(0)}</span>
                    <EndText>{format(100)}</EndText>
                </TextWrap>
            </div>
        );
    }
}

export default Progress;
