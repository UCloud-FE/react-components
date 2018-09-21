import styled from 'styled-components';
import Icon from 'components/Icon';

import { Color } from 'style';

const NoticeColor = {
    border: { default: 'default', warning: 'yellow', error: 'red', info: 'blueBright' },
    bg: { default: 'default', warning: 'yellow', error: 'red', info: 'blueLight' }
};
const IconColor = {
    font: { default: 'default', warning: 'yellow', error: 'red', info: 'blue' }
};

const getColor = (map, styleName, type) => {
    return Color[styleName][map[styleName][type]] || '';
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

    color: ${Color.font.default};
    background-color: ${({ styleType }) => getColor(NoticeColor, 'bg', styleType)};
    border: 1px solid ${({ styleType }) => getColor(NoticeColor, 'border', styleType)};
`;

export const NoticeIconWrap = styled.span`
    display: table-cell;
    font-size: 15px;
    width: 15px;
    color: inherit;
    padding-right: 8px;
    padding-top: 2px;
`;

export const NoticeIcon = styled(Icon)`
    color: ${({ styleType }) => getColor(IconColor, 'font', styleType)};
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
