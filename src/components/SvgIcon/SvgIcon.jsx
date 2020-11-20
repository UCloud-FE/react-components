import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { camel2Kebab } from 'src/utils/string';

import SvgIconWrapper from './SvgIconWrap';

import Tick from './icons/Tick';
import Cross from './icons/Cross';
import BoldCross from './icons/BoldCross';
import RingLoading from './icons/RingLoading';
import DottedRightLineArrow from './icons/DottedRightLineArrow';
import Plus from './icons/Plus';
import Minus from './icons/Minus';
import Circle from './icons/Circle';
import SmallTick from './icons/SmallTick';
import Horz from './icons/Horz';
import LeftArrow from './icons/LeftArrow';
import RightArrow from './icons/RightArrow';
import Refresh from './icons/Refresh';
import Trash from './icons/Trash';
import Eye from './icons/Eye';
import CircleExclamation from './icons/CircleExclamation';
import CircleInfo from './icons/CircleInfo';
import CircleTick from './icons/CircleTick';
import CircleCross from './icons/CircleCross';

const IconMap = {
    tick: Tick,
    cross: Cross,
    'bold-cross': BoldCross,
    'ring-loading': RingLoading,
    'dotted-right-line-arrow': DottedRightLineArrow,
    plus: Plus,
    minus: Minus,
    circle: Circle,
    'small-tick': SmallTick,
    horz: Horz,
    'left-arrow': LeftArrow,
    'right-arrow': RightArrow,
    refresh: Refresh,
    trash: Trash,
    eye: Eye,
    'circle-exclamation': CircleExclamation,
    'circle-info': CircleInfo,
    'circle-tick': CircleTick,
    'circle-cross': CircleCross
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
        let { type, ...rest } = this.props;
        type = camel2Kebab(type);
        const Icon = IconMap[type];
        return <SvgIconWrapper {...rest}>{Icon && <Icon />}</SvgIconWrapper>;
    }
}

export default SvgIcon;
SvgIcon.Type = IconType;
