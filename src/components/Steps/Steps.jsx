import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StepsWrapper, StepsItemWrapper } from './style';
import Step from './Step';

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
                remark: PropTypes.node,
                /** 步骤的状态 */
                status: PropTypes.oneOf(['disabled', 'error', 'success', 'normal'])
            })
        ).isRequired,
        /** 当前步骤的 key，不传或传 null 时为全部完成 */
        current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /** 当前步骤的状态 */
        status: PropTypes.oneOf(Status),
        /**
         * 步骤状态改变时的回调函数
         * @param {number} current 当前步骤的key
         */
        onChange: PropTypes.func,
        /**
         * 指定步骤条方向 , 默认是horizontal
         */
        direction: PropTypes.oneOf(['horizontal', 'vertical']),
        /**
         * 横向场景，不换行, 默认是false
         */
        nowrap: PropTypes.bool
    };
    static defaultProps = {
        status: 'current',
        direction: 'horizontal',
        nowrap: false
    };
    renderSteps = ({ steps, current, status, direction, onChange, nowrap }) => {
        let pos = 'before';
        const l = steps.length;
        return steps.map((step, i) => {
            const { key = i, step: stepContent = i + 1, status: singleStatus, ...rest } = step;
            const isCurrent = current === key;

            let finalStatus;
            if (isCurrent) {
                pos = 'after';
                finalStatus = status;
            } else {
                switch (singleStatus) {
                    case 'error':
                        pos = 'error';
                        break;
                    case 'success':
                        pos = 'before';
                        break;
                    case 'normal':
                        pos = 'after';
                        break;
                    default:
                }
                finalStatus = pos;
            }
            const canHover = typeof onChange === 'function' && singleStatus !== 'disabled' ? true : false;
            const showTitle = rest.title ? true : false;
            return (
                <StepsItemWrapper
                    key={key}
                    direction={direction}
                    status={finalStatus}
                    canHover={canHover}
                    showTitle={showTitle}
                    nowrap={nowrap}
                    onClick={() => {
                        if (canHover) {
                            onChange(key, finalStatus);
                        }
                    }}
                >
                    <Step
                        {...rest}
                        key={`step-${key}`}
                        status={finalStatus}
                        step={stepContent}
                        showTitle={showTitle}
                        isLast={i === l - 1 ? true : false}
                    />
                </StepsItemWrapper>
            );
        });
    };
    render() {
        const { steps, current, status, onChange, direction, nowrap, ...rest } = this.props;
        return (
            <StepsWrapper direction={direction} nowrap={nowrap} {...rest}>
                {this.renderSteps({ steps, current, status, direction, onChange, nowrap })}
            </StepsWrapper>
        );
    }
}

export default Steps;

Steps.Status = Status;
