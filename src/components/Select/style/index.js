import styled, { css } from 'styled-components';

import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';
import Input from 'src/components/Input';
import Icon from 'src/components/Icon';
import Menu from 'src/components/Menu';
import { inlineBlockWithVerticalMixin } from 'src/style';

export const SelectSearchInput = styled(Input.Search)`
    min-width: 100px;
    margin: 0 8px;
    margin-top: 10px;
`;

export const Selector = styled.div`
    border-radius: 2px;
    cursor: pointer;
    padding: 0 8px;
    padding-right: 40px;
    box-sizing: border-box;
`;

export const Arrow = styled(Icon)`
    position: absolute;
    right: 8px;
    top: 50%;
    margin-top: -6px;
`;
export const OptionWrap = styled(Menu.Item)`
    ${({ hidden }) =>
        hidden &&
        css`
            display: none;
        `};
`;
export const MenuWrap = styled.div(
    ({ theme: { colorMap } }) => css`
        background: ${colorMap.default.background};
        border: 1px solid ${colorMap.default.border};
    `
);

export const BlockMenu = styled(Menu)`
    display: block;
    border: none;
    max-height: 380px;
`;

/* stylelint-disable no-duplicate-selectors */
const propsMixin = ({ theme: { colorMap, Height, fontSize }, size, disabled }) => css`
    font-size: ${fontSize};
    color: ${colorMap.default.text};
    background-color: ${colorMap.default.background};

    ${Selector} {
        height: ${Height[size]};
        line-height: ${Height[size]};
        border: 1px solid ${colorMap.default.border};

        &:hover {
            border-color: ${colorMap.active.border};
        }
    }

    ${disabled &&
        css`
            pointer-events: none;
            color: ${colorMap.disabled.text};

            ${Selector} {
                background: ${colorMap.disabled.background};
                border-color: ${colorMap.disabled.border};
            }
        `};
`;
/* stylelint-enable no-duplicate-selectors */

export const SelectWrap = styled.div`
    box-sizing: border-box;
    position: relative;
    font-size: 12px;

    ${inlineBlockWithVerticalMixin};
    ${propsMixin};
`;

addDefaultThemeProps(SelectWrap, MenuWrap);
