import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { camel2Kebab } from 'src/utils/string';

import SvgIconWrapper from './SvgIconWrap';

import Tick from './icons/Tick';
import TickSmall from './icons/TickSmall';
import Cross from './icons/Cross';
import CrossBold from './icons/CrossBold';
import RingLoading from './icons/RingLoading';
import DottedRightLineArrow from './icons/DottedRightLineArrow';
import Plus from './icons/Plus';
import Minus from './icons/Minus';
import Circle from './icons/Circle';
import Horz from './icons/Horz';
import LeftArrow from './icons/ArrowLeft';
import RightArrow from './icons/ArrowRight';
import Refresh from './icons/Refresh';
import Trash from './icons/Trash';
import Eye from './icons/Eye';
import QuestionCircle from './icons/QuestionCircle';
import Calendar from './icons/Calendar';
import Clock from './icons/Clock';

// circle filled
import ExclamationCircleFilled from './icons/ExclamationCircleFilled';
import InfoCircleFilled from './icons/InfoCircleFilled';
import TickCircleFilled from './icons/TickCircleFilled';
import CrossCircleFilled from './icons/CrossCircleFilled';

const IconMap = {
    tick: Tick,
    'tick-small': TickSmall,
    cross: Cross,
    'cross-bold': CrossBold,
    'ring-loading': RingLoading,
    'dotted-right-line-arrow': DottedRightLineArrow,
    plus: Plus,
    minus: Minus,
    circle: Circle,
    horz: Horz,
    'arrow-left': LeftArrow,
    'arrow-right': RightArrow,
    refresh: Refresh,
    trash: Trash,
    eye: Eye,
    calendar: Calendar,
    clock: Clock
};

// circle
_.forEach({ question: QuestionCircle }, (Icon, key) => {
    IconMap[key + '-circle'] = Icon;
});

// circle filled
_.forEach(
    {
        exclamation: ExclamationCircleFilled,
        info: InfoCircleFilled,
        tick: TickCircleFilled,
        cross: CrossCircleFilled
    },
    (Icon, key) => {
        IconMap[key + '-circle-filled'] = Icon;
    }
);

// fix old
const oldMap = {
    'small-tick': 'tick-small',
    'bold-cross': 'cross-bold',
    'left-arrow': 'arrow-left',
    'right-arrow': 'arrow-right'
};

const IconType = _.keys(IconMap);

/**
 * @private
 * 内部使用的一些图标，后续可能会变更，不建议直接使用
 */
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
        const Icon = IconMap[type] || IconMap[oldMap[type]];
        return <SvgIconWrapper {...rest}>{Icon && <Icon />}</SvgIconWrapper>;
    }
}

export default SvgIcon;
SvgIcon.Type = IconType;
