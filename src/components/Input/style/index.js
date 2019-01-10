import styled, { css } from 'styled-components';

import { inlineBlockWithVerticalMixin } from 'src/style';
import Icon from 'src/components/Icon';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

/* stylelint-disable no-descending-specificity */

export const IconWrap = styled.span`
    position: absolute;
    right: 0;
    top: 0;
    text-align: center;
    color: inherit;
`;

export const SearchIcon = styled(Icon)`
    cursor: pointer;
`;

const themeMixin = ({
    theme: { colorMap, colorList, Height, Input: inputTheme = {} },
    disabled,
    size,
    withIcon
}) => css`
    color: ${colorMap.default.text};

    input {
        border: 1px solid ${colorMap.default.border};
        background: ${colorMap.default.background};
        height: ${Height[size]};
        ${withIcon && `padding-right: ${Height[size]}`};

        &::placeholder {
            color: ${colorList.placeholder};
        }
        &:hover {
            border-color: ${colorMap.active.border};
        }
        &:focus {
            border-color: ${colorMap.active.border};
        }
    }
    ${disabled &&
        css`
            color: ${colorMap.disabled.text};

            input {
                &,
                &:hover,
                &:focus {
                    background: ${colorMap.disabled.background};
                    border-color: ${colorMap.disabled.border};
                }
            }
        `};
    ${/* sc-sel */ IconWrap} {
        width: ${props => Height[props.size]};
        height: ${props => Height[props.size]};
        line-height: ${props => Height[props.size]};
    }

    ${inputTheme['&']};
`;

export const InputWrap = styled.span`
    position: relative;
    ${inlineBlockWithVerticalMixin};

    ${({ disabled }) =>
        disabled &&
        css`
            pointer-events: none;
        `};

    input {
        display: block;
        box-sizing: border-box;
        width: 100%;
        padding: 4px 8px;
        margin: 0;
        border-radius: 2px;
        font-size: inherit;
        outline: none;
        color: inherit;
    }

    ${themeMixin};
`;

addDefaultThemeProps(InputWrap);
