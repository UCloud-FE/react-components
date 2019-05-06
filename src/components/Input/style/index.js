import styled, { css } from 'styled-components';

import { inlineBlockWithVerticalMixin } from 'src/style';
import Icon from 'src/components/Icon';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';
import config from 'src/config';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-input';

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
    theme: { colorMap, colorList, Height, materialVars, Input: inputTheme = {} },
    disabled,
    size,
    withIcon
}) => css`
    color: ${colorMap.default.text};

    input {
        border: 1px solid #dfe0f1;
        background: #fafafc;
        height: ${Height[size]};
        ${withIcon && `padding-right: ${Height[size]}`};
        box-shadow: ${materialVars.innerShadow};
        transition: ${materialVars.transitionDown};
        :hover {
            border-color: #c3cad9;
            background-color: #f6f6fb;
        }
        :focus {
            border-color: ${colorMap.active.border};
            background-color: #f6f6fb;
        }
        :disabled,
        &[disabled] {
            box-shadow: none;
        }

        &::placeholder {
            color: ${colorList.placeholder};
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

export const InputWrap = styled.span.attrs({
    className: prefixCls
})`
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
