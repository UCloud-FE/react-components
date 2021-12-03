import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Icon from 'src/components/Icon';
import SvgIcon from 'src/components/SvgIcon';
import deprecatedLog from 'src/utils/deprecatedLog';

import { NoticeWrap, NoticeIconWrap, ContentWrap, ActionWrap, CloseWrap, CloseIcon, iconCls } from './style';

const deprecatedLogForStyleTypeInfo = deprecatedLog('Notice styleType "info"', '"success"');

const StyleType = ['default', 'success', 'warning', 'error', 'disabled'];

class Notice extends Component {
    state = {
        closed: false
    };
    static propTypes = {
        /** @ignore */
        className: PropTypes.string,
        /** 是否显示关闭按钮 */
        closable: PropTypes.bool,
        /** 自定义前置icon，可传入Icon type或者自定义Icon，传入null、false隐藏，默认显示感叹号icon */
        icon: PropTypes.oneOfType([PropTypes.oneOf([null, false]), PropTypes.string, PropTypes.node]),
        /** @ignore */
        children: PropTypes.node,
        /** 关闭的回调 */
        onClose: PropTypes.func,
        /** 样式类型 */
        styleType: PropTypes.oneOf(StyleType),
        /** 自定义操作 */
        action: PropTypes.node
    };
    static defaultProps = {
        closable: true,
        styleType: StyleType[0],
        onClose: () => {}
    };
    onClose = e => {
        const { onClose } = this.props;
        this.setState({
            closed: true
        });
        onClose(e);
    };
    componentWillMount() {
        const { styleType } = this.props;
        if (styleType === 'info') {
            deprecatedLogForStyleTypeInfo();
        }
    }
    render() {
        // eslint-disable-next-line no-unused-vars
        const { closable, icon: _icon, children, onClose, styleType, action, ...rest } = this.props;
        const { closed } = this.state;
        let icon;
        if (_icon === null || _icon === false) {
            icon = null;
        } else if (_.isString(_icon)) {
            icon = <Icon className={iconCls} type={_icon} />;
        } else if (React.isValidElement(_icon)) {
            icon = _icon;
        } else {
            icon = <SvgIcon size="15px" className={iconCls} type="exclamation-circle-filled" />;
        }
        return closed ? null : (
            <NoticeWrap {...rest} styleType={styleType}>
                {icon && <NoticeIconWrap>{icon}</NoticeIconWrap>}
                <ContentWrap>{children}</ContentWrap>
                {action && <ActionWrap>{action}</ActionWrap>}
                {closable && (
                    <CloseWrap>
                        <CloseIcon type="cross" onClick={this.onClose} />
                    </CloseWrap>
                )}
            </NoticeWrap>
        );
    }
}

Notice.StyleType = StyleType;
export default Notice;
