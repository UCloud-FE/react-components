import React from 'react';

import { SubGroupWrap } from './style';

function SubGroup(props) {
    return <SubGroupWrap {...props} />;
}

SubGroup.propTypes = {};

export default React.memo(SubGroup);
