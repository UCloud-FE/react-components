import React, { memo } from 'react';

import SvgIcon from 'src/components/SvgIcon';

import { iconCls, SIconWrap } from './style';

const RadioIcon = (props: { checked: boolean; disabled: boolean }) => {
    return (
        <SIconWrap {...props}>
            <SvgIcon className={iconCls} type="circle" size="14px" />
        </SIconWrap>
    );
};

export default memo(RadioIcon);
