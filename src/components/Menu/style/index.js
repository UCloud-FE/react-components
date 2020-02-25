import styled, { css } from 'styled-components';
import classnames from 'classnames';

import Collapse from 'src/components/Collapse';
import Checkbox from 'src/components/Checkbox';
import Icon from 'src/components/Icon';
import config from 'src/config';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-menu';

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
const itemWrapMixin = ({ disabled, theme: { designTokens: DT } }) => css`
    display: block;
    cursor: pointer;

    ${disabled &&
        css`
            &&& {
                color: ${DT.T_COLOR_TEXT_DISABLED};
                cursor: not-allowed;
            }
            &&&:hover {
                background: unset;
            }
        `};
`;
export const ItemWrap = styled.div.attrs({
    className: ({ selected }) => classnames(prefixCls + '-item', selected && prefixCls + '-item-selected')
})(
    () => css`
        padding: 0 8px;
        margin: 0 8px;
        border-radius: 2px;

        ${itemWrapMixin};
        ${ellipsisMixin};
    `
);
export const SubMenuTitleWrap = styled.div.attrs({
    className: ({ selected }) =>
        classnames(prefixCls + '-submenu-title', selected && prefixCls + '-submenu-title-selected')
})(
    () => css`
        padding: 0 8px;
        border-radius: 2px;
        ${itemWrapMixin};
    `
);

export const TitleContentWrap = styled.div.attrs({
    className: ({ collapse }) =>
        classnames(prefixCls + '-submenu-title-content', collapse && prefixCls + '-submenu-title-content-collapse')
})(
    ({ collapse }) => css`
        padding: 0 8px;
        padding-right: 40px;
        position: relative;

        ${collapse &&
            css`
                border-bottom: 1px solid;
                margin: 8px 0;
            `};
        ${ellipsisMixin};
    `
);

export const PopupWrap = styled.div`
    padding: 0 8px;
    display: inline-block;
`;
export const SelectAllCheckbox = styled(Checkbox).attrs({
    className: ({ checked }) =>
        classnames(prefixCls + '-selectall-checkbox', checked && prefixCls + '-selectall-checkbox-checked')
})(
    () => css`
        padding: 0 8px;
        margin: 0 8px;
        border-radius: 2px;
        ${itemWrapMixin};
    `
);
/* stylelint-disable no-duplicate-selectors */

const menuWrapMixin = () => css`
    display: inline-block;
    box-sizing: border-box;
    max-width: 360px;
    min-width: 64px;
    overflow: auto;
    padding: 10px 0;
    border-radius: 2px;
    text-align: left;
    border-style: none !important;
`;

export const PopupContentWrap = styled.div.attrs({
    className: prefixCls + '-popup-content-wrap'
})`
    max-height: 380px;
    ${menuWrapMixin};
`;

export const MenuWrap = styled(Collapse)(({ theme: { designTokens: DT, fontSize } }) => {
    return css`
        line-height: 26px;
        font-size: ${fontSize};
        ${menuWrapMixin};

        &,
        ${/*sc-sel*/ PopupContentWrap} {
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
            border: none;
            box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_LG};
            background: ${DT.T_COLOR_BG_MENU};
        }

        .${prefixCls}-item, .${prefixCls}-submenu-title-content, .${prefixCls}-selectall-checkbox {
            :hover {
                background: ${DT.T_COLOR_BG_DEFAULT_HOVER};
            }
        }
        .${prefixCls}-item-selected, .${prefixCls}-submenu-title-selected, .${prefixCls}-selectall-checkbox-checked {
            color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
        }
        .${prefixCls}-submenu-title-content-collapse {
            border-color: ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
        }
    `;
});
/* stylelint-enable no-duplicate-selectors */

addDefaultThemeProps(MenuWrap, ItemWrap, SubMenuTitleWrap, SelectAllCheckbox, TitleContentWrap);
