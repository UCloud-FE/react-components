import React, { HTMLAttributes, memo, useMemo } from 'react';
import { HeaderButtonType, Mode } from '@ucloud-fe/calendar';

import { Override } from 'src/type';
import SvgIcon from 'src/components/SvgIcon';

import { iconCls } from './style';

const HeaderButton = ({
    type,
    mode,
    ...rest
}: Override<HTMLAttributes<HTMLSpanElement>, { type: HeaderButtonType; mode: Mode }>) => {
    const display = useMemo(() => {
        switch (type) {
            case 'prevMonth':
                return <SvgIcon type="arrow-left" className={iconCls} />;
            case 'nextMonth':
                return <SvgIcon type="arrow-right" className={iconCls} />;
            case 'prevYear':
            case 'prevDecade':
            case 'prevCentury':
                return <SvgIcon type="double-arrow-left" className={iconCls} />;
            case 'nextYear':
            case 'nextDecade':
            case 'nextCentury':
                return <SvgIcon type="double-arrow-right" className={iconCls} />;
        }
    }, [type]);
    return <div {...rest}>{display}</div>;
};

export default memo(HeaderButton);
