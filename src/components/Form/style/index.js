import styled from 'styled-components';

import { Row, Col } from 'components/Grid';

export const ItemWrap = styled(Row)`
    margin-bottom: 16px;
    &:last-child {
        margin-bottom: 0;
    }
`;
export const LabelWrap = styled(Col)`
    padding-top: 5px;
    line-height: 1.5;
    word-break: break-all;
`;
