/* eslint-disable react/no-find-dom-node */
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import RcAlign from 'src/libs/rc-align';

import { Wrap, BubbleWrap, bubbleStyleMap } from './style';
import { bubblePlacement } from './placements';

const StyleType = Object.keys(bubbleStyleMap);

export class Bubble extends PureComponent {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node,
        /** 泡泡内容 */
        bubble: PropTypes.node,
        /** 内置样式风格 */
        styleType: PropTypes.oneOf(StyleType),
        /** 自定义样式 */
        customStyle: PropTypes.shape({
            /** 泡泡字色 */
            bubbleColor: PropTypes.string,
            /** 泡泡的背景色 */
            bubbleBackground: PropTypes.string
        }),
        /** 自定义冒泡层容器 */
        getBubbleContainer: PropTypes.func,
        /** 自定义偏移量 */
        offset: PropTypes.array
    };
    static defaultProps = {
        styleType: 'yellow',
        offset: [12, -4]
    };
    render() {
        const { children, bubble, styleType, customStyle, offset, getBubbleContainer, ...rest } = this.props;
        return (
            <Wrap {...rest}>
                {children}
                {bubble && (
                    <RcAlign
                        target={getBubbleContainer || (() => ReactDOM.findDOMNode(this))}
                        align={{ ...bubblePlacement, targetOffset: offset }}
                    >
                        <BubbleWrap styleType={styleType} customStyle={customStyle}>
                            {bubble}
                        </BubbleWrap>
                    </RcAlign>
                )}
            </Wrap>
        );
    }
}
Bubble.StyleType = StyleType;

export default Bubble;
