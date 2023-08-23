import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';

import { HeaderWrap, prefixClsHeader } from './style';

const Header = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => {
    return <HeaderWrap {...rest} className={classnames(prefixClsHeader, className)} />;
};

const MemoHeader = React.memo(Header);

export default MemoHeader;
