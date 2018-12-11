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

const themeMixin = ({ styleType, theme: { colorMap } }) => {
    const color = colorMap[map[styleType]];
    return css`
        background-color: ${color.background};
        border: 1px solid ${color.border};
        ${/* sc-sel */ NoticeIcon} {
            color: ${colorMap[map[styleType]].icon};
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
