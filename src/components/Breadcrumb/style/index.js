import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from 'src/config';
import { inlineBlockWithVerticalMixin } from 'src/style';
import Button from 'src/components/Button';
import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-breadcrumb';
export const itemCls = prefixCls + '-item';
export const backBtnCls = prefixCls + '-back-btn';

const textStyleMixin = css`
    font-size: 14px;
    margin-right: 6px;
    ${inlineBlockWithVerticalMixin};
`;

export const BackButtonWrap = withProps({
    icon: 'left',
    size: 'sm',
    styleType: 'border-gray',
    className: backBtnCls
})(styled(Button)`
    margin-right: 16px;
    padding: 0 5px;
`);

const itemStyle = props => {
    const {
        theme: { colorMap, colorList },
        disabled,
        current,
        noAction
    } = props;

    return css`
        cursor: pointer;
        text-decoration: none;

        ${textStyleMixin};

        ${noAction &&
        css`
            pointer-events: none;
            color: ${colorMap.default.text} !important;
            cursor: default;
        `};

        ${current &&
        css`
            pointer-events: none;
            color: ${colorList.black} !important;
            font-weight: bold;
        `};

        ${disabled &&
        css`
            pointer-events: none;
            color: ${colorMap.disabled.text} !important;
        `};
    `;
};

export const ItemSpan = withProps({
    className: itemCls
})(styled.span(itemStyle));

export const ItemA = withProps({
    className: itemCls
})(
    styled.a(props => {
        const {
            theme: { colorMap }
        } = props;
        return css`
            ${itemStyle(props)};
            text-decoration: none;
            &,
            &:hover,
            &:visited,
            &:link,
            &:active {
                color: ${colorMap.default.text};
            }
        `;
    })
);

export const SeparatorWrap = styled('span')`
    ${textStyleMixin};
    font-weight: bold;
    cursor: default;
`;

export const BreadcrumbWrap = withProps()(
    styled('div')(props => {
        const {
            theme: { colorMap, fontSize },
            styleType
        } = props;

        return css`
            font-size: ${fontSize};
            color: ${colorMap.default.text};
            vertical-align: baseline;

            ${{
                'block-hover': css`
                    :hover {
                        span.${itemCls} {
                            color: ${colorMap.active.text};
                        }
                        a.${itemCls} {
                            &,
                            &:hover,
                            &:visited,
                            &:link,
                            &:active {
                                color: ${colorMap.active.text};
                            }
                        }
                    }
                `,
                active: css`
                    span.${itemCls} {
                        color: ${colorMap.active.text};
                    }
                    a.${itemCls} {
                        &,
                        &:hover,
                        &:visited,
                        &:link,
                        &:active {
                            color: ${colorMap.active.text};
                        }
                    }
                `,
                hover: css`
                    span.${itemCls}, a.${itemCls} {
                        :hover {
                            color: ${colorMap.active.text};
                        }
                    }
                `
            }[styleType]};
        `;
    })
);
