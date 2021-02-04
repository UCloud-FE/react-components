import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import itemDecorator from 'src/decorators/selectableWithStore/item';
import uncontrolledDecorator from 'src/decorators/uncontrolled';

import { PanelWrap } from './style';
import { StoreContext } from './Collapse';

@uncontrolledDecorator({ valueName: 'open' })
@itemDecorator({
    checkedName: 'open',
    valueName: 'panelKey',
    StoreContext
})
class Panel extends PureComponent {
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
        /** 关闭时子组件不会更新 */
        ignoreUpdateWhenClose: PropTypes.bool,
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
    firstRender = true;
    cacheChild = null;
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
    renderChildren = () => {
        const firstRender = this.firstRender;
        const { children, open, forceRender, ignoreUpdateWhenClose } = this.props;
        if (open || !ignoreUpdateWhenClose || !this.cacheChild) {
            const shouldRender = forceRender || open || !firstRender;
            this.cacheChild = shouldRender ? children : null;
            if (firstRender && shouldRender) this.firstRender = false;
        }
        return <PanelWrap open={open}>{this.cacheChild}</PanelWrap>;
    };
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
            ignoreUpdateWhenClose,
            ...rest
        } = this.props;
        /* eslint-enable no-unused-vars */
        return (
            <div {...rest}>
                {titlePosition === 'top' && this.renderTitle()}
                {this.renderChildren()}
                {titlePosition === 'bottom' && this.renderTitle()}
            </div>
        );
    }
}

export default Panel;
