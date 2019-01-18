import styled from 'styled-components';

import { Row, Col } from 'src/components/Grid';
import config from 'src/config';

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
