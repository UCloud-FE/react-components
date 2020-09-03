import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from 'src/config';
import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-badge';
export const badgeCls = prefixCls + '-badge';
export const dotCls = badgeCls + '-dot';

export const Wrap = withProps({
    className: prefixCls
})(styled('div')`
    position: relative;
    display: inline-block;
`);

export const bubbleStyleMap = {
    yellow: {
        bg: 'T_COLOR_BG_WARNING_DARK'
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

export const BubbleWrap = withProps({
    className: prefixCls + '-bubble-wrap'
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT },
            styleType,
            customStyle = {}
        } = props;

        const map = bubbleStyleMap[styleType] || {};
        const bg = customStyle.bubbleBackground || DT[map.bg];
        const color = customStyle.bubbleColor || DT[map.color] || DT.T_COLOR_TEXT_SYSTEM_WHITE;
        return css`
            position: absolute;
            line-height: 20px;
            padding: 0 4px;
            font-size: 14px;
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

export const BadgeWrap = withProps({
    className: prefixCls + '-badge-wrap'
})(styled('div')`
    position: absolute;

    .${badgeCls}, .${dotCls} {
        display: inline-block;
        min-height: 20px;
        line-height: 20px;
        min-width: 10px;
        padding: 0 5px;
        border-radius: 10px;
        text-align: center;
        background: red;
        color: white;
    }
    .${dotCls} {
        width: 10px;
        height: 10px;
        padding: 0;
        border-radius: 5px;
        min-width: 0;
        min-height: 0;
    }
`);
