import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { clearFixMixin } from 'src/style';
import config from 'src/config';

import withProps from 'src/utils/withProps';

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
const spanMixin = props => {
    const { span } = props;

    return css`
        float: left;
        flex: 0 0 auto;
        width: ${percentage(span / maxColumns)};
        ${span === 0 &&
        css`
            display: none;
        `};
    `;
};
const pushMixin = props => {
    const { push } = props;

    return css`
        left: ${percentage(push / maxColumns)};
    `;
};
const pullMixin = props => {
    const { pull } = props;

    return css`
        right: ${percentage(pull / maxColumns)};
    `;
};
const offsetMixin = props => {
    const { offset } = props;

    return css`
        margin-left: ${percentage(offset / maxColumns)};
    `;
};
const orderMixin = props => {
    const { order } = props;

    return css`
        order: ${order};
    `;
};

const justifyMixin = props => {
    const { justify } = props;

    return css`
        justify-content: ${{
            start: 'flex-start',
            center: 'center',
            end: 'flex-end',
            'space-around': 'space-around',
            'space-between': 'space-between'
        }[justify]};
    `;
};
const alignMixin = props => {
    const { align } = props;

    return css`
        align-items: ${{ top: 'flex-start', middle: 'center', bottom: 'flex-end' }[align]};
    `;
};

export const ColWrap = styled(
    withProps({
        className: colPrefixCls
    })(
        styled('div')(props => {
            return css`
                position: relative;
                display: block;
                box-sizing: border-box;
                min-height: 1px;

                ${props.span !== undefined && spanMixin(props)};
                ${props.push && pushMixin(props)};
                ${props.pull && pullMixin(props)};
                ${props.offset && offsetMixin(props)};
                ${props.order && orderMixin(props)};
            `;
        })
    )
)`
    /* empty */
`;

export const RowWrap = styled(
    withProps({
        className: rowPrefixCls
    })(
        styled('div')(props => {
            const { type, gutter } = props;

            return css`
                position: relative;
                display: block;
                height: auto;

                ${type === 'flex' ? flexMixin : clearFixMixin};
                margin-left: ${-(gutter / 2) + 'px'};
                margin-right: ${-(gutter / 2) + 'px'};
                ${justifyMixin(props)};
                ${alignMixin(props)};

                > ${/* sc-sel */ ColWrap} {
                    padding-left: ${gutter / 2 + 'px'};
                    padding-right: ${gutter / 2 + 'px'};
                }
            `;
        })
    )
)`
    /* empty */
`;
