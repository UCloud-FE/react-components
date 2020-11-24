import React from 'react';

import { SubAreaWrap } from './style';

function SubArea(props) {
    return <SubAreaWrap {...props} />;
}

export default React.memo(SubArea);
