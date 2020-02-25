import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import classnames from 'classnames';

import config from 'src/config';
import { inlineBlockWithVerticalMixin } from 'src/style';
import Icon from 'src/components/Icon';
import Button from 'src/components/Button';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-radio';

export const RadioIcon = styled(Icon)`
    margin-right: 8px;
    font-size: 14px;
`;

const radioCommonStyleMixin = ({ theme: { designTokens: DT, fontSize } }) => css`
    color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
    font-size: ${fontSize};
    position: relative;
    cursor: pointer;
`;

const sizeMixin = ({ theme: { Height }, size }) => css`
    height: ${Height[size]};
    line-height: ${Height[size]};
`;

const sharedClassName = ({ disabled, checked, size, styleType }) =>
    classnames({
        [`${prefixCls}`]: true,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-checked`]: checked,
        [`${prefixCls}-size-${size}`]: true,
        [`${prefixCls}-styletype-${styleType}`]: true
    });

/* stylelint-disable no-duplicate-selectors */
export const RadioWrap = styled.div.attrs({
    className: sharedClassName
})(
    ({ theme: { designTokens: DT }, checked, disabled }) => css`
        ${radioCommonStyleMixin};

        ${inlineBlockWithVerticalMixin};

        ${sizeMixin};

        ${RadioIcon} {
            color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
        }

        ${!checked &&
            !disabled &&
            css`
                :hover {
                    color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                    ${RadioIcon} {
                        color: ${DT.T_COLOR_LINE_PRIMARY_HOVER};
                    }
                }
            `};
        ${checked &&
            css`
                color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                ${RadioIcon} {
                    color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                }
            `};

        ${disabled &&
            css`
                color: ${DT.T_COLOR_TEXT_DISABLED};
                cursor: not-allowed;

                ${RadioIcon} {
                    color: ${DT.T_COLOR_LINE_DISABLED_DARK};
                }
            `};
    `
);

// eslint-disable-next-line no-unused-vars
const FilterStyleTypeButton = ({ styleType, ...rest }) => <Button styleType="border-gray" checkAble {...rest} />;
FilterStyleTypeButton.propTypes = {
    styleType: PropTypes.string
};

export const RadioButtonWrap = styled(FilterStyleTypeButton).attrs({
    className: sharedClassName
})`
    && {
        ${({ size }) => css`
            min-width: ${{ lg: 80, md: 68, sm: 56 }[size]}px;
        `};
        text-align: center;
        border-radius: 0;
        ${({ theme: { fontSize } }) =>
            css`
                font-size: ${fontSize};
            `};
        position: relative;

        ${({ disabled }) =>
            disabled &&
            css`
                z-index: 1;
            `};

        ${({ checked }) =>
            checked &&
            css`
                z-index: 2;
            `};

        &:hover {
            z-index: 3;
        }
    }
`;

export const RadioTagWrap = styled.div.attrs({
    className: sharedClassName
})(
    ({ theme: { designTokens: DT }, checked, disabled }) => css`
        padding: 0 8px;
        cursor: pointer;
        border-radius: 2px;

        ${radioCommonStyleMixin};

        ${inlineBlockWithVerticalMixin};

        ${sizeMixin};

        ${checked &&
            css`
                background: ${DT.T_COLOR_BG_PRIMARY_5};
                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            `};

        ${disabled &&
            css`
                color: ${DT.T_COLOR_TEXT_DISABLED};
                cursor: not-allowed;
            `};

        ${disabled &&
            checked &&
            css`
                background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
            `};

        ${!checked &&
            !disabled &&
            css`
                :hover {
                    color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                }
            `};
    `
);

export const RadioCardHeader = styled.div`
    position: relative;
    padding: 8px 16px;
    line-height: 22px;
    min-height: 22px;
    font-weight: bold;
`;
export const RadioCardContent = styled.div`
    padding: 16px;
    min-height: 20px;
`;
const RadioCardTipPosition = css`
    position: absolute;
    right: 12px;
    top: 10px;
`;
export const RadioCardIcon = styled(Icon)`
    font-size: 16px;
    ${RadioCardTipPosition};
`;
export const RadioCardDisabledLabelWrap = styled.span`
    font-weight: bold;
    line-height: 16px;
    ${RadioCardTipPosition};
`;
const cardPropsMixin = ({ theme: { designTokens: DT, titleFontSize }, disabled, checked }) => css`
    border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
    background: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};

    /* stylelint-disable no-descending-specificity */
    ${RadioCardIcon} {
        color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
    }
    /* stylelint-enable no-descending-specificity */

    ${RadioCardHeader} {
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
        font-size: ${titleFontSize};
        border-bottom: 1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
    }
    ${checked &&
        css`
            border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
            box-shadow: ${DT.T_SHADOW_BUTTON_DEFAULT};
            ${RadioCardHeader} {
                border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
            }
            ${RadioCardIcon} {
                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            }
        `};
    ${disabled &&
        css`
            cursor: not-allowed;
        `};
    ${disabled &&
        !checked &&
        css`
            border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
            ${RadioCardHeader} {
                background: ${DT.T_COLOR_BG_DISABLED_DARK};
                color: ${DT.T_COLOR_TEXT_DEFAULT_NORMAL};
            }
            ${RadioCardContent} {
                background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                color: ${DT.T_COLOR_TEXT_DISABLED};
            }
        `};
    ${disabled &&
        checked &&
        css`
            ${RadioCardIcon} {
                color: ${DT.T_COLOR_LINE_DISABLED_DARK};
            }
        `};

    ${!checked &&
        !disabled &&
        css`
            :hover {
                box-shadow: ${DT.T_SHADOW_BUTTON_HOVER};
                border-color: transparent;

                ${RadioCardIcon} {
                    color: ${DT.T_COLOR_LINE_PRIMARY_HOVER};
                }
            }
        `};
`;
export const RadioCardWrap = styled.div.attrs({
    className: sharedClassName
})`
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    cursor: pointer;

    ${cardPropsMixin};
`;
export const RadioTextWrap = styled.div.attrs({
    className: sharedClassName
})(
    ({ theme: { designTokens: DT }, checked, disabled }) => css`
        padding: 2px 0;
        box-sizing: border-box;
        cursor: pointer;

        > span {
            display: table;
            height: 100%;
            > span {
                padding: 0 12px;
                border-color: ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                border-style: solid;
                border-width: 0 1px;
                height: 100%;
                display: table-cell;
                vertical-align: middle;
            }
        }

        ${radioCommonStyleMixin};

        ${inlineBlockWithVerticalMixin};

        ${sizeMixin};
        line-height: normal;
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};

        ${!checked &&
            !disabled &&
            css`
                :hover {
                    color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                }
            `};

        ${checked &&
            css`
                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            `};

        ${disabled &&
            css`
                && {
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                    cursor: not-allowed;
                }
            `};
    `
);

export const RadioGroupWrap = styled.div`
    position: relative;
    margin-bottom: -8px;
    ${RadioWrap}, ${/* sc-sel */ RadioTagWrap} {
        margin-right: 8px;
        margin-bottom: 8px;

        &:last-child {
            margin-right: 0;
        }
    }
    ${RadioCardWrap} {
        margin-right: 12px;
        margin-bottom: 8px;

        &:last-child {
            margin-right: 0;
        }
    }
    ${RadioTextWrap}+${RadioTextWrap} {
        margin-left: -1px;
    }

    ${RadioButtonWrap} {
        margin-right: -1px;
        margin-bottom: 8px;
        &:first-child {
            border-radius: 2px 0 0 2px;
        }
        &:last-child {
            border-radius: 0 2px 2px 0;
            margin-right: 0;
        }
    }
`;

addDefaultThemeProps(RadioWrap, RadioButtonWrap, RadioTagWrap, RadioCardWrap, RadioTextWrap);
