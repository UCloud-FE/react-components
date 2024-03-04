import React, { Component } from 'react';
import PropTypes from 'prop-types';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import { Provider } from 'src/components/Popover/ContainerContext';
import SvgIcon from 'src/components/SvgIcon';
import { DrawerWrap, CloseHandler, closeHandlerIconCls } from './style';
import { buffer } from 'src/libs/rc-align/util';

const Placement = ['left', 'right', 'top', 'bottom'];
const SPACING_SPACE = 72;

function compareObjects(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    return keys1.every(key => obj1[key] === obj2[key]);
}
class Drawer extends Component {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node.isRequired,
        /** 是否显示，controlled */
        visible: PropTypes.bool,
        /** 是否有遮罩 */
        mask: PropTypes.bool,
        /** 是否可以点击遮罩关闭 */
        maskClosable: PropTypes.bool,
        /** 是否可以esc关闭 */
        keyboard: PropTypes.bool,
        /** 点击关闭按钮、遮罩进行关闭时的回调 */
        onClose: PropTypes.func,
        /** 关闭后是否自动销毁 */
        destroyOnClose: PropTypes.bool,
        /** 弹出位置 */
        placement: PropTypes.oneOf(Placement),
        /** 抽屉的宽度，left right可用 */
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /** 抽屉的高度，top bottom可用 */
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /** 设置抽屉容器 */
        getContainer: PropTypes.func,
        /** 弹出层的z-index */
        zIndex: PropTypes.number,
        /** 监听间隔时长 */
        buffertime: PropTypes.number,
        /** 传入 false/null 隐藏关闭控件，或自定义控件 */
        closeHandler: PropTypes.oneOfType([PropTypes.oneOf([null, false]), PropTypes.node]),
        /** @ignore */
        level: PropTypes.any
    };
    static defaultProps = {
        visible: false,
        mask: true,
        maskClosable: true,
        keyboard: false,
        onClose: () => {},
        level: null,
        placement: 'right',
        buffertime: 50,
        zIndex: 1010
    };
    state = {
        visible: this.props.visible,
        width: this.props.width,
        height: this.props.height
    };
    componentDidMount() {
        this.forceSize();
        this.startMonitorWindowResize();
    }
    componentDidUpdate(prevProps) {
        let reSize = false;
        if (!compareObjects(this.props, prevProps)) {
            reSize = true;
        }
        if (reSize) {
            this.forceSize();
        }

        this.startMonitorWindowResize();
    }
    componentWillUnmount() {
        this.stopMonitorWindowResize();
    }
    startMonitorWindowResize() {
        const { buffertime } = this.props;
        if (!this.resizeHandler) {
            this.bufferMonitor = buffer(this.forceSize, buffertime);
            this.resizeHandler = addEventListener(window, 'resize', this.bufferMonitor);
        }
    }
    stopMonitorWindowResize() {
        if (this.resizeHandler) {
            this.bufferMonitor.clear();
            this.resizeHandler.remove();
            this.resizeHandler = null;
        }
    }
    getFinalSize(type, sizeNumber) {
        const viewport = window[`inner${type}`] || document['documentElement'][`client${type}`];
        const flagSize = viewport - SPACING_SPACE;
        const min = flagSize < sizeNumber ? flagSize : sizeNumber;
        return min;
    }
    forceSize = () => {
        const { width, height, placement } = this.props;

        const finalWidth =
            !width || isNaN(parseInt(width)) || String(width).includes('%')
                ? width
                : ['left', 'right'].includes(placement)
                ? `${this.getFinalSize('Width', parseInt(width))}px`
                : '100%';
        const finalHeight =
            !height || isNaN(parseInt(height)) || String(height).includes('%')
                ? height
                : ['top', 'bottom'].includes(placement)
                ? `${this.getFinalSize('Hight', parseInt(height))}px`
                : '100%';

        this.setState({
            width: finalWidth,
            height: finalHeight
        });
    };
    onMaskClick = () => {
        const { onClose, maskClosable } = this.props;
        maskClosable && onClose();
    };
    afterVisibleChange = visible => {
        this.setState({
            visible
        });
    };
    getDestroy = () => {
        const { destroyOnClose, visible } = this.props;
        const { visible: visibleState } = this.state;
        return destroyOnClose && !visible && !visibleState;
    };
    getShow = () => {
        const { visible } = this.props;
        const { visible: visibleState } = this.state;
        return visible || visibleState;
    };
    handleResize = () => {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        });
    };
    renderCloseHandler = ({ closeHandler, onClose, show, visible }) => {
        if (!show) return null;
        return closeHandler === undefined ? (
            <CloseHandler hidden={!visible} onClick={onClose}>
                <SvgIcon type="line-arrow-up" className={closeHandlerIconCls} />
            </CloseHandler>
        ) : (
            closeHandler
        );
    };

    render() {
        // eslint-disable-next-line no-unused-vars
        const { children, visible, mask, maskClosable, onClose, destroyOnClose, closeHandler, ...rest } = this.props;
        const destroy = this.getDestroy();
        const show = this.getShow();
        const { width: finalWidth, height: finalHeight } = this.state;

        return (
            !destroy && (
                <Provider value={{}}>
                    <DrawerWrap
                        {...rest}
                        open={visible}
                        width={finalWidth}
                        height={finalHeight}
                        onMaskClick={this.onMaskClick}
                        showMask={mask}
                        handler={false}
                        afterVisibleChange={this.afterVisibleChange}
                        show={show}
                        closeHandler={this.renderCloseHandler({ closeHandler, onClose, show, visible })}
                    >
                        {children}
                    </DrawerWrap>
                </Provider>
            )
        );
    }
}
Drawer.Placement = Placement;
export default Drawer;
