import styled from 'styled-components';

export const BadgeWrap = styled.div`
    position: relative;
    display: inline-block;
`;

export const BaseBadge = styled.span`
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

export const DotBadge = BaseBadge.extend`
    width: 10px;
    height: 10px;
    padding: 0;
    border-radius: 5px;
    min-width: unset;
    min-height: unset;
`;
