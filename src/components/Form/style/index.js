import React, { memo } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';

import SvgIcon from 'src/components/SvgIcon';
import { Row, Col } from 'src/components/Grid';
import Combine from 'src/components/Combine';
import config from 'src/config';

import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-form';
const itemCls = prefixCls + '-item';
const labelCls = prefixCls + '-label';
const controllerCls = prefixCls + '-controller';
const groupCls = prefixCls + '-group';
const groupTitleCls = groupCls + '-title';
export const tipCls = prefixCls + '-tip';
export const tipIconCls = tipCls + '-icon';
export const tipContentCls = tipCls + '-content';
const subGroupCls = prefixCls + '-sub-group';

export const ItemWrap = withProps({
    className: itemCls
})(styled(Row)`
    /* empty */
`);

export const LabelWrap = withProps({
    className: labelCls
})(styled(Col)`
    padding-top: 4px;
    line-height: 20px;
    word-break: break-all;
`);

export const ControllerWrap = withProps({
    className: controllerCls
})(styled(Col)`
    /* empty */
`);

export const GroupWrap = withProps({
    className: groupCls
})(styled('div')`
    & + & {
        margin-top: 24px;
    }
    /* empty */
`);

export const GroupTitle = withProps({
    className: groupTitleCls
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            font-weight: bold;
            line-height: 22px;
            padding: 12px 0;
            margin-bottom: 24px;

            ${css`
                font-size: 14px;
                border-bottom: 1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
                color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
            `};
        `;
    })
);

export const FormWrap = withProps({
    className: prefixCls
})(
    styled('form')(props => {
        const { size } = props;

        return css`
            .${itemCls} {
                margin-bottom: 16px;
                &:last-child {
                    margin-bottom: 0;
                }
            }
            ${size === 'lg' &&
            css`
                .${itemCls} {
                    margin-bottom: 24px;
                }
                .${labelCls} {
                    padding-top: 6px;
                }
            `};
        `;
    })
);

export const Tip = withProps({ className: tipCls })(
    styled(Combine)(props => {
        const {
            status,
            theme: { designTokens: DT }
        } = props;
        const iconColorDT =
            {
                success: 'T_COLOR_BG_SUCCESS_DARK',
                warning: 'T_COLOR_BG_WARNING_DARK',
                error: 'T_COLOR_BG_ERROR_DARK',
                loading: 'T_COLOR_TEXT_PRIMARY_DEFAULT'
            }[status] || 'T_COLOR_TEXT_PRIMARY_DEFAULT';
        const colorDt =
            {
                error: 'T_COLOR_TEXT_ERROR'
            }[status] || 'T_COLOR_TEXT_DEFAULT_LIGHT';
        return css`
            margin-top: 4px;
            color: ${DT[colorDt]};
            .${tipContentCls} {
                line-height: 20px;
            }
            .${tipIconCls} {
                fill: ${DT[iconColorDT]};
            }
        `;
    })
);

let StatusIcon = ({ status, ...rest }) => {
    const iconType =
        {
            success: 'circle-tick',
            warning: 'circle-exclamation',
            error: 'circle-cross',
            loading: 'ring-loading'
        }[status] || 'circle-info';
    return <SvgIcon type={iconType} className={tipIconCls} {...rest} />;
};
StatusIcon.propTypes = {
    status: PropTypes.string
};
StatusIcon = memo(StatusIcon);

export { StatusIcon };

export const SubGroupWrap = withProps({ className: subGroupCls })(
    styled.div(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            padding: 20px;
            border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
            background: ${DT.T_COLOR_BG_DEFAULT_DARK};

            * + & {
                margin-top: 12px;
            }
            & .${itemCls} {
                margin-bottom: 16px;
            }
        `;
    })
);
