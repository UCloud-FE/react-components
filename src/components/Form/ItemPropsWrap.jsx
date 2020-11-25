import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ItemContext from './ItemContext';

const ItemPropsWrap = ({ itemProps, children }) => {
    if (itemProps) {
        itemProps = _.pick(itemProps, ['labelCol', 'controllerCol', 'shareStatus']);
        return <ItemContext.Provider value={itemProps}>{children}</ItemContext.Provider>;
    }
    return children;
};

ItemPropsWrap.propTypes = {
    children: PropTypes.node,
    itemProps: PropTypes.object
};

export default React.memo(ItemPropsWrap);
