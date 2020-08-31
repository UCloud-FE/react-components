import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { Row, Col } from 'src/components/Grid';
import config from 'src/config';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-form';

export const ItemWrap = styled(
    withProps({
        className: prefixCls + '-item'
    })(styled(Row)`
        /* empty */
    `)
)`
    /* empty */
`;

export const LabelWrap = styled(
    withProps({
        className: prefixCls + '-label'
    })(styled(Col)`
        padding-top: 4px;
        line-height: 20px;
        word-break: break-all;
    `)
)`
    /* empty */
`;

export const ControllerWrap = styled(
    withProps({
        className: prefixCls + '-controller'
    })(styled(Col)`
        /* empty */
    `)
)`
    /* empty */
`;

export const GroupWrap = styled(
    withProps({
        className: prefixCls + '-group'
    })(styled('div')`
        & + & {
            margin-top: 24px;
        }
        /* empty */
    `)
)`
    /* empty */
`;

export const GroupTitle = styled(
    withProps({
        className: prefixCls + '-group-title'
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
    )
)`
    /* empty */
`;

export const FormWrap = styled(
    withProps({
        className: prefixCls
    })(
        styled('form')(props => {
            const { size } = props;

            return css`
                ${ItemWrap} {
                    margin-bottom: 16px;

                    &:last-child {
                        margin-bottom: 0;
                    }
                }

                ${size === 'lg' &&
                css`
                    ${ItemWrap} {
                        margin-bottom: 24px;
                    }
                    ${LabelWrap} {
                        padding-top: 6px;
                    }
                `};
            `;
        })
    )
)`
    /* empty */
`;

addDefaultThemeProps(GroupTitle);
