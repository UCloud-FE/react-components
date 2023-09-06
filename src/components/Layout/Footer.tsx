import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';

import { FooterWrap, prefixClsFooter } from './style';

const Footer = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => {
    return <FooterWrap {...rest} className={classnames(prefixClsFooter, className)} />;
};

const MemoFooter = React.memo(Footer);

export default MemoFooter;
