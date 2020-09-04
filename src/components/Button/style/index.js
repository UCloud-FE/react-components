import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import classnames from 'classnames';

import config from 'src/config';
import { inlineBlockWithVerticalMixin } from 'src/style';
import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-button';
export const iconCls = prefixCls + '-icon';

const sizeMixin = props => {
    const {
        size,
        theme: { Height, Padding }
    } = props;

    return css`
        height: ${Height[size]};
        padding: 0 ${Padding[size]};
    `;
};

const styleTypeMixin = props => {
    const {
        theme: { designTokens: DT, materialVars, PaddingNumber },
        styleType,
        checkAble,
        size
    } = props;

    const styleTypeTheme = {
        primary: {
            color: DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT,
            fill: DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT,
            border: 'none',
            background: DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT,
            boxShadow: DT.T_SHADOW_BUTTON_PRIMARY,
            transition: `all ${materialVars.transitionUp}`,
            ':hover': {
                background: DT.T_BUTTON_PRIMARY_COLOR_BG_HOVER,
                boxShadow: DT.T_SHADOW_BUTTON_PRIMARY_HOVER
            }
        },
        border: {
            color: DT.T_COLOR_TEXT_DEFAULT_DARK,
            fill: DT.T_COLOR_TEXT_DEFAULT_DARK,
            background: DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT,
            border: 'none',
            boxShadow: DT.T_SHADOW_BUTTON_DEFAULT,
            transition: `all ${materialVars.transitionUp}`,
            ':hover': {
                color: DT.T_COLOR_TEXT_PRIMARY_DEFAULT,
                background: DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT,
                boxShadow: DT.T_SHADOW_BUTTON_HOVER
            }
        },
        'border-gray': {
            color: DT.T_COLOR_TEXT_DEFAULT_LIGHT,
            fill: DT.T_COLOR_TEXT_DEFAULT_LIGHT,
            borderColor: DT.T_COLOR_LINE_DEFAULT_LIGHT,
            background: DT.T_COLOR_BG_DEFAULT_LIGHT,
            transition: `all ${materialVars.transitionFlat}`,
            ':hover': {
                color: DT.T_COLOR_TEXT_PRIMARY_DEFAULT,
                borderColor: DT.T_COLOR_LINE_PRIMARY_HOVER,
                background: checkAble ? DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT : DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT
            }
        }
    };
    return css`
        ${styleTypeTheme[styleType]};
        ${styleType === 'border-gray' &&
        css`
            padding-left: ${PaddingNumber[size] - 1}px;
            padding-right: ${PaddingNumber[size] - 1}px;
        `};
    `;
};

const shapeCircleMixin = props => {
    const {
        size,
        theme: { Height }
    } = props;

    return css`
        border-radius: 50% !important;
        padding: 0;
        overflow: hidden;
        width: ${Height[size]};
    `;
};

const shapeSquareMixin = props => {
    const {
        size,
        theme: { Height }
    } = props;

    return css`
        padding: 0;
        overflow: hidden;
        width: ${Height[size]};
    `;
};

const loadingMixin = props => {
    const {
        theme: { designTokens: DT }
    } = props;

    return css`
        position: relative;
        pointer-events: none;

        &:before {
            position: absolute;
            top: -1px;
            left: -1px;
            bottom: -1px;
            right: -1px;
            background: ${DT.T_BUTTON_COMMON_COLOR_MASK};
            opacity: 0.6;
            content: '';
            border-radius: inherit;
            z-index: 1;
            transition: opacity 0.2s;
        }
    `;
};

const disabledMixin = props => {
    const {
        theme: { designTokens: DT }
    } = props;

    return css`
        && {
            border-color: ${DT.T_COLOR_LINE_DISABLED_LIGHT};
            background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
            color: ${DT.T_COLOR_TEXT_DISABLED};
            fill: ${DT.T_COLOR_TEXT_DISABLED};
            cursor: not-allowed;
            border-width: ${DT.T_LINE_WIDTH_BASE};
            border-style: solid;
            box-shadow: none;
        }
    `;
};

const checkedMixin = props => {
    const {
        theme: { designTokens: DT }
    } = props;

    return css`
        color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
        fill: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
        background: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};
        border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
        box-shadow: ${DT.T_SHADOW_BUTTON_HOVER};
    `;
};

// eslint-disable-next-line react/prop-types, no-unused-vars
const Button = ({ loading, styleType, theme, disabled, fakeDisabled, onClick, checkAble, ...rest }) => (
    <button disabled={disabled && !fakeDisabled} onClick={!disabled ? onClick : null} {...rest} />
);

export const ButtonWrap = withProps({
    className: ({ size, styleType, shape, loading, disabled, fakeDisabled, checked }) =>
        classnames(
            prefixCls,
            `${prefixCls}-size-${size}`,
            `${prefixCls}-styletype-${styleType}`,
            shape && `${prefixCls}-${shape}`,
            loading && `${prefixCls}-loading`,
            disabled && `${prefixCls}-disabled`,
            fakeDisabled && `${prefixCls}-disabled-fake`,
            checked && `${prefixCls}-checked`
        )
})(
    styled(Button)(props => {
        const { theme, loading, shape, disabled, checked } = props;
        const { designTokens: DT } = theme;
        return css`
            margin: 0;
            box-sizing: border-box;
            border-radius: ${DT.T_CORNER_SM};
            border-width: ${DT.T_LINE_WIDTH_BASE};
            border-style: solid;
            text-align: center;
            text-decoration: none;
            cursor: pointer;
            outline: none;
            font-size: ${DT.T_TYPO_FONT_SIZE_1};
            ${inlineBlockWithVerticalMixin};

            ${sizeMixin(props)};
            ${styleTypeMixin(props)};
            ${shape === 'circle' && shapeCircleMixin(props)};
            ${shape === 'square' && shapeSquareMixin(props)};
            ${loading && loadingMixin(props)};
            ${checked && checkedMixin(props)};
            ${disabled && disabledMixin(props)};
        `;
    })
);
