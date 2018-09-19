import styled, { css } from 'styled-components';

import { Color, Height, inlineBlockWithVerticalMixin } from 'src/style';

const Width = {
    sm: '45px',
    md: '80px',
    lg: '100px'
};

const Padding = {
    sm: '1px',
    md: '4px',
    lg: '4px'
};

const Border = {
    sm: 'none',
    md: `1px solid ${Color.border.default}`,
    lg: `1px solid ${Color.border.default}`
};

const BtnLeft = {
    sm: '20px',
    md: '49px',
    lg: '63px;'
};

const BtnSize = {
    sm: '22px',
    md: '20px',
    lg: '26px'
};

const LineLeft = {
    sm: '13px',
    md: '13px',
    lg: '18px'
};
const LineHeight = {
    sm: '12px',
    md: '10px',
    lg: '16px'
};

export const Inner = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    border-radius: 2px;
    border: 1px solid #c3cad9;
    box-sizing: border-box;
    background: #ebedf0;
`;

export const Text = styled.span`
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 22px;
    box-sizing: border-box;

    ${inlineBlockWithVerticalMixin};
`;

export const OnText = Text.extend`
    /* empty */
`;
export const OffText = Text.extend`
    /* empty */
`;

export const ButtonWrap = styled.span`
    position: absolute;
    display: inline-block;
    left: -1px;
    top: -2px;
    background-color: #fff;
    box-shadow: 0 0.5px 0.5px #c3cad9;
    border-radius: 2px;
    border: 1px solid #c3cad9;
    box-sizing: border-box;
    transition: all 0.3s;
`;

export const Line = styled.span`
    position: absolute;
    display: inline-block;
    left: 18px;
    top: 4px;
    width: 2px;
    height: 16px;
    border-radius: 1px;
    background-color: #e69b9b;
    transition: all 0.3s;
`;

export const SwitchWrap = styled.div`
    position: relative;
    border-radius: 2px;
    overflow: hidden;
    box-sizing: border-box;
    cursor: pointer;
    background: ${Color.bg.white};
    transition: all 0.3s;

    ${inlineBlockWithVerticalMixin};

    &:hover {
        border-color: ${Color.border.blue};
    }

    ${({ size }) => css`
        height: ${Height[size]};
        width: ${Width[size]};
        padding: ${Padding[size]};
        border: ${Border[size]};

        ${ButtonWrap} {
            width: ${BtnSize[size]};
            height: ${BtnSize[size]};
        }

        ${Line} {
            left: ${LineLeft[size]};
            height: ${LineHeight[size]};
        }
    `};

    ${({ size }) =>
        size === 'sm' &&
        css`
            ${OnText}, ${OffText} {
                display: none;
            }
        `};
    ${({ size }) =>
        size === 'md' &&
        css`
            line-height: 16px;

            ${OnText}, ${OffText} {
                line-height: 16px;
            }
            ${OnText} {
                padding-right: 20px;
            }
            ${OffText} {
                padding-left: 20px;
            }
        `};
    ${({ size }) =>
        size === 'lg' &&
        css`
            line-height: 22px;

            ${OnText} {
                padding-right: 26px;
            }
            ${OffText} {
                padding-left: 26px;
            }
        `};

    ${({ checked, size }) =>
        checked
            ? css`
                  ${/* sc-sel */ Inner} {
                      border-color: #9fecc0;
                      background-color: #c3f3d8;
                      color: #5cd78e;
                  }

                  ${/* sc-custom */ ButtonWrap} {
                      left: ${BtnLeft[size]};
                  }

                  ${Line} {
                      background: #9fecc0;
                  }

                  ${OffText} {
                      display: none;
                  }
              `
            : css`
                  ${OnText} {
                      display: none;
                  }
              `};

    ${({ disabled }) =>
        disabled &&
        css`
            border-color: ${Color.border.disabled};
            cursor: not-allowed;
            pointer-events: none;

            ${Inner} {
                border-color: #f7f7f7;
                background-color: #f7f7f7;
            }

            ${Line} {
                background-color: #f7f7f7;
            }
        `};
`;
