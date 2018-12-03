import styled, { css } from 'styled-components';
import { clearFixMixin, Color, FontSize, inlineBlockWithVerticalMixin } from 'style';

import Button from 'components/Button';
import Notice from 'components/Notice';
import Checkbox from 'components/Checkbox';
import { Col } from 'components/Grid';

import config from 'config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-table';

export const TableWrap = styled.div`
    ${clearFixMixin};
    padding: 15px;

    .${prefixCls} {
        border-radius: 2px;
        background-color: ${Color.bg.white};
        &-scroll table {
            min-width: 100%;
        }
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
            font-size: ${FontSize.xs};
            background-color: ${Color.bg.white};
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
            color: ${Color.font.blue};
            cursor: pointer;
        }
        &-fixed-left,
        &-fixed-right {
            position: absolute;
            top: 0;
            overflow: hidden;

            table {
                width: auto;
            }
        }
        &-fixed-left {
            left: 0;
            box-shadow: 4px 0 4px rgba(100, 100, 100, 0.1);
        }
        &-fixed-right {
            right: 0;
            box-shadow: -4px 0 4px rgba(100, 100, 100, 0.1);
        }
        &-row-expand-icon {
            border: 1px solid ${Color.border.default};
            ${inlineBlockWithVerticalMixin};
            width: 18px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            color: #6b798e;
            cursor: pointer;

            &-cell {
                width: 20px;
            }

            &:before {
                content: '+';
            }
        }
        &-expand-icon-th {
            width: 20px;
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
            overflow: auto;
            padding-bottom: 20px;
            margin-bottom: -20px;
        }
        &-fixed-left .${prefixCls}-body-inner {
            margin-right: -20px;
            padding-right: 20px;
        }

        &-fixed-header .${prefixCls}-fixed-left .${prefixCls}-body-inner {
            padding-right: 0;
        }

        &-content {
            position: relative;
            overflow: hidden;
            width: 100%;
        }
        &-thead > tr > th {
            position: relative;
            vertical-align: middle;
            border-bottom: 1px solid #c3cad9;
            color: #6b798e;
            padding: 12px;
            line-height: 22px;
            text-align: left;
            font-weight: 400;
            word-break: break-all;
        }
        &-row > td {
            position: relative;
            vertical-align: middle;
            border-bottom: 1px solid #e1e6f0;
            color: #0a1633;
            padding: 12px;
            line-height: 22px;
            text-align: left;
            word-break: break-all;
        }

        &-fixed-header .${prefixCls}-scroll .${prefixCls}-header {
            overflow: scroll;
        }

        &-tip-wrap {
            border-bottom: 1px solid ${Color.border.default};
        }
        &-fixed-left .${prefixCls}-tip-wrap, &-fixed-right .${prefixCls}-tip-wrap {
            display: none;
        }

        table > tbody > .${prefixCls}-row-hover, table > tbody > .${prefixCls}-row:hover {
            background-color: ${Color.bg.blueLight};
        }

        &-scroll-position-left .${prefixCls}-fixed-left {
            box-shadow: none;
        }

        &-scroll-position-right .${prefixCls}-fixed-right {
            box-shadow: none;
        }
        &-row-indent.indent-level-0 {
            display: none;
        }
    }
`;

export const PopupContainer = styled.div`
    position: relative;
`;

export const ColumnConfigWrap = styled.span`
    ${inlineBlockWithVerticalMixin};
`;

export const ColumnConfigButtonWrap = styled(Button)`
    border-color: ${Color.border.default};
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

export const ColumnConfigModalSplitLine = styled(Col)`
    height: 1px;
    background: ${Color.border.default};
`;

export const ActionButton = styled(Button)`
    margin-right: 4px;
`;
