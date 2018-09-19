import React from 'react';

import { CardWrap } from './style';

/** 卡片布局控件 */
const Card = ({ ...rest }) => {
    return <CardWrap {...rest} />;
};

export default Card;
