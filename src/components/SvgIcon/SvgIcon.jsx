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
import DottedLineArrowRight from './icons/DottedLineArrowRight';
import Plus from './icons/Plus';
import Minus from './icons/Minus';
import Circle from './icons/Circle';
import Horz from './icons/Horz';
import ArrowUp from './icons/ArrowUp';
import ArrowDown from './icons/ArrowDown';
import ArrowLeft from './icons/ArrowLeft';
import ArrowRight from './icons/ArrowRight';
import TriangleUp from './icons/TriangleUp';
import TriangleDown from './icons/TriangleDown';
import TriangleLeft from './icons/TriangleLeft';
import TriangleRight from './icons/TriangleRight';
import LineArrowUp from './icons/LineArrowUp';
import LineArrowDown from './icons/LineArrowDown';
import Search from './icons/Search';
import Ellipsis from './icons/Ellipsis';
import Edit from './icons/Edit';
import Refresh from './icons/Refresh';
import Trash from './icons/Trash';
import Eye from './icons/Eye';
import Calendar from './icons/Calendar';
import Clock from './icons/Clock';
import Sort from './icons/Sort';
import Filter from './icons/Filter';
import Cog from './icons/Cog';
import Dragger from './icons/Dragger';
import DoubleArrowRight from './icons/DoubleArrowRight';
import DoubleArrowLeft from './icons/DoubleArrowLeft';
import CircleMarkFill from './icons/CircleMarkFill';
import CircleCrossFill from './icons/CircleCrossFill';
import CircleYesMdFill from './icons/CircleYesMdFill';
import LoadingLine from './icons/LoadingLine';

// circle
import QuestionCircle from './icons/QuestionCircle';
import CrossCircle from './icons/CrossCircle';

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
    'dotted-line-arrow-right': DottedLineArrowRight,
    plus: Plus,
    minus: Minus,
    circle: Circle,
    horz: Horz,
    'arrow-up': ArrowUp,
    'arrow-down': ArrowDown,
    'arrow-left': ArrowLeft,
    'arrow-right': ArrowRight,
    'double-arrow-left': DoubleArrowLeft,
    'double-arrow-right': DoubleArrowRight,
    'triangle-up': TriangleUp,
    'triangle-down': TriangleDown,
    'triangle-left': TriangleLeft,
    'triangle-right': TriangleRight,
    'line-arrow-up': LineArrowUp,
    'line-arrow-down': LineArrowDown,
    search: Search,
    ellipsis: Ellipsis,
    edit: Edit,
    refresh: Refresh,
    trash: Trash,
    eye: Eye,
    calendar: Calendar,
    clock: Clock,
    sort: Sort,
    filter: Filter,
    cog: Cog,
    dragger: Dragger,
    'circle-mark-fill': CircleMarkFill,
    'circle-cross-fill': CircleCrossFill,
    'circle-yes-md-fill': CircleYesMdFill,
    'loading-line': LoadingLine
};

// circle
_.forEach({ question: QuestionCircle, cross: CrossCircle }, (Icon, key) => {
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
