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

export const SWrap = styledWrap<Record<string, unknown>>({
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
        const { zIndex = 9 } = props;
        return css`
            position: absolute;
            z-index: ${zIndex};
        `;
    })
);

export const StyleMap: {
    [key: string]: {
        bg: string;
        color?: string;
    };
} = {
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

export const SBadge = styledWrap<SBadgeProps, HTMLSpanElement>({
    className: ({ dot }) => classnames(badgeCls, dot && dotCls)
})(
    styled.span(props => {
        const {
            theme: { designTokens: DT },
            color = 'red'
        } = props;
        const styleMap = StyleMap[color] || StyleMap.red;

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
            color: ${DT[styleMap.color || 'T_COLOR_TEXT_SYSTEM_WHITE']};

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

export const bubbleStyleMap: {
    [key: string]: {
        bg: string;
        color?: string;
    };
} = {
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

export const SBubbleWrap = styledWrap<SBubbleProps>({
    className: prefixCls + '-bubble-wrap'
})(
    styled.div(props => {
        const {
            theme: { designTokens: DT },
            styleType,
            size,
            customStyle = {}
        } = props;
        const fontSize = { sm: '12px', md: '14px' }[size];
        const lineHeight = { sm: '16px', md: '20px' }[size];

        const map = bubbleStyleMap[styleType] || {};
        const bg = customStyle.bubbleBackground || DT[map.bg];
        const color =
            customStyle.bubbleColor || DT[map.color || 'T_COLOR_TEXT_SYSTEM_WHITE'] || DT.T_COLOR_TEXT_SYSTEM_WHITE;
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
