import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import itemDecorator from 'decorators/selectableWithStore/item';
import uncontrolledDecorator from 'decorators/uncontrolled';

import { PanelWrap } from './style';
import { StoreContext } from './Collapse';

@uncontrolledDecorator({ valueName: 'open' })
@itemDecorator({
    checkedName: 'open',
    valueName: 'panelKey',
    StoreContext
})
class Panel extends Component {
    static propTypes = {
        /** 标题项，为函数时会传入面板当前open和disabled状态，和toggle函数 */
        title: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
        /** @ignore */
        children: PropTypes.node,
        /** 修改回调 */
        onChange: PropTypes.func,
        /** 是否展开，controlled */
        open: PropTypes.bool,
        /** 默认展开状态，uncontrolled */
        defaultOpen: PropTypes.bool,
        /** 是否强制渲染 */
        forceRender: PropTypes.bool,
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** 唯一键值 */
        panelKey: PropTypes.any,
        /** title的位置 */
        titlePosition: PropTypes.oneOf(['top', 'bottom']),
        /** @ignore */
        multiple: PropTypes.bool
    };
    static defaultProps = {
        titlePosition: 'top'
    };
    toggle = _open => {
        const { open, onChange, disabled } = this.props;
        if (disabled) {
            return;
        }
        if (_open === undefined) {
            _open = !open;
        }
        onChange(_open);
    };
    renderTitle() {
        const { disabled, title, onChange, open } = this.props;
        return (
            <div onClick={() => !disabled && onChange(!open)}>
                {_.isFunction(title) ? title({ open, disabled, toggle: this.toggle }) : title}
            </div>
        );
    }
    render() {
        /* eslint-disable no-unused-vars */
        const {
            title,
            children,
            open,
            onChange,
            panelKey,
            multiple,
            disabled,
            forceRender,
            defaultOpen,
            titlePosition,
            ...rest
        } = this.props;
        /* eslint-enable no-unused-vars */
        return (
            <div {...rest}>
                {titlePosition === 'top' && this.renderTitle()}
                {forceRender || open ? <PanelWrap open={open}>{children}</PanelWrap> : null}
                {titlePosition === 'bottom' && this.renderTitle()}
            </div>
        );
    }
}

export default Panel;
