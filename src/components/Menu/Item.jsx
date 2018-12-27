import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'src/components/Checkbox';

import { ItemWrap } from './style';

class Item extends PureComponent {
    static propTypes = {
        /** item的唯一键 */
        itemKey: PropTypes.any,
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** @ignore */
        uid: PropTypes.string,
        /** @ignore */
        selected: PropTypes.bool,
        /** @ignore */
        multiple: PropTypes.bool,
        /** @ignore */
        onSelect: PropTypes.func,
        /** @ignore */
        children: PropTypes.node
    };

    static getItemKey = item => {
        return item.props.itemKey;
    };
    render() {
        /* eslint-disable no-unused-vars */
        const { itemKey, disabled, uid, selected, multiple, onSelect, children, ...rest } = this.props;
        /* eslint-enable no-unused-vars */

        return (
            <ItemWrap
                selected={selected}
                disabled={disabled}
                onClick={() => !disabled && onSelect(multiple ? !selected : true, uid)}
                {...rest}
            >
                {multiple ? (
                    <Checkbox checked={selected} disabled={disabled}>
                        {children}
                    </Checkbox>
                ) : (
                    children
                )}
            </ItemWrap>
        );
    }
}

Item.isMenuItem = true;

export default Item;
