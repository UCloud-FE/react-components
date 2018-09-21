import styled, { css } from 'styled-components';

import Collapse from 'components/Collapse';
import Checkbox from 'components/Checkbox';
import { Color } from 'src/style';

import Icon from 'components/Icon';

const menuWrapMixin = css`
    display: inline-block;
    box-sizing: border-box;
    max-width: 360px;
    min-width: 64px;
    overflow: auto;
    padding: 10px 0;
    border: 1px solid #c3cad9;
    border-radius: 2px;
    font-size: 14px;
    text-align: left;

    ${({ theme }) => css`
        color: ${theme.color};
        background: ${theme.background};
    `};
`;

export const MenuWrap = styled(Collapse)`
    ${menuWrapMixin};

    line-height: 26px;
`;

export const SubMenuIcon = styled(Icon)`
    position: absolute;
    right: 8px;
    top: 50%;
    margin-top: -0.5em;
`;

const itemHoverMixin = css`
    :hover {
        background: ${props => props.theme.item.hover.background};
        color: ${props => props.theme.item.hover.color};
    }
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

    ${({ selected, theme }) =>
        selected &&
        css`
            &&& {
                color: ${theme.item.selected.color};
            }
        `};
    ${({ disabled }) =>
        disabled &&
        css`
            &&& {
                pointer-events: none;
                color: ${Color.font.disabled};
            }
        `};
`;
export const ItemWrap = styled.div`
    padding: 0 8px;
    margin: 0 8px;

    ${itemWrapMixin};
    ${itemHoverMixin};
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

    ${({ collapse, theme }) =>
        collapse &&
        css`
            border-bottom: ${theme.subMenu.collapse.borderBottom};
            margin: 8px 0;
        `};
    ${itemHoverMixin};
    ${ellipsisMixin};
`;

export const PopupWrap = styled.div`
    padding: 0 8px;
    display: inline-block;
`;

export const PopupContentWrap = styled.div`
    ${menuWrapMixin};
    max-height: 380px;
`;

export const SelectAllCheckbox = styled(Checkbox)`
    padding: 0 8px;
    margin: 0 8px;
    ${itemWrapMixin};
    ${itemHoverMixin};
    ${({ checked }) =>
        checked &&
        css`
            color: ${Color.font.blue};
        `};
`;

export const themeMap = {
    light: {
        color: Color.font.default,
        background: Color.bg.white,
        item: {
            hover: {
                background: '#eaf3fd',
                color: 'unset'
            },
            selected: {
                color: Color.font.blue
            }
        },
        subMenu: {
            collapse: {
                borderBottom: '1px solid #e1e6f0'
            }
        }
    },
    dark: {
        color: 'rgba(255, 255, 255, 0.65)',
        background: '#001529',
        item: {
            hover: {
                background: '#1890ff',
                color: 'white'
            },
            selected: {
                color: 'white'
            }
        },
        subMenu: {
            collapse: {
                borderBottom: '1px solid #163255'
            }
        }
    }
};
