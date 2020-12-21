import styled from '@emotion/styled';
import { css } from '@emotion/core';
import classnames from 'classnames';

import config from 'src/config';
import styledWrap from 'src/utils/styledWrap';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-badge';
export const wrapCls = prefixCls + '-badge-wrap';
export const badgeCls = prefixCls + '-badge';
export const dotCls = badgeCls + '-dot';

export const SWrap = styledWrap({
    className: prefixCls
})(styled('div')`
    position: relative;
    display: inline-block;
`);

type SBadgeWrapProps = { zIndex?: number };

export const SBadgeWrap = styledWrap<SBadgeWrapProps>({
    className: wrapCls
})(
    styled.div(props => {
        const { zIndex } = props;
        return css`
            position: absolute;
            z-index: ${zIndex};
        `;
    })
);

export const StyleMap = {
    red: {
        bg: 'T_COLOR_LEGEND_RED_6'
    },
    green: {
        bg: 'T_COLOR_LEGEND_GREEN_6'
    },
    yellow: {
        bg: 'T_COLOR_LEGEND_YELLOW_6',
        color: 'T_COLOR_TEXT_SYSTEM_BLACK'
    },
    primary: {
        bg: 'T_COLOR_BG_PRIMARY_1'
    }
};

type SBadgeProps = { dot?: boolean; color?: keyof typeof StyleMap };

const defaultColor = 'red';
const defaultColorCT = 'T_COLOR_TEXT_SYSTEM_WHITE';
export const SBadge = styledWrap<SBadgeProps, HTMLSpanElement>({
    className: ({ dot }) => classnames(badgeCls, dot && dotCls)
})(
    styled.span(props => {
        const {
            theme: { designTokens: DT },
            color = defaultColor
        } = props;
        const styleMap = StyleMap[color] || StyleMap[defaultColor];
        const colorT = 'color' in styleMap ? styleMap.color : defaultColorCT;

        return css`
            display: inline-block;
            min-height: 20px;
            line-height: 20px;
            min-width: 10px;
            padding: 0 5px;
            border-radius: 10px;
            text-align: center;
            white-space: nowrap;
            background: ${DT[styleMap.bg]};
            color: ${DT[colorT]};

            &.${dotCls} {
                width: 8px;
                height: 8px;
                padding: 0;
                border-radius: 4px;
                min-width: 0;
                min-height: 0;
            }
        `;
    })
);

export const bubbleStyleMap = {
    yellow: {
        bg: 'T_COLOR_BG_WARNING_DARK',
        color: 'T_COLOR_LEGEND_ORANGE_8'
    },
    orange: {
        bg: 'T_COLOR_LEGEND_ORANGE_5'
    },
    gray: {
        bg: 'T_COLOR_BG_DISABLED_DARK'
    },
    purple: {
        bg: 'T_COLOR_LEGEND_PURPLE_5'
    }
};

type SBubbleProps = {
    styleType: keyof typeof bubbleStyleMap;
    size: 'sm' | 'md';
    customStyle?: {
        bubbleColor?: string;
        bubbleBackground?: string;
    };
};

const defaultBColor = 'orange';
const defaultBColorT = 'T_COLOR_TEXT_SYSTEM_WHITE';
export const SBubbleWrap = styledWrap<SBubbleProps>({
    className: prefixCls + '-bubble-wrap'
})(
    styled.div(props => {
        const {
            theme: { designTokens: DT },
            styleType = defaultBColor,
            size,
            customStyle = {}
        } = props;
        const fontSize = { sm: '12px', md: '14px' }[size];
        const lineHeight = { sm: '16px', md: '20px' }[size];

        const map = bubbleStyleMap[styleType] || bubbleStyleMap[defaultBColor];
        const bg = customStyle.bubbleBackground || DT[map.bg];
        const colorT = 'color' in map ? map.color : defaultBColorT;
        const color = customStyle.bubbleColor || DT[colorT];
        return css`
            position: absolute;
            line-height: ${lineHeight};
            padding: 0 4px;
            font-size: ${fontSize};
            font-weight: bold;
            color: ${color};
            background: ${bg};

            ::after {
                content: '';
                width: 0;
                height: 0;
                position: absolute;
                left: 4px;
                bottom: -5px;
                border-style: solid;
                border-width: 5px 5px 0 0;
                border-color: ${bg} transparent transparent transparent;
            }
        `;
    })
);
