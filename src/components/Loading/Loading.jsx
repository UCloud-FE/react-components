import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { LoadingWrap, Mask, IndicatorWrap, LoadingIcon, TipWrap, animationDuration } from './style';

export const animationName = 'uc-fe-animation-fade';

class Loading extends Component {
    static propTypes = {
        /** 是否加载 */
        loading: PropTypes.bool,
        /** 加载指示符 */
        indicator: PropTypes.node,
        /** 文字提示 */
        tip: PropTypes.node,
        /** 遮罩层样式 */
        maskStyle: PropTypes.object,
        /** 遮罩层类名 */
        maskClassName: PropTypes.string,
        /** @ignore */
        children: PropTypes.node
    };
    static defaultProps = {
        loading: false,
        indicator: <LoadingIcon type="loading" spin />
    };
    render() {
        const { loading, children, indicator, tip, maskStyle, maskClassName, ...rest } = this.props;
        return (
            <LoadingWrap {...rest}>
                {children}
                <CSSTransition in={loading} unmountOnExit classNames={animationName} timeout={animationDuration}>
                    <Mask style={maskStyle} maskClassName={maskClassName}>
                        <IndicatorWrap>
                            <div>
                                {indicator}
                                {tip && <TipWrap>{tip}</TipWrap>}
                            </div>
                        </IndicatorWrap>
                    </Mask>
                </CSSTransition>
            </LoadingWrap>
        );
    }
}

export default Loading;
