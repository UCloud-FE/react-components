import React, { CSSProperties, HTMLAttributes, ReactNode } from 'react';

import usePopoverConfig, { useShouldUsePopoverConfig } from 'src/hooks/usePopoverConfig';

import Popover, { Animation, Placement, Trigger } from './Popover';

// eslint-disable-next-line react/display-name
const FinalPopover = React.forwardRef((props: any, ref: any) => {
    const shouldUsePopoverConfig = useShouldUsePopoverConfig();
    const popoverConfigProps = usePopoverConfig();
    if (shouldUsePopoverConfig) {
        return <Popover ref={ref} {...popoverConfigProps} {...props} />;
    } else {
        return <Popover ref={ref} {...props} />;
    }
});
export interface GetPopupContainer {
    (): HTMLElement;
}

export interface PopupAlign {
    points?: string[];
    offset?: number[];
    targetOffset?: number[];
    overflow?: {
        adjustX?: number;
        adjustY?: number;
    };
}

export type PopoverPlacement =
    | 'topLeft'
    | 'top'
    | 'topRight'
    | 'bottomLeft'
    | 'bottom'
    | 'bottomRight'
    | 'leftTop'
    | 'left'
    | 'leftBottom'
    | 'rightTop'
    | 'right'
    | 'rightBottom';

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
    visible?: boolean;
    defaultVisible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    trigger?: 'hover' | 'focus' | 'click' | 'contextMenu';
    alignPoint?: boolean;
    placement?: PopoverPlacement;
    align?: PopupAlign;
    stretch?: 'with' | 'minWidth' | 'height' | 'minHeight';
    popup?: ReactNode;
    popupClassName?: string;
    popupStyle?: CSSProperties;
    zIndex?: number;
    getPopupContainer?: GetPopupContainer;
    forwardPopupContainer?: boolean | GetPopupContainer;
    prefixCls?: string;
    animation?: 'fade' | 'zoom' | 'bounce' | 'slide-up';
}

Object.assign(FinalPopover, {
    Animation,
    Trigger,
    Placement
});

export { Animation, Placement, Trigger };
export default FinalPopover;
