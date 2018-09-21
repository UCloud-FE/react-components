import React from 'react';
import PropTypes from 'prop-types';

import { TabPane as RcTabPane } from 'rc-tabs';

const Pane = props => {
    return <RcTabPane {...props} />;
};

Pane.propTypes = {
    /** tab的title内容 */
    tab: PropTypes.node,
    /** 是否强制渲染 */
    forceRender: PropTypes.bool,
    /** 是否禁用 */
    disabled: PropTypes.bool
};

// export default RcTabPane;
export default Pane;
