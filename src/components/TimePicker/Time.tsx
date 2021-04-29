import React, { memo } from 'react';

import { timePrefixCls, STime } from './style';

const Time = props => {
    return <STime {...props} prefixCls={timePrefixCls} />;
};

export default memo(Time);
