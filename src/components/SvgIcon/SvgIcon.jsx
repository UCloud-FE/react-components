import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { SvgIconWrapper } from './style';
import Tick from './icons/Tick';
import Cross from './icons/Cross';
import BoldCross from './icons/BoldCross';
import RingLoading from './icons/RingLoading';
import DottedRightArrow from './icons/DottedRightArrow';
import CircleExclamation from './icons/CircleExclamation';
import Plus from './icons/Plus';
import Minus from './icons/Minus';
import Circle from './icons/Circle';
import SmallTick from './icons/SmallTick';
import Horz from './icons/Horz';

const IconMap = {
    tick: Tick,
    cross: Cross,
    boldCross: BoldCross,
    ringLoading: RingLoading,
    dottedRightArrow: DottedRightArrow,
    circleExclamation: CircleExclamation,
    plus: Plus,
    minus: Minus,
    circle: Circle,
    smallTick: SmallTick,
    horz: Horz
};

const IconType = _.keys(IconMap);

class SvgIcon extends PureComponent {
    static propTypes = {
        /** 图标类型 */
        type: PropTypes.oneOf(IconType).isRequired,
        /** 图标颜色，值为 css color 支持属性值 */
        color: PropTypes.string,
        /** 是否旋转 */
        spin: PropTypes.bool,
        /** 图标的尺寸大小 */
        size: PropTypes.string
    };
    static defaultProps = {
        size: '12px'
    };
    render() {
        const { type, ...rest } = this.props;
        const Icon = IconMap[type];
        return (
            <SvgIconWrapper {...rest} viewBox="0 0 24 24">
                {Icon && <Icon />}
            </SvgIconWrapper>
        );
    }
}

export default SvgIcon;
SvgIcon.Type = IconType;
