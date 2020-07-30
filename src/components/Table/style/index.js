import styled, { css } from 'styled-components';

import { clearFixMixin, inlineBlockWithVerticalMixin } from 'src/style';
import Button from 'src/components/Button';
import Notice from 'src/components/Notice';
import Checkbox from 'src/components/Checkbox';
import Icon from 'src/components/Icon';
import config from 'src/config';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-table';

export const SortIcon = styled(Icon)(
    ({ theme: { colorList } }) => css`
        vertical-align: middle;
        color: ${colorList.black};
    `
);

export const selectIconCellCls = prefixCls + '-row-select-icon-cell';
export const selectIconHeaderCls = prefixCls + '-select-icon-th';

export const placeholderCellCls = prefixCls + '-placeholder-cell';
export const placeholderHeaderCls = prefixCls + '-placeholder-th';

const expandedRowContentCls = prefixCls + '-expanded-row-content';
export const ExpandedRowContent = styled.div.attrs({
    className: expandedRowContentCls
})(
    ({ theme: { designTokens: DT } }) => css`
        color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
        border-bottom: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
        background: ${DT.T_TABLE_ROW_COLOR_BG_DEFAULT};
        padding: 12px;
        line-height: 20px;
    `
);

export const TableWrap = styled.div(
    ({ theme: { designTokens: DT }, zebraCrossing }) => css`
    ${clearFixMixin};
    padding: 15px;
    color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
    border-radius: ${DT.T_CORNER_SM};
    background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
    font-size: ${DT.T_TYPO_FONT_SIZE_1};

    .${prefixCls} {
        &-pagination {
            float: right;
            margin-top: 8px;
        }
        &-filter {
            border: none;
            padding: 0;
            cursor: pointer;
        }
        table {
            border-collapse: separate;
            border-spacing: 0;
            width: 100%;
        }
        &-filter-notice,
        &-empty-content-wrap,
        &-error-content-wrap {
            width: 400px;
            margin: 12px auto;
            text-align: center;
        }
        &-empty-content-wrap,
        &-error-content-wrap {
            margin: 40px auto;
        }
        &-reset-link {
            color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            cursor: pointer;
        }
        &-body {
            overflow-x: auto;
            overflow-y: hidden;
        }
        &-fixed,
        &-body {
            background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
        }

        &-row-expand-icon {
            color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
            border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
            ${inlineBlockWithVerticalMixin};
            width: 18px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            cursor: pointer;
            &-cell {
                width: 20px;
            }
            :hover {
                color: ${DT.T_COLOR_TEXT_PRIMARY_HOVER};
                border-color: ${DT.T_COLOR_LINE_PRIMARY_HOVER}
            }
        }
        &-expand-icon-th {
            width: 20px;
        }
        &-row-expand-icon.${prefixCls}-row-collapsed:before {
            content: '+';
        }
        &-row-expand-icon.${prefixCls}-row-expanded:before {
            content: '-';
        }
        &-row-spaced {
            visibility: hidden;
        }
        &-row-expanded,
        &-row-collapsed {
            margin-right: 8px;
        }
        &-row-expand-icon-cell .${prefixCls}-row-expand-icon {
            margin: 0;
        }
        
        ${({ hideExpandIcon }) =>
            hideExpandIcon &&
            css`
                &-row-expand-icon-cell,
                &-expand-icon-th,
                &-expand-icon-col,
                &-expanded-row > td:first-child {
                    display: none;
                }
            `}

        &-fixed-header .${prefixCls}-header {
            min-width: 100%;
            overflow: scroll;
            padding-bottom: 20px;
            margin-bottom: -20px;
        }

        &-content {
            position: relative;
            width: 100%;
            clear: both;
        }
        &-thead > tr > th {
            position: relative;
            vertical-align: middle;
            border-bottom: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
            color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
            padding: 12px;
            line-height: 22px;
            text-align: left;
            font-weight: 400;
            &.${prefixCls}-expand-icon-th,
            &.${selectIconHeaderCls} {
                border-color: transparent;
                padding-left: 0;
            }
            &.${placeholderHeaderCls} {
                padding: 0px;
                font-size: 0px;
            }
        }
        &-scroll-position-right,
        &-scroll-position-middle,
        &-scroll-position-left {
            .${prefixCls}-th-fixed-left-latest,
            .${prefixCls}-row-cell-fixed-left-latest,
            .${prefixCls}-th-fixed-right-first,
            .${prefixCls}-row-cell-fixed-right-first {
                ::after {
                    content: '';
                    position: absolute;
                    width: 18px;
                    height: 100%;
                    top: 0;
                    pointer-events: none;
                }
            }
        }
        &-scroll-position-right,
        &-scroll-position-middle {
            .${prefixCls}-th-fixed-left-latest,
            .${prefixCls}-row-cell-fixed-left-latest {
                ::after {
                    right: -18px;
                    box-shadow: ${DT.T_SHADOW_BLOCK_INSET_LEFT};
                }
            }
        }
        &-scroll-position-left,
        &-scroll-position-middle {
            .${prefixCls}-th-fixed-right-first,
            .${prefixCls}-row-cell-fixed-right-first {
                ::after {
                    left: -18px;
                    box-shadow: ${DT.T_SHADOW_BLOCK_INSET_RIGHT};
                }
            }
        }
        &-row, &-row>td, &-thead, &-thead>tr, &-thead>tr>th{
            background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
        }
        &-row > td {
            position: relative;
            vertical-align: middle;
            border-bottom: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
            padding: 12px;
            line-height: 22px;
            text-align: left;
            overflow-wrap: break-word;
            &.${prefixCls}-row-expand-icon-cell,
            &.${selectIconCellCls} {
                border-color: transparent;
                padding-left: 0;
            }
            &.${placeholderCellCls} {
                padding: 0;
                font-size: 0;
            }
        }
        &-row-level-1 > td,
        &-row-level-2 > td,
        &-row-level-3 > td,
        &-row-level-4 > td,
        &-row-level-5 > td {
            background: ${DT.T_TABLE_ROW_COLOR_BG_DEFAULT};
            &.${prefixCls}-row-expand-icon-cell {
                background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
            }
            &.${prefixCls}-row-expand-icon-cell .${prefixCls}-row-spaced {
                visibility: visible;
                display: block;
                position: absolute;
                top: 0;
                left: 10px;
                width: 1px;
                height: 100%;
                background: ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                padding: 0;
                border: none;
                border-bottom: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                cursor: default;
            }
        }
        &-custom-title {
            margin-bottom: 16px;
        }
        &-tip-wrap {
            border-bottom: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
        }


        table > tbody > .${prefixCls}-row-hover > td, table > tbody > .${prefixCls}-row:hover > td {
            background: ${DT.T_TABLE_ROW_COLOR_BG_HOVER};
            &.${prefixCls}-row-expand-icon-cell, &.${selectIconCellCls} {
                background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
            }
        }

        &-row-indent.indent-level-0 {
            display: none;
        }
        
        ${
            zebraCrossing &&
            css`
                &-row:nth-child(odd) > td {
                    background: ${DT.T_TABLE_ROW_COLOR_BG_DEFAULT};
                    &.${prefixCls}-row-expand-icon-cell, &.${selectIconCellCls} {
                        background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
                    }
                }
            `
        };
    }

`
);

export const PopupContainer = styled.div`
    position: relative;
    z-index: 10;
`;

export const ColumnConfigWrap = styled.span`
    ${inlineBlockWithVerticalMixin};
`;

export const ColumnConfigButtonWrap = styled(Button)`
    /* empty */
`;

export const ColumnConfigModalNotice = styled(Notice)`
    border-width: 0 0 1px 0;
`;

export const ColumnConfigModalCheckboxGroup = styled(Checkbox.Group)`
    padding: 20px;
`;

export const ColumnConfigModalCheckbox = styled(Checkbox)`
    padding: 12px 0;
`;

export const ActionButton = styled(Button)`
    margin-right: 4px;
`;

export const CancleSelect = styled.span(
    ({ theme: { designTokens: DT } }) => css`
        cursor: pointer;
        color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
    `
);

addDefaultThemeProps(TableWrap, ColumnConfigButtonWrap, SortIcon, ExpandedRowContent);
