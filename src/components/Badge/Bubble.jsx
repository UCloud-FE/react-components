/* eslint-disable react/no-find-dom-node */
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import RcAlign from 'src/libs/rc-align';

import { SWrap, SBubbleWrap, bubbleStyleMap } from './style';
import { bubblePlacement } from './placements';

const StyleType = Object.keys(bubbleStyleMap);
const Size = ['sm', 'md'];

/**
 * @deprecated
 * 后续会移除，请使用 Badge 替代
 */
export class Bubble extends PureComponent {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node,
        /** 泡泡内容 */
        bubble: PropTypes.node,
        /** 内置样式风格 */
        styleType: PropTypes.oneOf(StyleType).isRequired,
        /** 尺寸 */
        size: PropTypes.oneOf(Size),
        /** 自定义样式 */
        customStyle: PropTypes.shape({
            /** 泡泡字色 */
            bubbleColor: PropTypes.string,
            /** 泡泡的背景色 */
            bubbleBackground: PropTypes.string
        }),
        /**
         * @ignore
         * 自定义冒泡层定位的目标元素
         */
        getBubbleTarget: PropTypes.func,
        /** 自定义偏移量 */
        offset: PropTypes.array
    };
    static defaultProps = {
        offset: [12, -4],
        size: 'md'
    };
    componentDidMount() {
        const { styleType } = this.props;
        if (!styleType) {
            console.error('Must provide styleType for Tag');
        }
    }
    render() {
        const {
            children,
            bubble,
            styleType = 'yellow',
            customStyle,
            offset,
            getBubbleTarget,
            size,
            ...rest
        } = this.props;
        return (
            <SWrap {...rest}>
                {children}
                {bubble && (
                    <RcAlign
                        target={getBubbleTarget || (() => ReactDOM.findDOMNode(this))}
                        align={{ ...bubblePlacement, targetOffset: offset }}
                    >
                        <SBubbleWrap styleType={styleType} customStyle={customStyle} size={size}>
                            {bubble}
                        </SBubbleWrap>
                    </RcAlign>
                )}
            </SWrap>
        );
    }
}
Bubble.StyleType = StyleType;
Bubble.Size = Size;

export default Bubble;
