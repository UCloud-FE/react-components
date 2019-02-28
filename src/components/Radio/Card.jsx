import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { RadioCardWrap, RadioCardHeader, RadioCardContent, RadioCardIcon, RadioCardDisabledLabelWrap } from './style';

class Card extends PureComponent {
    static propTypes = {
        title: PropTypes.node,
        children: PropTypes.node,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        multiple: PropTypes.bool,
        disabledLabel: PropTypes.node
    };
    render() {
        const { title, children, checked, disabled, multiple, disabledLabel, ...rest } = this.props;
        return (
            <RadioCardWrap {...{ checked, disabled }} {...rest}>
                <RadioCardHeader>
                    {title}
                    {checked ? (
                        <RadioCardIcon type="circle-check_hover" />
                    ) : disabled ? (
                        <RadioCardDisabledLabelWrap>{disabledLabel}</RadioCardDisabledLabelWrap>
                    ) : multiple ? (
                        <RadioCardIcon type="cbox" />
                    ) : null}
                </RadioCardHeader>
                <RadioCardContent>{children}</RadioCardContent>
            </RadioCardWrap>
        );
    }
}

export default Card;
