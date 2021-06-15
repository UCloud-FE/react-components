import React, { HTMLAttributes, memo } from 'react';
import classnames from 'classnames';

import { highlightCls } from './style';

const Highlight = ({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) => {
    return <span {...rest} className={classnames(highlightCls, className)} />;
};

export default memo(Highlight);
