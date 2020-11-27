import React from 'react';
import PropTypes from 'prop-types';

import { SubAreaWrap } from './style';
import ItemPropsWrap from './ItemPropsWrap';

function SubArea({ itemProps, ...rest }) {
    return (
        <ItemPropsWrap itemProps={itemProps}>
            <SubAreaWrap {...rest} />
        </ItemPropsWrap>
    );
}

SubArea.propTypes = {
    /**
     * 如果存在会在所有包裹的 item 上附加该 props，会覆盖来自上层包裹的 itemProps
     */
    itemProps: PropTypes.shape({
        /** 具体见 item 文档 */
        labelCol: PropTypes.object,
        /** 具体见 item 文档 */
        controllerCol: PropTypes.object,
        /** 具体见 item 文档 */
        shareStatus: PropTypes.bool
    })
};

export default React.memo(SubArea);
