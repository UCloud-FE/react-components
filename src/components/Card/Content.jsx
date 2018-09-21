import React from 'react';

import { ContentWrap } from './style';

const Content = ({ ...rest }) => {
    return <ContentWrap {...rest} />;
};

export default Content;
