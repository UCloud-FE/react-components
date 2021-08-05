import React, { memo } from 'react';

import SvgIcon from 'src/components/SvgIcon';

import { iconCls, SIconWrap } from './style';

const CheckboxIcon = (props: { indeterminate?: boolean; checked?: boolean; disabled?: boolean }) => {
    const { indeterminate } = props;
    return (
        <SIconWrap {...props}>
            {indeterminate ? (
                <SvgIcon className={iconCls} type="horz" size="14px" />
            ) : (
                <SvgIcon className={iconCls} type="tick-small" size="14px" />
            )}
        </SIconWrap>
    );
};

export default memo(CheckboxIcon);
