import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';
import Right from './Right';
import Wrong from './Wrong';
import { IconWrapper, StepCountWrapper } from '../style';

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
                return <Right />;
            case 'after':
            case 'current':
                return <StepCountWrapper>{content}</StepCountWrapper>;
            case 'loading':
                return <Loading />;
            case 'error':
                return <Wrong />;
        }
    };
    render() {
        const { step, status, ...rest } = this.props;
        return (
            <IconWrapper spin={status === 'loading'} status={status} {...rest}>
                {this.renderContent(status, step)}
            </IconWrapper>
        );
    }
}
