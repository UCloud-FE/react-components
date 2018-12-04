import styled, { css } from 'styled-components';

import Collapse from 'src/components/Collapse';
import Checkbox from 'src/components/Checkbox';
import Icon from 'src/components/Icon';

export const SubMenuIcon = styled(Icon)`
    position: absolute;
    right: 8px;
    top: 50%;
    margin-top: -0.5em;
    font-size: 14px;
`;

const ellipsisMixin = css`
    text-decoration: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;
const itemWrapMixin = css`
    display: block;
    cursor: pointer;

    ${({ checked, selected, theme: { Menu: menuTheme } }) =>
        (checked || selected) &&
        css`
            &&& {
                color: ${menuTheme['item:active'].text};
            }
        `};
    ${({ disabled, theme: { colorMap } }) =>
        disabled &&
        css`
            &&& {
                pointer-events: none;
                color: ${colorMap.disabled.text};
            }
        `};
`;
export const ItemWrap = styled.div`
    padding: 0 8px;
    margin: 0 8px;

    ${itemWrapMixin};
    ${ellipsisMixin};
`;
export const SubMenuTitleWrap = styled.div`
    padding: 0 8px;
    ${itemWrapMixin};
`;

export const TitleContentWrap = styled.div`
    padding: 0 8px;
    padding-right: 40px;
    position: relative;

    ${({ collapse, theme: { Menu: menuTheme } }) =>
        collapse &&
        css`
            border-bottom: 1px solid ${menuTheme.collapse.border};
            margin: 8px 0;
        `};
    ${ellipsisMixin};
`;

export const PopupWrap = styled.div`
    padding: 0 8px;
    display: inline-block;
`;

export const PopupContentWrap = styled.div`
    max-height: 380px;
`;

export const SelectAllCheckbox = styled(Checkbox)`
    padding: 0 8px;
    margin: 0 8px;
    ${itemWrapMixin};
`;
/* stylelint-disable no-duplicate-selectors */

const menuWrapMixin = css`
    display: inline-block;
    box-sizing: border-box;
    max-width: 360px;
    min-width: 64px;
    overflow: auto;
    padding: 10px 0;
    border-radius: 2px;
    text-align: left;
`;

const propsMixin = ({ theme: { colorMap, Menu: menuTheme, fontSize } }) => css`
    font-size: ${fontSize};
    &, ${/*sc-sel*/ PopupContentWrap} {
        border: 1px solid ${colorMap.default.border};
        color: ${menuTheme.text};
        background: ${menuTheme.background};
    }

    ${/*sc-sel*/ ItemWrap},
    ${/*sc-sel*/ TitleContentWrap},
    ${/*sc-sel*/ SelectAllCheckbox} {
        :hover {
            background: ${menuTheme['item:hover'].background};
        }
    }
`;

export const MenuWrap = styled(Collapse)`
    line-height: 26px;
    ${menuWrapMixin};

    ${PopupContentWrap} {
        ${menuWrapMixin};
    }
    ${propsMixin};
`;
/* stylelint-enable no-duplicate-selectors */
