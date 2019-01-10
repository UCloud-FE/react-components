import styled, { css } from 'styled-components';
import classnames from 'classnames';

import config from 'src/config';
import { inlineBlockWithVerticalMixin } from 'src/style';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-button';

const sizeMixin = ({ size, theme: { Height, Padding } }) => css`
    height: ${Height[size]};
    padding: 0 ${Padding[size]};
`;

const styleTypeMixin = ({ theme: { Button: buttonTheme = {} }, styleType }) => {
    const styleTypeTheme = buttonTheme.styleType || {};
    return css`
        ${styleTypeTheme[styleType]};
    `;
};

const shapeCircleMixin = ({ size, theme: { Height } }) => css`
    border-radius: 50% !important;
    padding: 0;
    overflow: hidden;
    width: ${Height[size]};
`;

const loadingMixin = css`
    position: relative;
    pointer-events: none;

    &:before {
        position: absolute;
        top: -1px;
        left: -1px;
        bottom: -1px;
        right: -1px;
        background: white;
        opacity: 0.35;
        content: '';
        border-radius: inherit;
        z-index: 1;
        transition: opacity 0.2s;
        pointer-events: none;
    }
`;

const disabledMixin = ({
    theme: {
        colorMap: { disabled: disabledColorMap }
    }
}) => css`
    :disabled,
    &[disabled] {
        border-color: ${disabledColorMap.border};
        background: ${disabledColorMap.background};
        color: ${disabledColorMap.text};
        cursor: not-allowed;
        pointer-events: none;
    }
`;

export const ButtonWrap = styled.button.attrs({
    className: ({ size, styleType, shape, loading, disabled }) =>
        classnames(
            prefixCls,
            `${prefixCls}-size-${size}`,
            `${prefixCls}-styletype-${styleType}`,
            shape && `${prefixCls}-${shape}`,
            loading && `${prefixCls}-loading`,
            disabled && `${prefixCls}-disabled`
        )
})(
    ({ theme: { fontSize, Button: buttonTheme = {} }, loading, shape, disabled }) => css`
        box-sizing: border-box;
        border-radius: 2px;
        border-width: 1px;
        border-style: solid;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        outline: none;
        font-size: ${fontSize};
        ${inlineBlockWithVerticalMixin};

        ${sizeMixin};
        ${styleTypeMixin};
        ${shape === 'circle' && shapeCircleMixin};
        ${loading && loadingMixin};
        ${disabled && disabledMixin};

        ${buttonTheme['&']};
    `
);
addDefaultThemeProps(ButtonWrap);
