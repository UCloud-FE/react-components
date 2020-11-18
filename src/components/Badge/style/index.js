import styled from '@emotion/styled';
import { css } from '@emotion/core';
import classnames from 'classnames';

import config from 'src/config';
import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-badge';
export const wrapCls = prefixCls + '-badge-wrap';
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

export const BubbleWrap = withProps({
    className: prefixCls + '-bubble-wrap'
})(
    styled('div')(props => {
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
        const color = customStyle.bubbleColor || DT[map.color] || DT.T_COLOR_TEXT_SYSTEM_WHITE;
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

export const Badge = withProps({
    className: ({ dot }) => classnames(badgeCls, dot && dotCls)
})(styled.span`
    display: inline-block;
    min-height: 20px;
    line-height: 20px;
    min-width: 10px;
    padding: 0 5px;
    border-radius: 10px;
    text-align: center;
    background: red;
    color: white;

    &.${dotCls} {
        width: 10px;
        height: 10px;
        padding: 0;
        border-radius: 5px;
        min-width: 0;
        min-height: 0;
    }
`);

export const BadgeWrap = withProps({
    className: wrapCls
})(styled('div')`
    position: absolute;
`);
