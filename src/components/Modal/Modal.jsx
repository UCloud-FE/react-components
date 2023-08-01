import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';

import Button from 'src/components/Button';
import SvgIcon from 'src/components/SvgIcon';
import Notice from 'src/components/Notice';
import { animationPrefixCls } from 'src/style/globalAnimation';
import localeConsumerDecorator from 'src/components/LocaleProvider/localeConsumerDecorator';
import { Provider } from 'src/components/Popover/ContainerContext';

import { prefixCls, noticeCls, ModalWrap } from './style';
import LOCALE from './locale/zh_CN';

const Size = ['sm', 'md', 'lg'];

const ModalNotice = ({ notice }) => {
    return notice ? (
        React.isValidElement(notice) ? (
            <Notice className={noticeCls}>{notice}</Notice>
        ) : (
            <Notice {...notice} className={classnames(noticeCls, notice.className)}></Notice>
        )
    ) : null;
};

@localeConsumerDecorator({ defaultLocale: LOCALE, localeName: 'Modal', requireRuntimeLocale: true })
class Modal extends Component {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node.isRequired,
        /** 头部内容 */
        title: PropTypes.node,
        /** 底部内容 */
        footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
        /** 显示与否 */
        visible: PropTypes.bool,
        /** 弹窗尺寸 */
        size: PropTypes.oneOf(Size),
        /** 弹窗的z-index */
        zIndex: PropTypes.number,
        /** 是否有关闭按钮 */
        closable: PropTypes.bool,
        /** 是否有遮罩 */
        mask: PropTypes.bool,
        /** 是否可以点击遮罩关闭 */
        maskClosable: PropTypes.bool,
        /** 是否可以esc关闭 */
        keyboard: PropTypes.bool,
        /** 点击关闭按钮、默认取消按钮、遮罩进行关闭时的回调 */
        onClose: PropTypes.func,
        /** 点击默认的确认按钮时的回调 */
        onOk: PropTypes.func,
        /** 默认展示的确定按钮的自定义 props */
        okButtonProps: PropTypes.object,
        /** 默认展示的取消按钮的自定义 props */
        cancelButtonProps: PropTypes.object,
        /** 关闭后的回调 */
        afterClose: PropTypes.func,
        /** 关闭后是否自动销毁 */
        destroyOnClose: PropTypes.bool,
        /** 遮罩层的动画 */
        maskAnimation: PropTypes.string,
        /** 弹窗的动画 */
        animation: PropTypes.string,
        /** 弹窗部分的类名 */
        className: PropTypes.string,
        /** 弹窗包裹容器的类名 */
        wrapClassName: PropTypes.string,
        /** 自定义预设部分样式 */
        customStyle: PropTypes.shape({}),
        /** 弹窗的样式 */
        style: PropTypes.object,
        /** 弹窗的内容部分的样式 */
        bodyStyle: PropTypes.object,
        /** 遮罩层的样式 */
        maskStyle: PropTypes.object,
        /** @ignore */
        locale: PropTypes.object,
        /** 传入 node 显示提示框或使用 Notice 组件的 props 来自定义提示 */
        notice: PropTypes.oneOfType([PropTypes.node, PropTypes.object])
    };
    static defaultProps = {
        maskAnimation: 'fade',
        animation: 'fade',
        size: 'md',
        zIndex: 1010,
        closable: true,
        mask: true
    };
    getDefaultFooter = () => {
        const { onOk, onClose, locale, okButtonProps, cancelButtonProps } = this.props;
        return [
            <Button size="lg" key="cancel" onClick={onClose} style={{ marginRight: 8 }} {...cancelButtonProps}>
                {locale.cancel}
            </Button>,
            <Button size="lg" key="confirm" onClick={onOk} styleType="primary" {...okButtonProps}>
                {locale.confirm}
            </Button>
        ];
    };
    savePopupContainer = ref => {
        this.popupContainer = ref;
    };
    getPopupContainer = () => this.popupContainer && this.popupContainer;
    render() {
        const {
            title,
            footer = this.getDefaultFooter(),
            maskAnimation,
            animation,
            style,
            size,
            closable,
            className,
            onClose,
            locale,
            children,
            notice,
            ...rest
        } = this.props;
        const width = {
            sm: 400,
            md: 700,
            lg: 800
        }[size];
        return (
            <Provider value={{}}>
                <ModalWrap
                    {...rest}
                    trueClassName={className}
                    style={{
                        width: width,
                        ...style
                    }}
                    prefixCls={prefixCls}
                    closable={false}
                    maskTransitionName={`${animationPrefixCls}-${maskAnimation}`}
                    transitionName={`${animationPrefixCls}-${animation}`}
                    onClose={onClose}
                    title={[
                        <div key="content" className={`${prefixCls}-title-content`}>
                            {title}
                        </div>,
                        closable && (
                            <span className={`${prefixCls}-close`} onClick={onClose}>
                                <SvgIcon key="close" type="cross-circle" className={`${prefixCls}-close-svg`} />
                            </span>
                        )
                    ]}
                    footer={_.isFunction(footer) ? footer({ locale }) : footer}
                >
                    <div ref={this.savePopupContainer}></div>
                    <ModalNotice notice={notice} />
                    {children}
                </ModalWrap>
            </Provider>
        );
    }
}

export default Modal;
Modal.Size = Size;
