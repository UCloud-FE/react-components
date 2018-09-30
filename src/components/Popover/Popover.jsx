import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { polyfill } from 'react-lifecycles-compat';

import placements from './placements';
import { prefixCls, animationPrefixCls, PopoverWrap } from './style';

const Animation = ['fade', 'zoom', 'bounce', 'slide-up'];
const Trigger = ['hover', 'focus', 'click', 'contextMenu'];
const Placement = Object.keys(placements);

class Popover extends Component {
    static propTypes = {
        /** 受控，控制弹出层展示 */
        visible: PropTypes.bool,
        /** 非受控，是否默认展示弹出层 */
        defaultVisible: PropTypes.bool,
        /** 弹出层显示隐藏时触发 */
        onVisibleChange: PropTypes.func,
        /** 如何触发弹出层，focus需要注意被包裹元素必须能触发focus事件，如链接、按钮、input等 */
        trigger: PropTypes.arrayOf(PropTypes.oneOf(Trigger)),
        /** 根据鼠标位置定位 */
        alignPoint: PropTypes.bool,
        /** @ignore */
        showAction: PropTypes.array,
        /** @ignore */
        hideAction: PropTypes.array,
        /** 位置 */
        placement: PropTypes.oneOf(Placement),
        /**
         * @ignore
         * 自定义定位配置
         */
        builtinPlacements: PropTypes.object,
        /** 自定义定位 */
        align: PropTypes.object,
        /** 尺寸自适应，'width', 'minWidth', 'height', 'minHeight' 或混合使用 */
        stretch: PropTypes.arrayOf(PropTypes.oneOf(['width', 'minWidth', 'height', 'minHeight'])),
        /** 弹出层内容 */
        popup: PropTypes.node,
        /** 弹出层的类名 */
        popupClassName: PropTypes.string,
        /** 弹出层的样式 */
        popupStyle: PropTypes.object,
        /** 弹出层的z-index */
        zIndex: PropTypes.number,
        /** 自定义弹出层容器 */
        getPopupContainer: PropTypes.func,
        /**
         * @ignore
         * 自定义类名前缀
         */
        prefixCls: PropTypes.string,
        /** @ignore */
        children: PropTypes.any,
        /** 动画名称，slide-up只支持上下方向的弹窗 */
        animation: PropTypes.oneOf(Animation),
        /**
         * @ignore
         * 自定义动画
         */
        transitionName: PropTypes.string,
        /**
         * 更新时强制重新定位
         * @ignore
         */
        forceAlignWhenUpdate: PropTypes.bool,
        /** @ignore */
        className: PropTypes.string
    };

    static defaultProps = {
        trigger: ['hover'],
        showAction: [],
        hideAction: [],
        popupClassName: '',
        animation: 'fade',
        popupStyle: {},
        defaultVisible: false,
        onVisibleChange() {},
        placement: 'bottomLeft',
        builtinPlacements: placements,
        prefixCls: prefixCls
    };

    constructor(props) {
        super(props);
        if ('visible' in props) {
            this.state = {
                visible: props.visible
            };
        } else {
            this.state = {
                visible: props.defaultVisible
            };
        }
    }

    componentDidMount = () => {
        document.addEventListener('scroll', this.forceAlign, true);
    };
    componentWillUnmount = () => {
        document.removeEventListener('scroll', this.forceAlign, true);
    };
    forceAlign = _.debounce(() => {
        this.trigger && this.trigger.forcePopupAlign();
    }, 100);

    componentDidUpdate = () => {
        this.props.forceAlignWhenUpdate && this.forceAlign();
    };

    onVisibleChange = visible => {
        const props = this.props;
        if (!('visible' in props)) {
            this.setState({
                visible
            });
        }
        props.onVisibleChange(visible);
    };

    static getDerivedStateFromProps(nextProps) {
        if ('visible' in nextProps) {
            return {
                visible: nextProps.visible
            };
        }
        return null;
    }

    getPopup() {
        const { popup } = this.props;
        return popup;
    }

    getPopupDomNode() {
        return this.trigger.getPopupDomNode();
    }

    saveTrigger = node => {
        this.trigger = node;
    };

    render() {
        const {
            children,
            transitionName,
            animation,
            align,
            placement,
            trigger,
            stretch = [],
            className,
            ...rest
        } = this.props;
        const popup = this.getPopup();
        return (
            <PopoverWrap
                {...rest}
                triggerRef={this.saveTrigger}
                action={trigger}
                popupPlacement={placement}
                popupAlign={align}
                popupTransitionName={transitionName || animation ? animationPrefixCls + '-' + animation : null}
                popupVisible={popup == null ? false : this.state.visible}
                popup={popup == null ? <div /> : popup}
                onPopupVisibleChange={this.onVisibleChange}
                stretch={stretch.join('')}
                trueClassName={className}
            >
                {children}
            </PopoverWrap>
        );
    }
}

Object.assign(Popover, {
    Animation,
    Trigger,
    Placement
});

polyfill(Popover);
export default Popover;

export { prefixCls };
