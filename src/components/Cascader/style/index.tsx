import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from 'src/config';
import { sWrap } from 'src/style';

const { prefixCls: _prefixCls } = config;
const componentName = 'cascader';
export const prefixCls = _prefixCls + '-' + componentName;
export const inputCls = prefixCls + '-input';
const popupCls = prefixCls + '-popup';

export const SWrap = sWrap<{ disabled?: boolean }>({ className: prefixCls })(
    styled.div(() => {
        return css`
            width: 240px;
            &[disabled] {
                .${inputCls} {
                    cursor: default;
                }
                .${inputCls} input[readonly] {
                    cursor: default;
                }
            }
            .${inputCls} {
                cursor: pointer;
            }
            .${inputCls} input[readonly] {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;
            }
        `;
    })
);

export const SPopup = sWrap({ className: popupCls })(
    styled.div(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_LG};
            background: ${DT.T_CARD_COLOR_BG_DEFAULT};
            border-radius: 4px;
        `;
    })
);
