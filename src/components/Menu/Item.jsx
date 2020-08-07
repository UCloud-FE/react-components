import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Checkbox from 'src/components/Checkbox';

import { itemCls, selectedCls, checkboxCls, disabledCls } from './style';

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
        children: PropTypes.node,
        /** @ignore */
        className: PropTypes.string
    };

    static getItemKey = item => {
        return item.props.itemKey;
    };
    render() {
        /* eslint-disable no-unused-vars */
        const { itemKey, disabled, uid, selected, multiple, onSelect, children, className, ...rest } = this.props;
        /* eslint-enable no-unused-vars */

        return (
            <div
                className={classnames(itemCls, selected && selectedCls, disabled && disabledCls, className)}
                selected={selected}
                disabled={disabled}
                onClick={() => !disabled && onSelect(multiple ? !selected : true, uid)}
                {...rest}
            >
                {multiple ? (
                    <Checkbox className={checkboxCls} checked={selected} disabled={disabled} size="lg">
                        {children}
                    </Checkbox>
                ) : (
                    children
                )}
            </div>
        );
    }
}

Item.isMenuItem = true;

export default Item;
