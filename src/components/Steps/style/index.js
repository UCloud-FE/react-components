import styled, { css } from 'styled-components';

import { spinMixin, inlineBlockWithVerticalMixin } from 'src/style';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

export const SvgWrapper = styled.svg.attrs({
    xmlns: 'http://www.w3.org/2000/svg'
})`
    width: 16px;
    height: 16px;
    ${inlineBlockWithVerticalMixin};

    ${({ fillColor }) =>
        fillColor &&
        css`
            fill: ${fillColor};
        `};
`;

const statusMixin = ({
    status,
    theme: {
        TColorMap: { text: TTextColorMap, border: TBorderColorMap, bg: TBgColorMap },
        TColorList: { brand: TBrandColorList }
    }
}) => {
    switch (status) {
        case 'before':
            return css`
                background: ${TBrandColorList.primary1};
                border-color: ${TBorderColorMap.primary};
                color: ${TTextColorMap.primary};
                fill: ${TTextColorMap.primary};
            `;
        case 'after':
            return css`
                background: ${TBgColorMap.disabled};
                border-color: ${TBorderColorMap.disabled};
                color: ${TTextColorMap.disabled};
                fill: ${TTextColorMap.disabled};
            `;
        case 'current':
        case 'loading':
            return css`
                background: ${TBrandColorList.primary6};
                border-color: ${TBrandColorList.primary6};
                color: ${TTextColorMap.white};
                fill: ${TTextColorMap.white};
            `;
        case 'error':
            return css`
                background: ${TBgColorMap.error};
                border-color: ${TBorderColorMap.error};
                color: ${TTextColorMap.error};
                fill: ${TTextColorMap.error};
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

const linkStatusMixin = ({
    status,
    theme: {
        TColorMap: { text: TTextColorMap }
    }
}) => {
    if (status === 'before') {
        return css`
            color: ${TTextColorMap.primary};
            fill: ${TTextColorMap.primary};
        `;
    }
    return css`
        color: ${TTextColorMap.remark};
        fill: ${TTextColorMap.remark};
    `;
};

const stepStatusMixin = ({
    status,
    theme: {
        TColorMap: { text: TTextColorMap, border: TBorderColorMap, bg: TBgColorMap },
        TColorList: { brand: TBrandColorList }
    }
}) => {
    if (status === 'error') {
        return css`
            ${RemarkWrapper}, ${TitleWrapper} {
                color: ${TTextColorMap.error};
            }
        `;
    }
    if (status === 'current' || status === 'before' || status === 'loading') {
        return css`
            ${TitleWrapper} {
                color: ${TTextColorMap.dark};
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

export const StepsWrapper = styled.div(
    ({
        theme: {
            TColorMap: { text: TTextColorMap }
        }
    }) => css`
        color: ${TTextColorMap.default};
    `
);

addDefaultThemeProps(StepsWrapper, IconWrapper, StepWrapper, LinkWrapper);
