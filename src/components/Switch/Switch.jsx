import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SwitchWrap, Inner, ButtonWrap, Line, OnText, OffText } from './style';
import uncontrolledDecorator from 'src/decorators/uncontrolled';

const Size = ['sm', 'md', 'lg'];

@uncontrolledDecorator({ valueName: 'checked' })
class Switch extends Component {
    static propTypes = {
        /** 是否选中 */
        checked: PropTypes.bool,
        /** 默认选中状态 */
        defaultChecked: PropTypes.bool,
        /** 选中状态改变时的回调 */
        onChange: PropTypes.func,
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** 尺寸 */
        size: PropTypes.oneOf(Size),
        /** 打开的文字 */
        onText: PropTypes.node,
        /** 关闭的文字 */
        offText: PropTypes.node
    };
    static defaultProps = {
        onChange: () => {},
        size: 'md',
        onText: 'ON',
        offText: 'OFF'
    };
    onClick = () => {
        const { checked, disabled, onChange } = this.props;
        if (disabled) return;
        onChange(!checked);
    };
    render() {
        // eslint-disable-next-line no-unused-vars
        const { checked, disabled, defaultChecked, onChange, size, onText, offText, ...rest } = this.props;
        return (
            <SwitchWrap {...rest} checked={checked} disabled={disabled} size={size} onClick={this.onClick}>
                <Inner>
                    <OnText>{onText}</OnText>
                    <OffText>{offText}</OffText>
                    <ButtonWrap>
                        <Line />
                    </ButtonWrap>
                </Inner>
            </SwitchWrap>
        );
    }
}
Switch.Size = Size;
export default Switch;
