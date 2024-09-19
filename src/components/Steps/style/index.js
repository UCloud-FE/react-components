import styled from '@emotion/styled';
import { css } from '@emotion/core';
import config from 'src/config';
import SvgIcon from 'src/components/SvgIcon';
import { spinMixin, inlineBlockWithVerticalMixin } from 'src/style';
import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-steps';
export const stepWrapperCls = prefixCls + '-wrapper';
export const iconCls = prefixCls + '-icon';
export const itemTailCls = prefixCls + '-item-tail';

export const Icon = withProps({ size: '16px' })(styled(SvgIcon)`
    /* empty */
`);

const statusMixin = props => {
    const {
        status,
        theme: { designTokens: DT }
    } = props;

    switch (status) {
        case 'before':
            return css`
                background: ${DT.T_INPUT_COLOR_BG_HL_DEFAULT};
                border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                fill: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            `;
        case 'after':
            return css`
                background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                border-color: ${DT.T_INPUT_COLOR_BG_DEFAULT};
                color: ${DT.T_COLOR_BG_DISABLED_DARK};
                fill: ${DT.T_COLOR_BG_DISABLED_DARK};
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

export const IconWrapper = withProps()(
    styled('span')(props => {
        const { spin } = props;

        return css`
            width: 32px;
            height: 32px;
            min-width: 32px;
            line-height: 30px;
            text-align: center;
            box-sizing: border-box;
            border-radius: 50%;
            border: 1px solid;
            font-size: 0;
            display: inline-block;
            vertical-align: top;
            transition: background 0.3s, border 0.3s;

            ${statusMixin(props)};
            ${spin && spinMixin};
        `;
    })
);

export const StepCountWrapper = styled('span')`
    font-size: 16px;
`;

export const ContentWrapper = styled('span')`
    margin-left: 12px;

    ${inlineBlockWithVerticalMixin};
    flex: 1;
`;

export const TitleWrapper = styled('span')`
    font-size: 14px;
    line-height: 32px;
    display: inline-block;
    transition: all 0.3s;
    position: relative;
`;

export const RemarkWrapper = styled('span')`
    display: block;

    transition: all 0.3s;
    white-space: normal;
    max-width: calc(100% - 16px);
`;

export const StepWrapper = withProps()(
    styled('div')(props => {
        const {
            status,
            isLast,
            showTitle,
            showRemark,
            theme: { designTokens: DT }
        } = props;

        const titleAfterCss = !isLast
            ? css`
                  &:after {
                      content: '';
                      position: absolute;
                      width: 99999px;
                      height: 1px;
                      margin-left: ${showTitle ? '16' : '0'}px;
                      background-color: ${status === 'before'
                          ? DT.T_COLOR_LINE_PRIMARY_DEFAULT
                          : DT.T_COLOR_LINE_DEFAULT_DARK};
                      inset-inline-start: 100%;
                      top: 50%;
                      transform: translateY(-50%);
                  }
              `
            : '';

        const contentWrapperCss = css`
            ${ContentWrapper} {
                ${showRemark || isLast ? 'padding-right:0px;' : 'padding-right:64px;'}
            }
        `;
        if (status === 'after') {
            return css`
                display: flex;
                ${RemarkWrapper} {
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                }
                ${TitleWrapper} {
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                    ${titleAfterCss}
                }
                ${contentWrapperCss}
            `;
        }
        if (status === 'error') {
            return css`
                display: flex;
                ${RemarkWrapper} {
                    color: ${DT.T_COLOR_TEXT_ERROR};
                }
                ${TitleWrapper} {
                    color: ${DT.T_COLOR_TEXT_ERROR};
                    ${titleAfterCss}
                }
                ${contentWrapperCss}
            `;
        }
        if (status === 'current') {
            return css`
                display: flex;
                ${RemarkWrapper} {
                    color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                }
                ${TitleWrapper} {
                    color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                    ${titleAfterCss}
                }
                ${contentWrapperCss}
            `;
        }
        if (status === 'before' || status === 'loading') {
            return css`
                display: flex;
                ${RemarkWrapper} {
                    color: ${DT.T_COLOR_TEXT_REMARK_DARK};
                }
                ${TitleWrapper} {
                    color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                    ${titleAfterCss}
                }
                ${contentWrapperCss}
            `;
        }
        return css`
            display: flex;
            ${TitleWrapper} {
                ${titleAfterCss}
            }
            ${contentWrapperCss}
        `;
    })
);

export const LinkWrapper = withProps()(
    styled('span')(props => {
        const {
            status,
            theme: { designTokens: DT }
        } = props;

        return css`
            display: inline-block;
            text-align: center;
            line-height: 32px;
            margin: 0 32px;
            vertical-align: top;
            transition: all 0.3s;
            ${status === 'before'
                ? css`
                      color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                      fill: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                  `
                : css`
                      color: ${DT.T_COLOR_TEXT_REMARK_DARK};
                      fill: ${DT.T_COLOR_TEXT_REMARK_DARK};
                  `}
        `;
    })
);

export const StepsWrapper = withProps()(
    styled('div')(props => {
        const { direction, nowrap } = props;

        return css`
            ${nowrap
                ? css`
                      display: flex;
                  `
                : css``}
            text-align: initial;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-size: 0;
            list-style: none;
            position: relative;
            ${direction === 'horizontal'
                ? `
                flex-direction: row;
                .${itemTailCls}{
                    display: none;
                }
            `
                : `
                flex-direction: column;
               
                .${stepWrapperCls}{
                    ${TitleWrapper}{
                         &:after{  
                            display: none;
                         }
                    }
                }
            `}
        `;
    })
);

export const StepsItemWrapper = withProps()(
    styled('div')(props => {
        const {
            direction,
            canHover,
            showTitle,
            status,
            nowrap,
            theme: { designTokens: DT }
        } = props;

        return css`
            position: relative;
            display: inline-block;
            min-width: 72px;
            flex: 1;
            overflow: hidden;
            vertical-align: top;
            ${direction === 'horizontal'
                ? `
                ${
                    nowrap
                        ? `
                    margin-left: 16px;
                    &:first-of-type {
                        margin-left: 0;
                    };
                `
                        : `margin: 0 8px;`
                }
                white-space: nowrap; 
                &:last-child {
                    flex: none;
                };
            `
                : `
                display: block;
                flex: 1 0 auto;
                margin-left: 0;
                overflow: visible;
                position: relative;
                vertical-align: top;
                margin-bottom: 20px;
                &:last-child {
                     margin-bottom: 0px;
                     .${itemTailCls}{
                        display: none;
                     }
                };}
                };
                .${itemTailCls}{
                    display: block;
                    position: absolute;
                    top: 0;
                    wdith:1px;
                    height: calc(100% - 20px);
                    padding: 36px 0 0 0;
                    inset-inline-start: 15px;
                    &:after{
                        display: inline-block;
                        content: "";
                        width: 1px;
                        height: 100%;
                        background-color: ${
                            status === 'before' ? DT.T_COLOR_LINE_PRIMARY_DEFAULT : DT.T_COLOR_LINE_DEFAULT_DARK
                        };
                    }
                }
            `}
            ${TitleWrapper} {
                font-size: ${DT.T_TYPO_FONT_SIZE_2};
                min-height: ${direction === 'horizontal' ? 32 : 0}px;
            }
            ${RemarkWrapper} {
                font-size: ${DT.T_TYPO_FONT_SIZE_1};
                line-height: ${DT.T_TYPO_LINE_HEIGHT_LG};
                ${direction === 'vertical' && !showTitle
                    ? `
                            font-size: ${DT.T_TYPO_FONT_SIZE_2};
                            line-height: 32px;
                            min-height: 32px;
                        `
                    : ''}
            }
            ${canHover &&
            `
                cursor: pointer;
                .${stepWrapperCls}{
                    ${TitleWrapper}{
                        color:${DT.T_COLOR_TEXT_DEFAULT_DARK}
                    }
                    ${RemarkWrapper}{
                        color:${DT.T_COLOR_TEXT_REMARK_DARK};
                    }
                    ${
                        status === 'after'
                            ? `
                            .${iconCls} {
                                border-color: ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                                color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                                fill: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                            };
                        `
                            : ''
                    }
                    ${
                        status === 'error'
                            ? `
                            ${RemarkWrapper} {
                                color: ${DT.T_COLOR_TEXT_ERROR};
                            }
                            ${TitleWrapper} {
                                color: ${DT.T_COLOR_TEXT_ERROR};
                            }
                        `
                            : ''
                    }      
                }
                &:hover {
                    ${
                        status !== 'error'
                            ? `
                            ${RemarkWrapper},${TitleWrapper}{
                                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                                border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                            };
                            .${iconCls} {
                                border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                            };
                        
                        `
                            : ``
                    }
                    
                } 
            `}
        `;
    })
);
