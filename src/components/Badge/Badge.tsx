import React, { CSSProperties, PureComponent, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import RcAlign from 'src/libs/rc-align';

import { StyleMap, SWrap, SBadge, SBadgeWrap } from './style';
import placements from './placements';

const defaultProps = {
    maxValue: 99,
    placement: 'topRight',
    color: 'red'
};

type BadgeProps = {
    /** 显示内容 */
    value?: ReactNode;
    /** 为数字时能显示的最大值，超过将显示最大值+ */
    maxValue?: number;
    /** 显示为点状 */
    dot?: boolean;
    /** badge 的位置 */
    placement?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft' | 'top' | 'bottom' | 'left' | 'right';
    /** 为 0 时是否隐藏 */
    hideWhenZero?: boolean;
    /** badge的样式 */
    badgeStyle?: CSSProperties;
    /** 定义 badge 的偏移，第一个参数 x 轴偏移量，第二个值为 y 轴偏移量 */
    offset?: [number, number];
    /** 定位的内容，为空时仅展示 Badge，定位等属性不生效 */
    children?: ReactNode;
    /** 选择预设的颜色 */
    color?: 'red' | 'green' | 'yellow' | 'primary';
    /** badge 的 zIndex */
    zIndex?: number;
} & typeof defaultProps;

const Placement = Object.keys(placements);
const Color = Object.keys(StyleMap);

const isNumberValue = (value: ReactNode): value is number | string => {
    return typeof value === 'number' ? true : typeof value === 'string' ? /^\d+\.?\d*$/.test(value) : false;
};

class Badge extends PureComponent<BadgeProps> {
    static defaultProps = defaultProps;
    static Placement = Placement;
    static Color = Color;
    renderBadge = () => {
        const { value, maxValue, dot, badgeStyle, color } = this.props;
        let content;
        if (dot) {
            content = null;
        } else if (isNumberValue(value) && +value > maxValue) {
            content = maxValue + '+';
        } else {
            content = value;
        }
        return (
            <SBadge dot={dot} color={color} style={badgeStyle}>
                {content}
            </SBadge>
        );
    };
    getTarget = () => {
        // eslint-disable-next-line react/no-find-dom-node
        return ReactDOM.findDOMNode(this);
    };
    render() {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        const {
            value,
            maxValue,
            dot,
            placement,
            hideWhenZero,
            children,
            badgeStyle,
            offset,
            color,
            zIndex,
            ...rest
        } = this.props;
        /* eslint-enable @typescript-eslint/no-unused-vars */
        const badge = this.renderBadge();
        if (!children) {
            return <SWrap {...rest}>{badge}</SWrap>;
        }
        return (
            <SWrap {...rest}>
                {children}
                {hideWhenZero && (value === 0 || value === '0') ? null : (
                    <RcAlign target={this.getTarget} align={{ ...placements[placement], offset: offset }}>
                        <SBadgeWrap zIndex={zIndex}>{badge}</SBadgeWrap>
                    </RcAlign>
                )}
            </SWrap>
        );
    }
}

export default Badge;
