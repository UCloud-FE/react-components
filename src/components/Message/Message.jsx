import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Icon from 'src/components/Icon';
import deprecatedLog from 'src/utils/deprecatedLog';

import { MessageWrap, IconWrap, ContentWrap } from './style';

export const deprecatedLogForStyleTypeInfo = _.once(() => deprecatedLog('Message styleType "info"', '"success"'));

const StyleType = ['default', 'success', 'warning', 'error'];

class Message extends Component {
    static propTypes = {
        /** @ignore */
        className: PropTypes.string,
        /** @ignore */
        children: PropTypes.node,
        /** 样式风格 */
        styleType: PropTypes.oneOf(StyleType)
    };
    static defaultProps = {
        styleType: 'default'
    };
    componentWillMount = () => {
        const { styleType } = this.props;
        if (styleType === 'info') {
            deprecatedLogForStyleTypeInfo();
        }
    };

    render() {
        const { children, ...rest } = this.props;
        return (
            <MessageWrap {...rest}>
                <IconWrap>
                    <Icon type="circle-mark2" />
                </IconWrap>
                <ContentWrap>{children}</ContentWrap>
            </MessageWrap>
        );
    }
}

Message.StyleType = StyleType;

export default Message;
