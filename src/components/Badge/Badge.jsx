import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import RcAlign from 'rc-align';
import _ from 'lodash';

import { BadgeWrap, BaseBadge, DotBadge } from './style';
import placements from './placements';

const Placement = _.keys(placements);

class Badge extends Component {
    static propTypes = {
        /** 显示内容 */
        value: PropTypes.node,
        /** 为数字时能显示的最大值，超过将显示最大值+ */
        maxValue: PropTypes.number,
        /** 显示为点状 */
        dot: PropTypes.bool,
        /** 定位 */
        placement: PropTypes.oneOf(Placement),
        /** 为0时是否隐藏 */
        hideWhenZero: PropTypes.bool,
        /** badge的样式 */
        badgeStyle: PropTypes.object,
        /** @ignore */
        children: PropTypes.node,
        /** @ignore */
        innerRef: PropTypes.any
    };
    static defaultProps = {
        maxValue: 99,
        placement: Placement[0]
    };
    renderBadge = () => {
        const { value: _v, maxValue, dot, badgeStyle } = this.props;
        const isNumber = /^\d+\.?\d*$/.test(_v);
        const value = isNumber ? +_v : _v;

        let content;
        if (dot) {
            content = null;
        } else if (isNumber && value > maxValue) {
            content = maxValue + '+';
        } else {
            content = value;
        }
        const Comp = dot ? DotBadge : BaseBadge;
        return <Comp style={badgeStyle}>{content}</Comp>;
    };

    render() {
        /* eslint-disable no-unused-vars */
        const { value, maxValue, dot, placement, hideWhenZero, children, badgeStyle, innerRef, ...rest } = this.props;
        /* eslint-enable no-unused-vars */
        const badge = this.renderBadge();
        if (!children) {
            return <BadgeWrap {...rest}>{badge}</BadgeWrap>;
        }
        /* eslint-disable react/no-find-dom-node */
        return (
            <BadgeWrap {...rest}>
                {children}
                {hideWhenZero && value === 0 ? null : (
                    <RcAlign ref={innerRef} target={() => ReactDOM.findDOMNode(this)} align={placements[placement]}>
                        <div style={{ position: 'absolute' }}>{badge}</div>
                    </RcAlign>
                )}
            </BadgeWrap>
        );
        /* eslint-enable react/no-find-dom-node */
    }
}

export default Badge;

Badge.Placement = Placement;
