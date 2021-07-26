import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { polyfill } from 'react-lifecycles-compat';

import placements from './placements';
import { prefixCls, animationPrefixCls, PopoverWrap } from './style';
import { Consumer } from './ContainerContext';

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
        /** 如何触发弹出层，focus 需要注意被包裹元素必须能触发 focus 事件，如链接、按钮、input 等 */
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
        /** 弹出层的 z-index */
        zIndex: PropTypes.number,
        /** 自定义弹出层容器 */
        getPopupContainer: PropTypes.func,
        /** 是否使用最上层传入的安全容器，如果为 function，在没有找到安全容器时将会使用该 function 作为 getPopupContainer 的值 */
        forwardPopupContainer: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
        /**
         * @ignore
         * 自定义类名前缀
         */
        prefixCls: PropTypes.string,
        /** 需要对子元素进行定位，所以只接收一个有效 react 元素（不接收文本节点） */
        children: PropTypes.element.isRequired,
        /** 动画名称，slide-up 只支持上下方向的弹窗 */
        animation: PropTypes.oneOf(Animation),
        /**
         * @ignore
         * 自定义动画
         */
        transitionName: PropTypes.string,
        /**
         * @ignore
         * 更新时强制重新定位
         */
        forceAlignWhenUpdate: PropTypes.bool,
        /** 滚动时强制重新定位 */
        forceAlignWhenScroll: PropTypes.bool,
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
        forceAlignWhenScroll: true,
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

    // 滚动锁
    __scroll_lock = false;
    // 滚动绑定
    __scroll_bind = false;
    bindPopupWrap = _ref => {
        if (this.popupWrap === _ref) return;
        if (this.popupWrap) {
            this.popupWrap.removeEventListener('scroll', this.onPopupWrapScroll, true);
        }
        this.popupWrap = _ref;
        if (this.popupWrap) {
            this.popupWrap.addEventListener('scroll', this.onPopupWrapScroll, true);
        }
    };
    onPopupWrapScroll = () => {
        this.__scroll_lock = true;
        this.unlockScroll();
    };
    unlockScroll = _.debounce(() => {
        this.__scroll_lock = false;
    }, 200);

    onScroll = () => {
        if (this.__scroll_lock) return;
        this.forceAlign();
    };
    forceAlign = _.throttle(
        () => {
            if (!this.state.visible) return;
            if (this.__scroll_lock) return;
            this.trigger && this.trigger.forcePopupAlign();
        },
        33,
        { leading: false }
    );

    bindScroll = () => {
        if (!this.__scroll_bind) {
            document.addEventListener('scroll', this.onScroll, true);
            this.__scroll_bind = true;
        }
    };
    unbindScroll = () => {
        if (this.__scroll_bind) {
            document.removeEventListener('scroll', this.onScroll, true);
            this.__scroll_bind = false;
        }
    };
    updateScroll = () => {
        if (this.props.forceAlignWhenScroll) {
            this.bindScroll();
        } else {
            this.unbindScroll();
        }
    };
    componentDidMount = () => {
        this.updateScroll();
    };
    componentWillUnmount = () => {
        this.unbindScroll();
    };
    componentDidUpdate = prevProps => {
        if (prevProps.forceAlignWhenScroll !== this.props.forceAlignWhenScroll) {
            this.updateScroll();
        }
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
        return <div ref={this.bindPopupWrap}>{popup}</div>;
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
            getPopupContainer,
            forwardPopupContainer,
            ...rest
        } = this.props;
        const popup = this.getPopup();

        const renderPopover = getPopupContainer => (
            <PopoverWrap
                {...rest}
                triggerRef={this.saveTrigger}
                action={trigger}
                popupPlacement={placement}
                popupAlign={align}
                popupTransitionName={transitionName || animation ? animationPrefixCls + '-' + animation : null}
                popupVisible={popup == null ? false : this.state.visible}
                popup={popup}
                onPopupVisibleChange={this.onVisibleChange}
                stretch={stretch.join('')}
                trueClassName={className}
                getPopupContainer={getPopupContainer}
            >
                {children}
            </PopoverWrap>
        );
        return !getPopupContainer && forwardPopupContainer ? (
            <Consumer>
                {({ getPopupContainer: getPopupContainerFromContext } = {}) =>
                    renderPopover(
                        getPopupContainerFromContext ||
                            (typeof forwardPopupContainer === 'function' ? forwardPopupContainer : undefined)
                    )
                }
            </Consumer>
        ) : (
            renderPopover(getPopupContainer)
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
