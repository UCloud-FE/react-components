import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SvgIcon from 'src/components/SvgIcon';
import deprecatedLog from 'src/utils/deprecatedLog';

import { MessageWrap, TipIcon, IconWrap, CloseIconWrap, TitleWrap, FooterWrap, ContentWrap, LeftPrefix } from './style';

export const deprecatedLogForStyleTypeInfo = deprecatedLog('Message styleType "info"', '"success"');

const StyleType = ['default', 'success', 'loading', 'warning', 'error'];

const IconMap = {
    default: 'circle-mark-fill',
    error: 'circle-cross-fill',
    success: 'circle-yes-md-fill',
    warning: 'circle-mark-fill',
    loading: 'loading-line'
};

class Message extends Component {
    static propTypes = {
        /** 是否可关闭 */
        closable: PropTypes.bool,
        /** 标题 */
        title: PropTypes.node,
        /** 底栏 */
        footer: PropTypes.node,
        /** 关闭回调 */
        onClose: PropTypes.func,
        /** @ignore */
        className: PropTypes.string,
        /** @ignore */
        children: PropTypes.node,
        /** 样式风格，目前只影响 Icon */
        styleType: PropTypes.oneOf(StyleType)
    };
    static defaultProps = {
        styleType: 'default',
        closable: true
    };
    componentWillMount = () => {
        const { styleType } = this.props;
        if (styleType === 'info') {
            deprecatedLogForStyleTypeInfo();
        }
    };
    close = () => {
        const { onClose = () => {} } = this.props;
        onClose();
    };
    render() {
        const { children, styleType, closable, title, footer, ...rest } = this.props;
        return (
            <MessageWrap {...rest} styleType={styleType}>
                <LeftPrefix styleType={styleType} />
                <IconWrap>
                    <TipIcon
                        styleType={styleType}
                        spin={styleType === 'loading'}
                        size="20px"
                        type={IconMap[styleType] || 'exclamation-circle-filled'}
                    />
                </IconWrap>
                {closable && (
                    <CloseIconWrap onClick={this.close}>
                        <SvgIcon size="20px" type="cross" />
                    </CloseIconWrap>
                )}
                {title && (children ? <TitleWrap>{title}</TitleWrap> : <ContentWrap>{title}</ContentWrap>)}
                {children && <ContentWrap>{children}</ContentWrap>}
                {footer && <FooterWrap>{footer}</FooterWrap>}
            </MessageWrap>
        );
    }
}

Message.StyleType = StyleType;

export default Message;
