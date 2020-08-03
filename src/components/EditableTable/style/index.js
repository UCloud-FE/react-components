import styled, { css } from 'styled-components';

import config from 'src/config';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';
import SvgIcon from 'src/components/SvgIcon';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-editable-table';

export const AddBtn = styled(SvgIcon)(
    () => css`
        /* empty */
    `
);

export const AddTip = styled.span(
    ({ theme: { designTokens: DT } }) => css`
        font-size: 12px;
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
        line-height: 20px;
        margin-left: 8px;
        vertical-align: middle;
    `
);

export const RemoveBtn = styled(SvgIcon)(
    ({ theme: { designTokens: DT } }) => css`
        cursor: pointer;
        fill: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
        :hover {
            fill: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
        }
    `
);

export const AddBar = styled.div(
    ({ theme: { designTokens: DT }, disabled }) => css`
        width: 100%;
        height: 60px;
        background: ${DT.T_COLOR_BG_DEFAULT_LIGHT};
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
        cursor: pointer;
        text-align: center;
        line-height: 60px;

        ${AddBtn} {
            fill: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
        }

        :hover {
            background: ${DT.T_COLOR_BG_DEFAULT_HOVER};
            ${AddBtn} {
                fill: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            }
        }

        ${disabled &&
        css`
            &&& {
                background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                color: ${DT.T_COLOR_TEXT_DISABLED};
                cursor: not-allowed;

                ${AddTip} {
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                }

                ${AddBtn} {
                    fill: ${DT.T_COLOR_TEXT_DISABLED};
                }
            }
        `}
    `
);

addDefaultThemeProps(AddBar, AddTip, RemoveBtn);
