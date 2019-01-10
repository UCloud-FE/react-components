import styled from 'styled-components';

import config from 'src/config';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-badge';

export const BadgeWrap = styled.div.attrs({
    className: prefixCls
})`
    position: relative;
    display: inline-block;
`;

export const BaseBadge = styled.span.attrs({
    className: prefixCls + '-badge'
})`
    display: inline-block;
    min-height: 20px;
    line-height: 20px;
    min-width: 10px;
    padding: 0 5px;
    border-radius: 10px;
    text-align: center;
    background: red;
    color: white;
`;

export const DotBadge = styled(BaseBadge).attrs({
    className: prefixCls + '-badge-dot'
})`
    width: 10px;
    height: 10px;
    padding: 0;
    border-radius: 5px;
    min-width: unset;
    min-height: unset;
`;
