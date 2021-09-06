import React, { HTMLAttributes, useCallback, useContext } from 'react';

import { ExtraWrap } from './style';
import SelectContext from './SelectContext';

const Extra = ({
    autoHidePopup,
    children,
    onClick,
    ...rest
}: {
    /**
     * 扩展区域被点击后是否自动关闭弹出层
     */
    autoHidePopup?: boolean;
} & HTMLAttributes<HTMLDivElement>) => {
    const { hidePopup } = useContext(SelectContext);
    const handleClick = useCallback(
        e => {
            if (autoHidePopup) hidePopup();
            onClick?.(e);
        },
        [autoHidePopup, hidePopup, onClick]
    );
    return (
        <ExtraWrap onClick={handleClick} {...rest}>
            {children}
        </ExtraWrap>
    );
};

Extra.isMenuItem = false;

export default Extra;
