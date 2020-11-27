import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';

import Icon from 'src/components/Icon';
import deprecatedLog from 'src/utils/deprecatedLog';
import ControllerContext from 'src/components/Form/ControllerContext';

import { InputWrap, TableWrap, PrefixWrap, SuffixWrap, blockCls } from './style';

const deprecatedLogForIcon = _.once(() => deprecatedLog('Input icon', 'suffix'));

const Size = ['sm', 'md', 'lg'];
const Status = ['default', 'error'];

const noop = () => {};

class Input extends PureComponent {
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
        /** 展示变更为块占位 */
        block: PropTypes.bool,
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
    saveInput = ref => (this.input = ref);
    render() {
        // eslint-disable-next-line no-unused-vars
        /* eslint-disable no-unused-vars */
        const {
            className,
            style,
            disabled,
            icon,
            size,
            suffix,
            prefix,
            onFocus,
            onBlur,
            status,
            block,
            ...rest
        } = this.props;
        /* eslint-enable no-unused-vars */
        const { focused } = this.state;
        return (
            <ControllerContext.Consumer>
                {({ status: _status }) => (
                    <InputWrap
                        onClick={this.focus}
                        className={classnames(block && blockCls, className)}
                        {...{ size, focused, style, disabled, status: status || _status }}
                    >
                        <TableWrap>
                            {this.renderPrefix()}
                            <input
                                {...rest}
                                ref={this.saveInput}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                                disabled={disabled}
                            />
                            {this.renderSuffix()}
                        </TableWrap>
                    </InputWrap>
                )}
            </ControllerContext.Consumer>
        );
    }
}
Input.Size = Size;
Input.Status = Status;
export default Input;
