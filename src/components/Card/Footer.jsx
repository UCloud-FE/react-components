import React from 'react';

import { FooterWrap } from './style';

const Footer = ({ ...rest }) => {
    return <FooterWrap {...rest} />;
};

export default React.memo(Footer);
