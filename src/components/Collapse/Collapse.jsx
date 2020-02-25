import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createReactContext from 'create-react-context';

import storeDecorator from 'src/decorators/selectableWithStore/store';
import uncontrolledDecorator from 'src/decorators/uncontrolled';

export const StoreContext = createReactContext();

@uncontrolledDecorator({ valueName: 'openKeys' })
@storeDecorator({
    valueName: 'openKeys',
    childValueName: 'panelKey',
    StoreContext
})
class Collapse extends Component {
    static propTypes = {
        /** 激活的面板，multiple时为数组值，controlled */
        openKeys: PropTypes.any,
        /** 默认激活的面板，multiple时为数组值，uncontrolled */
        defaultOpenKeys: PropTypes.array,
        /** 是否可以多个同时打开 */
        multiple: PropTypes.bool,
        /** @ignore */
        selectable: PropTypes.bool,
        /** @ignore */
        theme: PropTypes.any,
        /** 变化回调 */
        onChange: PropTypes.func
    };
    static defaultProps = {
        selectable: true,
        multiple: true
    };
    render() {
        // eslint-disable-next-line no-unused-vars
        const { openKeys, defaultOpenKeys, multiple, selectable, onChange, theme, ...rest } = this.props;
        return <div {...rest} />;
    }
}

export default Collapse;
