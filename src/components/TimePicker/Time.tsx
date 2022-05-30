import React, { memo } from 'react';

import { Override } from 'src/type';

import { timePrefixCls, STime } from './style';
import { scrollTo } from './util';

type TimeProps = Override<
    React.HTMLAttributes<HTMLDivElement>,
    {
        value?: Date | undefined;
        defaultValue?: Date | undefined;
        onChange?: ((d: Date) => void) | undefined;
        mode?: ('s' | 'm' | 'HH' | 'H' | 'mm' | 'ss')[] | undefined;
        prefixCls?: string | undefined;
    }
>;

const Time = (props: TimeProps) => {
    return <STime scrollTo={scrollTo} {...props} prefixCls={timePrefixCls} />;
};

export default memo(Time);
