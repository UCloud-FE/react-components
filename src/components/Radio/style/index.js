import styled, { css } from 'styled-components';

import { inlineBlockWithVerticalMixin } from 'src/style';
import Icon from 'src/components/Icon';
import Button from 'src/components/Button';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

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

/* stylelint-disable no-duplicate-selectors */
export const RadioWrap = styled.div`
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
            pointer-events: none;

            ${RadioIcon} {
                color: ${colorMap.disabled.icon};
            }
        `};
`;

export const RadioButtonWrap = styled(Button)`
    min-width: 50px;
    text-align: center;
    border: 1px solid ${({ theme: { colorMap } }) => colorMap.default.border};
    border-radius: 0;

    ${radioCommonStyleMixin};

    ${({ disabled }) =>
        disabled &&
        css`
            z-index: 1;
        `};

    ${({ checked, theme: { colorMap } }) =>
        checked &&
        css`
            border-color: ${colorMap.active.border};
            color: ${colorMap.active.text};
            z-index: 2;
        `};

    &:hover {
        z-index: 3;
    }
`;

export const RadioTagWrap = styled.div`
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
            pointer-events: none;
        `};
`;

export const RadioGroupWrap = styled.div`
    ${RadioWrap}, ${/* sc-sel */ RadioTagWrap} {
        margin-right: 8px;

        &:last-child {
            margin-right: 0;
        }
    }

    ${RadioButtonWrap} {
        margin-right: -1px;
        &:first-child {
            border-radius: 2px 0 0 2px;
        }
        &:last-child {
            border-radius: 0 2px 2px 0;
            margin-right: 0;
        }
    }
`;

addDefaultThemeProps(RadioWrap, RadioButtonWrap, RadioTagWrap);
