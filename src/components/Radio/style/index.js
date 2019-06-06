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

const radioCommonStyleMixin = ({ theme: { colorMap, fontSize } }) => css`
    color: ${colorMap.default.text};
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

const sharedStyle = ({ theme: { Radio: radioTheme = {} } }) => css`
    ${radioTheme['&']};
`;
/* stylelint-disable no-duplicate-selectors */
export const RadioWrap = styled.div.attrs({
    className: sharedClassName
})`
    ${radioCommonStyleMixin};

    ${inlineBlockWithVerticalMixin};

    ${sizeMixin};

    ${({ checked, theme: { colorMap } }) =>
        checked &&
        css`
            ${RadioIcon} {
                color: ${colorMap.active.icon};
            }
        `};

    ${({ disabled, theme: { colorMap } }) =>
        disabled &&
        css`
            color: ${colorMap.disabled.text};
            cursor: not-allowed;

            ${RadioIcon} {
                color: ${colorMap.disabled.icon};
            }
        `};

    ${sharedStyle};
`;

// eslint-disable-next-line no-unused-vars
const FilterStyleTypeButton = ({ styleType, ...rest }) => <Button styleType="border-gray" {...rest} />;
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
        ${sharedStyle};
    }
`;

export const RadioTagWrap = styled.div.attrs({
    className: sharedClassName
})`
    padding: 0 8px;
    cursor: pointer;
    border-radius: 2px;

    ${radioCommonStyleMixin};

    ${inlineBlockWithVerticalMixin};

    ${sizeMixin};

    ${({ checked, theme: { colorMap } }) =>
        checked &&
        css`
            background-color: ${colorMap.active.background};
            color: ${colorMap.active.text};
        `};

    ${({ disabled, theme: { colorMap } }) =>
        disabled &&
        css`
            color: ${colorMap.disabled.text};
            cursor: not-allowed;
        `};
    ${sharedStyle};
`;

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
    color: #c3cad9;
    ${RadioCardTipPosition};
`;
export const RadioCardDisabledLabelWrap = styled.span`
    font-weight: bold;
    line-height: 16px;
    ${RadioCardTipPosition};
`;
const cardPropsMixin = ({ theme: { colorMap, colorList, titleFontSize }, disabled, checked }) => css`
    border: 1px solid ${colorMap.default.border};

    ${!checked &&
        !disabled &&
        css`
            :hover {
                box-shadow: 0px 2px 4px 0px rgba(228, 229, 242, 1), 0px 1px 1px 0px rgba(162, 166, 191, 0.32),
                    0px 1px 0px 0px rgba(223, 224, 241, 0.7);
                border-color: transparent;
            }
        `};

    ${RadioCardHeader} {
        color: ${colorList.title};
        font-size: ${titleFontSize};
        border-bottom: 1px solid ${colorMap.default.border};
    }
    ${checked &&
        css`
            border-color: ${colorMap.active.border};
            box-shadow: 0px 2px 4px 0px rgba(228, 229, 242, 1), 0px 1px 1px 0px rgba(162, 166, 191, 0.32);
            ${RadioCardHeader} {
                color: ${colorMap.active.text};
                border-color: ${colorMap.active.border};
            }
            ${RadioCardIcon} {
                color: ${colorMap.active.text};
            }
        `};
    ${!disabled &&
        !checked &&
        css`
            ${RadioCardIcon} {
                border-radius: 50%;
                background: white;
            }
        `};
    ${disabled &&
        css`
            cursor: not-allowed;
        `};
    ${disabled &&
        !checked &&
        css`
            border-color: ${colorMap.disabled.border};
            ${RadioCardHeader} {
                background: #bbb;
                color: white;
            }
            ${RadioCardContent} {
                background: #f7f7f7;
                color: #bbb;
            }
        `};
    ${disabled &&
        checked &&
        css`
            ${RadioCardIcon} {
                color: #adbaf3;
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
    ${sharedStyle};
`;
export const RadioTextWrap = styled.div.attrs({
    className: sharedClassName
})`
    padding: 2px 0;
    box-sizing: border-box;
    cursor: pointer;

    > span {
        display: table;
        height: 100%;
        > span {
            ${({ theme: { colorMap } }) => css`
                padding: 0 12px;
                border-color: ${colorMap.default.border};
                border-style: solid;
                border-width: 0 1px;
                height: 100%;
                display: table-cell;
                vertical-align: middle;
            `};
        }
    }

    ${radioCommonStyleMixin};

    ${inlineBlockWithVerticalMixin};

    ${sizeMixin};
    line-height: normal;

    ${({ theme: { colorMap } }) => css`
        :hover {
            color: ${colorMap.active.text};
        }
    `};

    ${({ checked, theme: { colorMap } }) =>
        checked &&
        css`
            color: ${colorMap.active.text};
        `};

    ${({ disabled, theme: { colorMap } }) =>
        disabled &&
        css`
            && {
                color: ${colorMap.disabled.text};
                cursor: not-allowed;
            }
        `};
    ${sharedStyle};
`;

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
