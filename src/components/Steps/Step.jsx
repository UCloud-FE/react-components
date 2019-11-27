import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import StepIcon from './icons/Step';
import { StepWrapper, ContentWrapper, TitleWrapper, RemarkWrapper } from './style';

export default class Step extends PureComponent {
    static propTypes = {
        status: PropTypes.string,
        step: PropTypes.node,
        remark: PropTypes.node,
        title: PropTypes.node
    };

    render() {
        const { status, step, remark, title, ...rest } = this.props;
        return (
            <StepWrapper status={status} {...rest}>
                <StepIcon status={status} step={step || 0} />
                {(title || remark) && (
                    <ContentWrapper>
                        <TitleWrapper>{title}</TitleWrapper>
                        {remark && <RemarkWrapper>{remark}</RemarkWrapper>}
                    </ContentWrapper>
                )}
            </StepWrapper>
        );
    }
}
