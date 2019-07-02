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
                {title == null ? null : (
                    <RadioCardHeader>
                        {title}
                        {disabled && disabledLabel ? (
                            <RadioCardDisabledLabelWrap>{disabledLabel}</RadioCardDisabledLabelWrap>
                        ) : multiple ? (
                            checked ? (
                                <RadioCardIcon type="checkbox-ed" />
                            ) : (
                                <RadioCardIcon type="checkbox" />
                            )
                        ) : null}
                    </RadioCardHeader>
                )}
                <RadioCardContent>{children}</RadioCardContent>
            </RadioCardWrap>
        );
    }
}

export default Card;
