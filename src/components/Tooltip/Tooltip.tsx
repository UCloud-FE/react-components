import classnames from 'classnames';
import React, { ReactNode, useMemo } from 'react';

import Popover, { Animation, Placement, PopoverProps, Trigger } from 'src/components/Popover';
import { getPlacements } from 'src/components/Popover/placements';
import usePopoverConfig from 'src/hooks/usePopoverConfig';

import { Arrow, ArrowInner, ContentWrap, tooltipPopupClassName, TooltipWrap } from './style';

const arrowPlacements = getPlacements(10);
const placements = getPlacements();
const Theme = ['light', 'dark'];

export interface TooltipProps extends PopoverProps {
    /** 是否显示箭头 */
    arrow?: boolean;
    /** 主题风格 */
    theme?: 'light' | 'dark';
    /** 自定义样式 */
    customStyle?: {
        /** 弹出层外层 padding */
        popupWrapperPadding?: string;
    };
    /** 弹出层内容 */
    popup?: ReactNode;
}

const Tooltip = ({
    popup: _popup,
    theme = 'light',
    popupClassName,
    arrow = true,
    placement = 'topLeft',
    customStyle = {},
    ...rest
}: TooltipProps & any) => {
    const popup = useMemo(() => {
        return _popup == null ? (
            _popup
        ) : (
            <TooltipWrap themeType={theme}>
                {arrow && (
                    <Arrow>
                        <ArrowInner />
                    </Arrow>
                )}
                <ContentWrap themeType={theme} customStyle={customStyle}>
                    {_popup}
                </ContentWrap>
            </TooltipWrap>
        );
    }, [_popup, arrow, customStyle, theme]);
    const popoverConfigProps = usePopoverConfig();
    return (
        <Popover
            {...popoverConfigProps}
            {...rest}
            placement={placement}
            popupClassName={classnames(tooltipPopupClassName, popupClassName)}
            builtinPlacements={arrow ? arrowPlacements : placements}
            popup={popup}
        />
    );
};

Object.assign(Tooltip, {
    Animation,
    Trigger,
    Placement,
    Theme,
    defaultProps: {}
});

export default Tooltip;
