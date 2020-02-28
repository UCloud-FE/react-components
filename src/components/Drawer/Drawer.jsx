import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { DrawerWrap, CloseHandlerWrapper, CloseIcon } from './style';

const Placement = ['left', 'right', 'top', 'bottom'];

class CloseHandler extends PureComponent {
    static propTypes = {
        visible: PropTypes.bool,
        onClose: PropTypes.func.isRequired
    };
    render() {
        const { visible, onClose } = this.props;
        return (
            <CSSTransition in={visible} unmountOnExit={false} classNames="uc-fe-animation-fade" timeout={100}>
                <CloseHandlerWrapper onClick={onClose}>
                    <CloseIcon />
                </CloseHandlerWrapper>
            </CSSTransition>
        );
    }
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
        /** 传入 false/null 隐藏关闭控件 */
        closeHandler: PropTypes.oneOf([null, false]),
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
        zIndex: 1010
    };
    state = {
        visible: this.props.visible
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
    getDestory = () => {
        const { destroyOnClose, visible } = this.props;
        const { visible: visibleState } = this.state;
        return destroyOnClose && !visible && !visibleState;
    };
    getShow = () => {
        const { visible } = this.props;
        const { visible: visibleState } = this.state;
        return visible || visibleState;
    };
    renderCloseHandler = ({ closeHandler, onClose, show, visible }) => {
        if (!show) return null;
        return closeHandler === undefined ? <CloseHandler visible={visible} onClose={onClose} /> : closeHandler;
    };
    render() {
        // eslint-disable-next-line no-unused-vars
        const { children, visible, mask, maskClosable, onClose, destroyOnClose, closeHandler, ...rest } = this.props;
        const destory = this.getDestory();
        const show = this.getShow();
        return (
            !destory && (
                <DrawerWrap
                    {...rest}
                    open={visible}
                    onMaskClick={this.onMaskClick}
                    showMask={mask}
                    handler={false}
                    afterVisibleChange={this.afterVisibleChange}
                    show={show}
                    closeHandler={this.renderCloseHandler({ closeHandler, onClose, show, visible })}
                >
                    {children}
                </DrawerWrap>
            )
        );
    }
}
Drawer.Placement = Placement;
export default Drawer;
