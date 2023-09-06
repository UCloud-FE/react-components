import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';

import { ContentWrap, prefixCls } from './style';

const Content = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => {
    return <ContentWrap {...rest} className={classnames(prefixCls, className)} />;
};

const MemoContent = React.memo(Content);

export default MemoContent;
