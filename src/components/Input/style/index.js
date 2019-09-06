import styled, { css } from 'styled-components';

import { inlineBlockWithVerticalMixin } from 'src/style';
import Icon from 'src/components/Icon';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';
import config from 'src/config';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-input';

/* stylelint-disable no-descending-specificity */

export const FixWrap = styled.span`
    vertical-align: middle;
    display: table-cell;
    color: #636e83;
    /* auto fix fixwrap to min-width */
    width: 1px;
`;

export const PrefixWrap = styled(FixWrap)(css`
    padding-left: 8px;
`);

export const SuffixWrap = styled(FixWrap)(css`
    padding-right: 8px;
`);

export const SearchIcon = styled(Icon)`
    cursor: pointer;
`;

const themeMixin = ({
    theme: { colorMap, colorList, Height, HeightNumber, materialVars, Input: inputTheme = {} },
    disabled,
    size,
    focused
}) => css`
    color: ${colorList.black};
    border: 1px solid #dfe0f1;
    background: #fafafc;
    height: ${Height[size]};
    box-shadow: ${materialVars.innerShadow};
    transition: ${materialVars.transitionDown};
    :hover {
        border-color: #c3cad9;
        background-color: #f6f6fb;
    }

    input {
        line-height: ${HeightNumber[size] - 2}px;
        height: ${HeightNumber[size] - 2}px;
        &::placeholder {
            color: ${colorList.placeholder};
        }
    }
    ${focused &&
        !disabled &&
        css`
            && {
                border-color: ${colorMap.active.border};
                background-color: #f6f6fb;
            }
        `};

    ${disabled &&
        css`
            color: ${colorMap.disabled.text};
            box-shadow: none;
            &,
            &:hover {
                background: ${colorMap.disabled.background};
                border-color: ${colorMap.disabled.border};
            }
            ${SuffixWrap}, ${PrefixWrap} {
                color: inherit;
            }
        `};

    ${inputTheme['&']};
`;

export const TableWrap = styled.span`
    display: table;
    width: 100%;
`;

export const InputWrap = styled.span.attrs({
    className: prefixCls
})`
    position: relative;
    ${inlineBlockWithVerticalMixin};
    box-sizing: border-box;
    border-radius: 2px;

    ${({ disabled }) =>
        disabled &&
        css`
            &,
            input,
            ${SearchIcon} {
                cursor: not-allowed;
            }
        `};

    input {
        vertical-align: middle;
        display: table-cell;
        box-sizing: border-box;
        width: 100%;
        padding: 0px 8px;
        margin: 0;
        font-size: inherit;
        color: inherit;
        &,
        &:hover,
        &:focus {
            border: none;
            outline: none;
            background: none;
        }
    }

    ${themeMixin};
`;

addDefaultThemeProps(InputWrap);
