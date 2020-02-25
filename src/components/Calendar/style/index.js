import React from 'react';
import styled, { css } from 'styled-components';
import RcCalendar from 'rc-calendar';
import RcMonthCalendar from 'rc-calendar/lib/MonthCalendar';

import config from 'src/config';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-calendar';

/* stylelint-disable no-duplicate-selectors */
export const calendarMixin = ({ theme: { designTokens: DT } }) => css`
    &.${prefixCls}, .${prefixCls} {
        outline: none;
        position: relative;
        color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
        box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_LG};
        background: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};
    }

    .${prefixCls}-month-panel, .${prefixCls}-year-panel, .${prefixCls}-decade-panel {
        background: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};
    }

    .${prefixCls}-header,
        .${prefixCls}-month-panel-header,
        .${prefixCls}-year-panel-header,
        .${prefixCls}-decade-panel-header {
        width: 100%;
        height: 38px;
        line-height: 38px;
        background: ${DT.T_COLOR_BG_PRIMARY_1};
        user-select: none;
    }
    .${prefixCls}-month-header-wrap {
        height: 180px;
    }
    .${prefixCls}-month-panel-body {
        height: 140px;
    }
    .${prefixCls}-prev-year-btn,
        .${prefixCls}-prev-month-btn,
        .${prefixCls}-next-year-btn,
        .${prefixCls}-next-month-btn,
        .${prefixCls}-month-panel-prev-year-btn,
        .${prefixCls}-month-panel-next-year-btn,
        .${prefixCls}-year-panel-prev-decade-btn,
        .${prefixCls}-year-panel-next-decade-btn,
        .${prefixCls}-decade-panel-prev-century-btn,
        .${prefixCls}-decade-panel-next-century-btn {
        cursor: pointer;
        padding: 0 8px;
        display: inline-block;
        color: ${DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT};
        box-sizing: border-box;
        position: absolute;
        font-family: Arial, 'Hiragino Sans GB', 'Microsoft Yahei', 'Microsoft Sans Serif', sans-serif;
        font-size: 16px;
    }
    .${prefixCls}-prev-year-btn,
        .${prefixCls}-month-panel-prev-year-btn,
        .${prefixCls}-year-panel-prev-decade-btn,
        .${prefixCls}-decade-panel-prev-century-btn {
        left: 0;
    }
    .${prefixCls}-prev-month-btn {
        left: 30px;
    }
    .${prefixCls}-next-year-btn,
        .${prefixCls}-month-panel-next-year-btn,
        .${prefixCls}-year-panel-next-decade-btn,
        .${prefixCls}-decade-panel-next-century-btn {
        right: 0;
    }
    .${prefixCls}-next-month-btn {
        right: 30px;
    }
    .${prefixCls}-prev-year-btn::before,
        .${prefixCls}-month-panel-prev-year-btn::before,
        .${prefixCls}-year-panel-prev-decade-btn::before,
        .${prefixCls}-decade-panel-prev-century-btn::before {
        content: '\\AB';
    }
    .${prefixCls}-prev-month-btn::before {
        content: '\\2039';
    }
    .${prefixCls}-next-year-btn::before,
        .${prefixCls}-month-panel-next-year-btn::before,
        .${prefixCls}-year-panel-next-decade-btn::before,
        .${prefixCls}-decade-panel-next-century-btn::before {
        content: '\\BB';
    }
    .${prefixCls}-next-month-btn::before {
        content: '\\203A';
    }
    .${prefixCls}-year-select, .${prefixCls}-month-select, .${prefixCls}-day-select {
        margin-right: 8px;
    }
    .${prefixCls}-my-select,
        .${prefixCls}-ym-select,
        .${prefixCls}-month-panel-year-select,
        .${prefixCls}-year-panel-decade-select,
        .${prefixCls}-decade-panel-century {
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -75px;
        width: 150px;
        text-align: center;
        display: block;
        color: ${DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT};
    }

    .${prefixCls}-body {
        width: 100%;
        padding: 0 5px 5px;
        background-color: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};
        box-sizing: border-box;
    }
    .${prefixCls}-table,
        .${prefixCls}-month-panel-table,
        .${prefixCls}-year-panel-table,
        .${prefixCls}-decade-panel-table {
        width: 100%;
    }

    .${prefixCls}-table > thead,
    .${prefixCls}-month-panel-table > thead {
        border-bottom: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
    }
    .${prefixCls}-column-header,
        .${prefixCls}-cell,
        .${prefixCls}-month-panel-cell,
        .${prefixCls}-year-panel-cell,
        .${prefixCls}-decade-panel-cell {
        cursor: pointer;
        height: 25px;
        line-height: 25px;
        padding: 5px;
        text-align: center;
    }
    .${prefixCls}-cell
        .${prefixCls}-date,
        .${prefixCls}-month-panel-cell
        .${prefixCls}-month-panel-month,
        .${prefixCls}-year-panel-cell
        .${prefixCls}-year-panel-year,
        .${prefixCls}-decade-panel-cell
        .${prefixCls}-decade-panel-decade {
        display: block;
        border-radius: 2px;
    }
    .${prefixCls}-last-month-cell,
        .${prefixCls}-month-panel-last-year-cell,
        .${prefixCls}-year-panel-last-decade-cell,
        .${prefixCls}-decade-panel-last-century-cell,
        .${prefixCls}-next-month-btn-day,
        .${prefixCls}-month-panel-next-year-cell,
        .${prefixCls}-year-panel-next-decade-cell,
        .${prefixCls}-decade-panel-next-century-cell {
        color: ${DT.T_COLOR_TEXT_DISABLED};
    }

    .${prefixCls}-date-panel {
        outline: none;
    }
    .${prefixCls}-month-panel, .${prefixCls}-year-panel, .${prefixCls}-decade-panel {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    .${prefixCls}-today, .${prefixCls}-month-panel-current-cell {
        position: relative;
        color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
    }

    .${prefixCls}-today::after, .${prefixCls}-month-panel-current-cell::after {
        content: '•';
        position: absolute;
        bottom: 0px;
        left: 0;
        right: 0;
        height: 10px;
        line-height: 10px;
        margin: auto;
    }
    .${prefixCls}-selected-day.${prefixCls}-today::after,
        .${prefixCls}-selected-date.${prefixCls}-today::after,
        .${prefixCls}-month-panel-selected-cell.${prefixCls}-month-panel-current-cell::after {
        display: none;
    }
    .${prefixCls}-selected-day .${prefixCls}-date {
        background: ${DT.T_COLOR_BG_PRIMARY_5};
    }
    .${prefixCls}-selected-date
        .${prefixCls}-date,
        .${prefixCls}-month-panel-selected-cell
        .${prefixCls}-month-panel-month,
        .${prefixCls}-year-panel-selected-cell
        .${prefixCls}-year-panel-year,
        .${prefixCls}-decade-panel-selected-cell
        .${prefixCls}-decade-panel-decade {
        color: ${DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT};
        background: ${DT.T_COLOR_BG_PRIMARY_1};
    }
    .${prefixCls}-disabled-cell, .${prefixCls}-month-panel-cell-disabled {
        color: ${DT.T_COLOR_TEXT_DISABLED};
    }
    .${prefixCls}-month-panel-year-select-arrow, .${prefixCls}-year-panel-decade-select-arrow {
        display: none;
    }
`;

// eslint-disable-next-line no-unused-vars,react/prop-types
const CleanPropsRcCalendar = ({ theme, ...rest }) => {
    return <RcCalendar {...rest} />;
};
// eslint-disable-next-line no-unused-vars,react/prop-types
const CleanPropsRcMonthCalendar = ({ theme, ...rest }) => {
    return <RcMonthCalendar {...rest} />;
};

export const CalendarWrap = styled(CleanPropsRcCalendar)`
    ${calendarMixin};
`;

export const MonthCalendarWrap = styled(CleanPropsRcMonthCalendar)`
    ${calendarMixin};
    .${prefixCls}-month-panel-body {
        padding-top: 5px;
    }
`;

addDefaultThemeProps(CalendarWrap, MonthCalendarWrap);
