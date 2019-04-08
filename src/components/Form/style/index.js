import styled, { css } from 'styled-components';

import { Row, Col } from 'src/components/Grid';
import config from 'src/config';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-form';

export const FormWrap = styled.form.attrs({
    className: prefixCls
})`
    /* empty */
`;

export const ItemWrap = styled(Row).attrs({
    className: prefixCls + '-item'
})`
    margin-bottom: 16px;
    &:last-child {
        margin-bottom: 0;
    }
`;

export const LabelWrap = styled(Col).attrs({
    className: prefixCls + '-label'
})`
    padding-top: 5px;
    line-height: 1.5;
    word-break: break-all;
`;

export const ControllerWrap = styled(Col).attrs({
    className: prefixCls + '-controller'
})`
    /* empty */
`;

export const GroupWrap = styled.div.attrs({
    className: prefixCls + '-group'
})`
    & + & {
        margin-top: 24px;
    }
    /* empty */
`;

export const GroupTitle = styled.div.attrs({
    className: prefixCls + '-group-title'
})`
    font-weight: bold;
    line-height: 22px;
    padding: 12px 0;
    margin-bottom: 24px;

    ${({ theme: { colorList, colorMap, titleFontSize } }) => css`
        font-size: ${titleFontSize};
        border-bottom: 1px solid ${colorMap.default.border};
        color: ${colorList.title};
    `};
`;

addDefaultThemeProps(GroupTitle);
