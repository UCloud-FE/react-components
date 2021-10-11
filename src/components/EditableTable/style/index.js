import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from 'src/config';
import SvgIcon from 'src/components/SvgIcon';
import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-editable-table';
export const btnCls = prefixCls + '-btn';
export const tipCls = prefixCls + '-tip';

export const AddTip = withProps({
    className: tipCls
})(
    styled('span')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            font-size: 12px;
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
            line-height: 20px;
            margin-left: 8px;
            vertical-align: middle;
        `;
    })
);

export const RemoveBtn = withProps()(
    styled(SvgIcon)(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            cursor: pointer;
            fill: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
            :hover {
                fill: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            }
        `;
    })
);

export const AddBar = withProps()(
    styled('div')(props => {
        const {
            theme: { designTokens: DT },
            disabled
        } = props;

        return css`
            width: 100%;
            height: 60px;
            background: ${DT.T_TABLE_ROW_COLOR_BG_DEFAULT};
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
            cursor: pointer;
            text-align: center;
            line-height: 60px;
            border-top: 1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK};

            .${btnCls} {
                fill: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            }

            :hover {
                background: ${DT.T_COLOR_BG_DEFAULT_HOVER};
                .${btnCls} {
                    fill: ${DT.T_COLOR_TEXT_PRIMARY_HOVER};
                }
            }

            ${disabled &&
            css`
                &&& {
                    background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                    cursor: default;

                    .${tipCls} {
                        color: ${DT.T_COLOR_TEXT_DISABLED};
                    }

                    .${btnCls} {
                        fill: ${DT.T_COLOR_TEXT_DISABLED};
                    }
                }
            `}
        `;
    })
);
