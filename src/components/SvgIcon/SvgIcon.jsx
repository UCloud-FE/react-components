import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { SvgIconWrapper } from './style';
import Tick from './icons/Tick';
import Cross from './icons/Cross';
import BoldCross from './icons/BoldCross';
import CircleLoading from './icons/CircleLoading';
import DottedRightArrow from './icons/DottedRightArrow';
import ExclamationCircle from './icons/ExclamationCircle';
import Plus from './icons/Plus';

const IconMap = {
    tick: Tick,
    cross: Cross,
    boldCross: BoldCross,
    circleLoading: CircleLoading,
    dottedRightArrow: DottedRightArrow,
    exclamationCircle: ExclamationCircle,
    plus: Plus
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
