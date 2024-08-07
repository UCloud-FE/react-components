import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import StepIcon from './StepIcon';
import { StepWrapper, ContentWrapper, TitleWrapper, RemarkWrapper, stepWrapperCls, itemTailCls } from './style';

export default class Step extends PureComponent {
    static propTypes = {
        status: PropTypes.string,
        step: PropTypes.node,
        remark: PropTypes.node,
        title: PropTypes.node,
        isLast: PropTypes.bool,
        disabled: PropTypes.bool
    };

    render() {
        const { status, step, remark, title, isLast, ...rest } = this.props;
        return (
            <StepWrapper
                status={status}
                isLast={isLast}
                {...rest}
                className={`${stepWrapperCls} ${rest.className ? rest.className : ''}`}
            >
                <div className={itemTailCls}></div>
                <StepIcon status={status} step={step || 0} />

                <ContentWrapper>
                    <TitleWrapper>{title}</TitleWrapper>
                    {remark && <RemarkWrapper>{remark}</RemarkWrapper>}
                </ContentWrapper>
            </StepWrapper>
        );
    }
}
