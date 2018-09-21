import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { OptionWrap } from './style';
import { SelectContext } from './Select';

class Option extends Component {
    static propTypes = {
        /** 值 */
        value: PropTypes.any,
        /** @ignore */
        className: PropTypes.string,
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** @ignore */
        onChange: PropTypes.func,
        /** @ignore */
        selected: PropTypes.bool,
        /** @ignore */
        multiple: PropTypes.bool,
        /** @ignore */
        children: PropTypes.node
    };
    static getItemKey = item => {
        return item.props.value;
    };
    getVisible = handleSearch => {
        const { value } = this.props;

        return handleSearch(value, this);
    };
    render() {
        const { value, ...rest } = this.props;
        return (
            <SelectContext.Consumer>
                {({ handleSearch }) => {
                    const visible = handleSearch(value, this);
                    return <OptionWrap hidden={!visible} {...rest} itemKey={value} />;
                }}
            </SelectContext.Consumer>
        );
    }
}

Option.isMenuItem = true;

export default Option;
