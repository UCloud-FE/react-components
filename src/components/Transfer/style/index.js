import styled, { css } from 'styled-components';

import config from 'src/config';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';
import { prefixCls as menuCls } from 'src/components/Menu/style';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-transfer';
export const partWrapCls = prefixCls + '-part-wrap';
export const partContentCls = prefixCls + '-part-content';
export const footerCls = prefixCls + '-footer';
export const titleCls = prefixCls + '-title';
export const actionCls = prefixCls + '-action';
export const actionWrapCls = prefixCls + '-action-wrap';
export const searchCls = prefixCls + '-search-wrap';
export const tipWrapCls = prefixCls + '-tip-wrap';
export const listWrapCls = prefixCls + '-list-wrap';
export const searchClearBtnCls = prefixCls + '-clear-search-btn';
export const disabledCls = prefixCls + '-disabled';

export const TransferWrap = styled.div(
    ({ theme: { designTokens: DT } }) => css`
        display: flex;
        align-items: stretch;
        justify-content: flex-start;

        .${partWrapCls} {
            display: flex;
            flex: 1;
            flex-direction: column;
        }
        .${searchCls} {
            margin: 12px;
        }
        .${titleCls} {
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
            font-size: 12px;
            line-height: 20px;
            padding: 6px 4px;
        }
        .${partContentCls} {
            min-width: 300px;
            min-height: 200px;
            border-radius: 2px;
            width: 100%;
            border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
            flex: 1;
            display: flex;
            flex-direction: column;
            .${menuCls} {
                max-height: 300px;
            }
        }
        .${disabledCls} {
            .${partContentCls}, .${footerCls} {
                border-color: ${DT.T_COLOR_LINE_DISABLED_LIGHT};
            }
        }
        .${actionWrapCls} {
            padding: 12px;
            display: flex;
            align-items: center;
            flex-direction: column;
            flex: none;
            align-self: center;
            .${actionCls}+.${actionCls} {
                margin-top: 8px;
            }
        }
        .${tipWrapCls} {
            margin: 50px;
            padding: 8px;
            flex: 1;
        }
        .${listWrapCls} {
            flex: 1;
        }
        .${footerCls} {
            border-top: 1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
            padding: 8px;
        }
        .${searchClearBtnCls} {
            margin-left: 4px;
            cursor: pointer;
            color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
        }
    `
);

addDefaultThemeProps(TransferWrap);
