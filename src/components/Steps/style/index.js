import styled, { css } from 'styled-components';

import SvgIcon from 'src/components/SvgIcon';
import { spinMixin, inlineBlockWithVerticalMixin } from 'src/style';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

export const Icon = styled(SvgIcon).attrs({ size: '16px' })`
    /* empty */
`;

const statusMixin = ({ status, theme: { designTokens: DT } }) => {
    switch (status) {
        case 'before':
            return css`
                background: ${DT.T_COLOR_BG_PRIMARY_5};
                border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                fill: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            `;
        case 'after':
            return css`
                background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                border-color: ${DT.T_COLOR_LINE_DISABLED_LIGHT};
                color: ${DT.T_COLOR_TEXT_DISABLED};
                fill: ${DT.T_COLOR_TEXT_DISABLED};
            `;
        case 'current':
        case 'loading':
            return css`
                background: ${DT.T_COLOR_BG_PRIMARY_1};
                border-color: ${DT.T_COLOR_BG_PRIMARY_1};
                color: ${DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT};
                fill: ${DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT};
            `;
        case 'error':
            return css`
                background: ${DT.T_COLOR_BG_ERROR_LIGHT};
                border-color: ${DT.T_COLOR_LINE_ERROR_DARK};
                color: ${DT.T_COLOR_TEXT_ERROR};
                fill: ${DT.T_COLOR_TEXT_ERROR};
            `;
    }
};

export const IconWrapper = styled.span`
    width: 32px;
    height: 32px;
    line-height: 30px;
    text-align: center;
    box-sizing: border-box;
    border-radius: 50%;
    border: 1px solid;
    font-size: 0;
    display: inline-block;
    vertical-align: top;
    transition: all 0.3s;

    ${statusMixin};
    ${({ spin }) => spin && spinMixin};
`;

export const StepCountWrapper = styled.span`
    font-size: 16px;
`;

export const ContentWrapper = styled.span`
    margin-left: 12px;

    ${inlineBlockWithVerticalMixin};
`;

export const TitleWrapper = styled.span`
    font-size: 14px;
    line-height: 32px;
    min-height: 32px;
    display: block;
    transition: all 0.3s;
`;

export const RemarkWrapper = styled.span`
    font-size: 12px;
    line-height: 24px;
    transition: all 0.3s;
`;

const linkStatusMixin = ({ status, theme: { designTokens: DT } }) => {
    if (status === 'before') {
        return css`
            color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            fill: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
        `;
    }
    return css`
        color: ${DT.T_COLOR_TEXT_REMARK_DARK};
        fill: ${DT.T_COLOR_TEXT_REMARK_DARK};
    `;
};

const stepStatusMixin = ({ status, theme: { designTokens: DT } }) => {
    if (status === 'error') {
        return css`
            ${RemarkWrapper}, ${TitleWrapper} {
                color: ${DT.T_COLOR_TEXT_ERROR};
            }
        `;
    }
    if (status === 'current' || status === 'before' || status === 'loading') {
        return css`
            ${RemarkWrapper} {
                color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
            }
            ${TitleWrapper} {
                color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
            }
        `;
    }
};

export const StepWrapper = styled.div`
    ${inlineBlockWithVerticalMixin};

    ${stepStatusMixin};
`;

export const LinkWrapper = styled.span`
    display: inline-block;
    text-align: center;
    line-height: 32px;
    margin: 0 32px;
    vertical-align: top;
    transition: all 0.3s;

    ${linkStatusMixin};
`;

export const StepsWrapper = styled.div`
    /* empty */
`;

addDefaultThemeProps(StepsWrapper, IconWrapper, StepWrapper, LinkWrapper);
