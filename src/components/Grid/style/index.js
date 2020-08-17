import styled, { css } from 'styled-components';

import { clearFixMixin } from 'src/style';
import config from 'src/config';

const { prefixCls: _prefixCls } = config;
const colPrefixCls = _prefixCls + '-col';
const rowPrefixCls = _prefixCls + '-row';

const maxColumns = 12;

const percentage = v => {
    return +(v * 100).toFixed(8) + '%';
};

const flexMixin = css`
    display: flex;
    flex-flow: row wrap;
`;
const spanMixin = css`
    float: left;
    flex: 0 0 auto;
    width: ${({ span }) => percentage(span / maxColumns)};
    ${({ span }) =>
        span === 0 &&
        css`
            display: none;
        `};
`;
const pushMixin = css`
    left: ${({ push }) => percentage(push / maxColumns)};
`;
const pullMixin = css`
    right: ${({ pull }) => percentage(pull / maxColumns)};
`;
const offsetMixin = css`
    margin-left: ${({ offset }) => percentage(offset / maxColumns)};
`;
const orderMixin = css`
    order: ${({ order }) => order};
`;

const justifyMixin = css`
    justify-content: ${({ justify }) =>
        ({
            start: 'flex-start',
            center: 'center',
            end: 'flex-end',
            'space-around': 'space-around',
            'space-between': 'space-between'
        }[justify])};
`;
const alignMixin = css`
    align-items: ${({ align }) => ({ top: 'flex-start', middle: 'center', bottom: 'flex-end' }[align])};
`;

export const ColWrap = styled.div.attrs({
    className: colPrefixCls
})`
    position: relative;
    display: block;
    box-sizing: border-box;
    min-height: 1px;

    ${props => props.span !== undefined && spanMixin};
    ${props => props.push && pushMixin};
    ${props => props.pull && pullMixin};
    ${props => props.offset && offsetMixin};
    ${props => props.order && orderMixin};
`;

export const RowWrap = styled.div.attrs({
    className: rowPrefixCls
})`
    position: relative;
    display: block;
    height: auto;

    ${({ type }) => (type === 'flex' ? flexMixin : clearFixMixin)};
    margin-left: ${({ gutter }) => -(gutter / 2) + 'px'};
    margin-right: ${({ gutter }) => -(gutter / 2) + 'px'};
    ${justifyMixin};
    ${alignMixin};

    > ${/* sc-sel */ ColWrap} {
        padding-left: ${({ gutter }) => gutter / 2 + 'px'};
        padding-right: ${({ gutter }) => gutter / 2 + 'px'};
    }
`;
