import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Icon from 'src/components/Icon';
import deprecatedLog from 'src/utils/deprecatedLog';

import { InputWrap, TableWrap, PrefixWrap, SuffixWrap } from './style';

const Size = ['sm', 'md', 'lg'];

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
        /** @ignore */
        disabled: PropTypes.bool,
        /** @ignore */
        style: PropTypes.object
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
        const { icon, size, suffix } = this.props;
        if (suffix) {
            return <SuffixWrap>{suffix}</SuffixWrap>;
        } else if (_.isString(icon)) {
            deprecatedLog('icon', 'suffix');
            return (
                <SuffixWrap size={size}>
                    <Icon type={icon} />
                </SuffixWrap>
            );
        } else if (React.isValidElement(icon)) {
            deprecatedLog('icon', 'suffix');
            return <SuffixWrap>{icon}</SuffixWrap>;
        }
    };
    onFocus = () => {
        this.setState({
            focused: true
        });
    };
    onBlur = () => {
        this.setState({
            focused: false
        });
    };
    focus = () => {
        this.input && this.input.focus();
    };
    render() {
        // eslint-disable-next-line no-unused-vars
        const { className, style, disabled, icon, size, suffix, prefix, ...rest } = this.props;
        const { focused } = this.state;
        return (
            <InputWrap
                size={size}
                focused={focused}
                className={className}
                style={style}
                disabled={disabled}
                onClick={this.focus}
            >
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
export default Input;
