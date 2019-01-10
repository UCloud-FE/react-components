import styled, { css } from 'styled-components';
import classnames from 'classnames';

import Collapse from 'src/components/Collapse';
import Checkbox from 'src/components/Checkbox';
import Icon from 'src/components/Icon';
import config from 'src/config';

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
const itemWrapMixin = ({ disabled, theme: { colorMap } }) => css`
    display: block;
    cursor: pointer;

    ${disabled &&
        css`
            &&& {
                pointer-events: none;
                color: ${colorMap.disabled.text};
            }
        `};
`;
export const ItemWrap = styled.div.attrs({
    className: ({ selected }) => classnames(prefixCls + '-item', selected && prefixCls + '-item-selected')
})(
    ({ theme: { Menu: menuTheme = {} } }) => css`
        padding: 0 8px;
        margin: 0 8px;

        ${itemWrapMixin};
        ${ellipsisMixin};
        ${menuTheme['Item']};
    `
);
export const SubMenuTitleWrap = styled.div.attrs({
    className: ({ selected }) =>
        classnames(prefixCls + '-submenu-title', selected && prefixCls + '-submenu-title-selected')
})(
    ({ theme: { Menu: menuTheme = {} } }) => css`
        padding: 0 8px;
        ${itemWrapMixin};
        ${menuTheme['SubMenuTitle']};
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
    ({ theme: { Menu: menuTheme = {} } }) => css`
        padding: 0 8px;
        margin: 0 8px;
        ${itemWrapMixin};
        ${menuTheme['SelectAllCheckbox']};
    `
);
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

export const PopupContentWrap = styled.div.attrs({
    className: prefixCls + '-popup-content-wrap'
})`
    max-height: 380px;
    ${menuWrapMixin};
`;

export const MenuWrap = styled(Collapse)(
    ({ theme: { colorMap, Menu: menuTheme = {}, menuThemeType: themeType = 'light', fontSize } }) => {
        return css`
            line-height: 26px;
            font-size: ${fontSize};
            ${menuWrapMixin};

            &,
            ${/*sc-sel*/ PopupContentWrap} {
                border: 1px solid ${colorMap.default.border};
            }

            ${menuTheme['themeType'] && menuTheme['themeType'][themeType] && menuTheme['themeType'][themeType]['&']};
            ${menuTheme['&']};
        `;
    }
);
/* stylelint-enable no-duplicate-selectors */
