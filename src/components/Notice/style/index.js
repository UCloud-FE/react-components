import styled, { css } from 'styled-components';

import Icon from 'src/components/Icon';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

const map = {
    default: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
    info: 'success'
};

export const NoticeIconWrap = styled.span`
    display: table-cell;
    font-size: 15px;
    width: 15px;
    color: inherit;
    padding-right: 8px;
    padding-top: 2px;
`;

export const NoticeIcon = styled(Icon)`
    /* empty */
`;

export const ContentWrap = styled.div`
    display: table-cell;
    vertical-align: middle;
`;

export const ActionWrap = styled.div`
    display: table-cell;
    padding-left: 8px;
    white-space: nowrap;
    text-align: right;
`;

export const CloseWrap = styled.div`
    display: table-cell;
    padding-left: 8px;
    white-space: nowrap;
    text-align: right;
    width: 12px;
`;

export const CloseIcon = styled(Icon)`
    cursor: pointer;
`;

const themeMixin = ({ styleType, theme: { designTokens: DT } }) => {
    const style = map[styleType];
    const colorMap = {
        info: {
            border: DT.T_COLOR_LINE_NOTICE_LIGHT,
            background: DT.T_COLOR_BG_NOTICE_LIGHT,
            icon: DT.T_COLOR_TEXT_PRIMARY_DEFAULT
        },
        success: {
            border: DT.T_COLOR_LINE_SUCCESS_LIGHT,
            background: DT.T_COLOR_BG_SUCCESS_LIGHT,
            icon: DT.T_COLOR_TEXT_SUCCESS
        },
        warning: {
            border: DT.T_COLOR_LINE_WARNING_LIGHT,
            background: DT.T_COLOR_BG_WARNING_LIGHT,
            icon: DT.T_COLOR_TEXT_WARNING
        },
        error: {
            border: DT.T_COLOR_LINE_ERROR_LIGHT,
            background: DT.T_COLOR_BG_ERROR_LIGHT,
            icon: DT.T_COLOR_TEXT_ERROR
        }
    }[style];
    return css`
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
        border: ${DT.T_LINE_WIDTH_BASE} solid ${colorMap.border};
        background: ${colorMap.background};
        ${NoticeIcon} {
            color: ${colorMap.icon};
        }
        ${ActionWrap} {
            color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
        }
    `;
};

export const NoticeWrap = styled.div`
    display: table;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    margin: 0;
    border-radius: 1px;
    line-height: 18px;
    overflow: hidden;

    ${themeMixin};
`;
addDefaultThemeProps(NoticeWrap);
