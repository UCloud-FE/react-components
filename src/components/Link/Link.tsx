import React, { HTMLAttributes } from 'react';

import { SLink } from './style';

type LinkProps = {
    /** a 标签的链接 */
    href?: string;
    /** 打开方式 */
    target?: string;
} & HTMLAttributes<HTMLAnchorElement>;

const Link = (props: LinkProps) => {
    return <SLink {...props} />;
};

export default Link;
