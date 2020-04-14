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
    theme: { designTokens: DT, Height, HeightNumber, materialVars },
    disabled,
    size,
    focused,
    status
}) => css`
    border-radius: ${DT.T_CORNER_SM};
    height: ${Height[size]};
    color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
    border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
    box-shadow: ${DT.T_SHADOW_INSET_1};
    background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
    transition: ${materialVars.transitionDown};
    :hover {
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
        border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
        background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
    }

    input {
        line-height: ${HeightNumber[size] - 2}px;
        height: ${HeightNumber[size] - 2}px;
        &::placeholder {
            opacity: 1;
            color: ${DT.T_COLOR_TEXT_REMARK_LIGHT};
        }
    }
    ${focused &&
        !disabled &&
        css`
            && {
                color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
            }
        `};

    ${status === 'error' &&
        css`
            &&& {
                border-color: ${DT.T_COLOR_LINE_ERROR_DARK};
                background: ${DT.T_COLOR_BG_ERROR_LIGHT};
            }
        `};

    ${disabled &&
        css`
            box-shadow: none;
            &,
            &:hover {
                color: ${DT.T_COLOR_TEXT_DISABLED};
                -webkit-text-fill-color: currentcolor;
                border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
                background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
            }
            ${SuffixWrap}, ${PrefixWrap} {
                color: inherit;
            }
        `};
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
