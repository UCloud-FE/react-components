import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Icon from 'src/components/Icon';
import deprecatedLog from 'src/utils/deprecatedLog';

import { InputWrap, TableWrap, PrefixWrap, SuffixWrap } from './style';

const deprecatedLogForIcon = _.once(() => deprecatedLog('Input icon', 'suffix'));

const Size = ['sm', 'md', 'lg'];
const Status = ['default', 'error'];

const noop = () => {};

class Input extends Component {
    static propTypes = {
        /** @ignore */
        className: PropTypes.string,
        /**
         * @deprecated
         * 图标，传入string时为图标类型，也可直接传入图标组件
         */
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        /** 前缀 */
        prefix: PropTypes.node,
        /** 后缀 */
        suffix: PropTypes.node,
        /** 尺寸 */
        size: PropTypes.oneOf(Size),
        /** 状态 */
        status: PropTypes.oneOf(Status),
        /** @ignore */
        disabled: PropTypes.bool,
        /** @ignore */
        style: PropTypes.object,
        /** @ignore */
        onFocus: PropTypes.func,
        /** @ignore */
        onBlur: PropTypes.func
    };
    static defaultProps = {
        size: 'md'
    };
    state = {};
    renderPrefix = () => {
        const { prefix } = this.props;
        return prefix && <PrefixWrap>{prefix}</PrefixWrap>;
    };
    renderSuffix = () => {
        const { icon, suffix } = this.props;
        if ('icon' in this.props) {
            deprecatedLogForIcon();
        }
        if (suffix) {
            return <SuffixWrap>{suffix}</SuffixWrap>;
        } else if (_.isString(icon)) {
            return (
                <SuffixWrap>
                    <Icon type={icon} />
                </SuffixWrap>
            );
        } else if (React.isValidElement(icon)) {
            return <SuffixWrap>{icon}</SuffixWrap>;
        }
    };
    onFocus = (...args) => {
        const { onFocus = noop } = this.props;
        this.setState({
            focused: true
        });
        onFocus(...args);
    };
    onBlur = (...args) => {
        const { onBlur = noop } = this.props;
        this.setState({
            focused: false
        });
        onBlur(...args);
    };
    focus = () => {
        this.input && this.input.focus();
    };
    render() {
        // eslint-disable-next-line no-unused-vars
        const { className, style, disabled, icon, size, suffix, prefix, onFocus, onBlur, status, ...rest } = this.props;
        const { focused } = this.state;
        return (
            <InputWrap onClick={this.focus} {...{ size, focused, className, style, disabled, status }}>
                <TableWrap>
                    {this.renderPrefix()}
                    <input
                        {...rest}
                        ref={ref => (this.input = ref)}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        disabled={disabled}
                    />
                    {this.renderSuffix()}
                </TableWrap>
            </InputWrap>
        );
    }
}
Input.Size = Size;
Input.Status = Status;
export default Input;
