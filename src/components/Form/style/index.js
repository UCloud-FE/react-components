import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { Row, Col } from 'src/components/Grid';
import config from 'src/config';

import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-form';
const itemCls = prefixCls + '-item';
const labelCls = prefixCls + '-label';
const controllerCls = prefixCls + '-controller';
const groupCls = prefixCls + '-group';
const groupTitleCls = groupCls + '-title';

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
            theme: { colorList, colorMap, titleFontSize }
        } = props;

        return css`
            font-weight: bold;
            line-height: 22px;
            padding: 12px 0;
            margin-bottom: 24px;

            ${css`
                font-size: ${titleFontSize};
                border-bottom: 1px solid ${colorMap.default.border};
                color: ${colorList.title};
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
