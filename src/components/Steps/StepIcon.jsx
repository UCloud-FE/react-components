import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { IconWrapper, StepCountWrapper, Icon, iconCls } from './style';

const STATUS = ['current', 'before', 'after', 'loading', 'error'];

export default class StepIcon extends PureComponent {
    static propTypes = {
        /** 指定步骤数 */
        step: PropTypes.node,
        /** 状态 */
        status: PropTypes.oneOf(STATUS)
    };
    renderContent = (status, content) => {
        switch (status) {
            case 'before':
                return <Icon type="tick" />;
            case 'after':
            case 'current':
                return <StepCountWrapper>{content}</StepCountWrapper>;
            case 'loading':
                return <Icon type="ring-loading" spin />;
            case 'error':
                return <Icon type="cross" />;
        }
    };
    render() {
        const { step, status, ...rest } = this.props;

        return (
            <IconWrapper status={status} {...rest} className={`${iconCls} ${rest.className ? rest.className : ''}`}>
                {this.renderContent(status, step)}
            </IconWrapper>
        );
    }
}
