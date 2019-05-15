import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Icon from 'src/components/Icon';

import { InputWrap, IconWrap } from './style';

const Size = ['sm', 'md', 'lg'];

class Input extends Component {
    static propTypes = {
        /** @ignore */
        className: PropTypes.string,
        /** 图标，传入string时为图标类型，也可直接传入图标组件 */
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
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
    renderIcon = () => {
        const { icon, size } = this.props;
        if (_.isString(icon)) {
            return (
                <IconWrap size={size}>
                    <Icon type={icon} />
                </IconWrap>
            );
        } else if (React.isValidElement(icon)) {
            return <IconWrap size={size}>{icon}</IconWrap>;
        } else {
            return null;
        }
    };
    render() {
        const { className, style, disabled, icon, size, ...rest } = this.props;
        return (
            <InputWrap withIcon={!!icon} size={size} className={className} style={style} disabled={disabled}>
                <input {...rest} ref={ref => (this.input = ref)} disabled={disabled} />
                {this.renderIcon()}
            </InputWrap>
        );
    }
}
Input.Size = Size;
export default Input;
