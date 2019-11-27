import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StepsWrapper } from './style';
import Step from './Step';
import Link from './Link';

const Status = ['current', 'loading', 'error'];

class Steps extends Component {
    static propTypes = {
        /** 步骤列表 */
        steps: PropTypes.arrayOf(
            PropTypes.shape({
                /** 步骤的 key，不传为数组索引 */
                key: PropTypes.string,
                /** 步骤的显示文字，默认为索引 + 1 */
                step: PropTypes.node,
                /** 步骤的标题内容 */
                title: PropTypes.node,
                /** 步骤的备注 */
                remark: PropTypes.node
            })
        ).isRequired,
        /** 当前步骤的 key，不传或传 null 时为全部完成 */
        current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /** 当前步骤的状态 */
        status: PropTypes.oneOf(Status)
    };
    static defaultProps = {
        status: 'current'
    };
    renderSteps = (steps, current, status) => {
        let pos = 'before';
        const l = steps.length;
        return steps.map((step, i) => {
            const { key = i, step: stepContent = i + 1, ...rest } = step;
            const isCurrent = current === key;

            let finalStatus;
            if (isCurrent) {
                pos = 'after';
                finalStatus = status;
            } else {
                finalStatus = pos;
            }

            return [
                <Step {...rest} key={key} status={finalStatus} step={stepContent} />,
                i < l - 1 && <Link key={`link-${key}`} status={pos} />
            ];
        });
    };
    render() {
        const { steps, current, status, ...rest } = this.props;
        return <StepsWrapper {...rest}>{this.renderSteps(steps, current, status)}</StepsWrapper>;
    }
}

export default Steps;

Steps.Status = Status;
