import styled from '@emotion/styled';
import { css } from '@emotion/core';
import config from 'src/config';
import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
const prefixClsBox = _prefixCls + '-box';
export const prefixCls = _prefixCls + '-outer-wrapper';
export const configInfoWrapperCls = _prefixCls + '-wrapper';
export const itemWrapperCls = _prefixCls + '-item-wrapper';
export const itemWrapperNoBottomCls = _prefixCls + '_item-wrapper-no-bottom';
export const itemWrapperInnerCls = _prefixCls + '-item-wrapper-inner';
export const itemTitleCls = _prefixCls + '-item-title';
export const itemTitleIconCls = _prefixCls + '-item-title-icon';
export const itemContentWrapperCls = _prefixCls + '-item-content-wrapper';
export const itemContentCls = _prefixCls + '-item-content';
export const itemContentRemarkCls = _prefixCls + '-item-remark-content';
export const itemExtraCls = _prefixCls + '-item-extra';
export const itemContentCompCls = _prefixCls + '-item-content-comp';
export const itemWrapperLastLineCls = _prefixCls + '-item-wrapper-last-line';
export const itemPrefixCls = _prefixCls + '-item-prefix-content';
export const itemSourceCls = _prefixCls + '-item-source-content';
export const itemBodyCls = _prefixCls + '-item-body';
export const itemBorderCls = _prefixCls + '-item-border';

export const StyledOuterWrapper = withProps({
    className: prefixCls
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            margin-left: -${DT.T_SPACING_COMMON_LG};
            margin-right: -${DT.T_SPACING_COMMON_LG};
        `;
    })
);

export const StyledWrapper = withProps()(
    styled('div')(props => {
        const {
            col,
            noBorder = false,
            theme: { designTokens: DT }
        } = props;
        const borderBottom = noBorder
            ? 0
            : `${DT.T_LINE_WIDTH_BASE} ${DT.T_LINE_STYLE_BASE} ${DT.T_LIST_LINE_COLOR_DEFAULT}`;
        return css`
            display: table;
            table-layout: fixed;
            width: 100%;
            border-collapse: separate;
            border-spacing: ${DT.T_SPACING_COMMON_LG} 0;
            .${itemWrapperInnerCls} {
                display: table-row;
            }
            .${itemWrapperCls} {
                display: table-cell;
                box-sizing: border-box;
                width: ${Math.round((100 / col) * 100) / 100}%;
            }
            .${itemBorderCls} {
                border-bottom: ${borderBottom};
            }

            .${itemWrapperNoBottomCls} {
                border-bottom: 0px;
            }
        `;
    })
);

export const StyleSingledWrapper = withProps()(
    styled('div')(props => {
        const {
            noBorder = false,
            theme: { designTokens: DT }
        } = props;
        const borderBottom = noBorder
            ? 0
            : `${DT.T_LINE_WIDTH_BASE} ${DT.T_LINE_STYLE_BASE} ${DT.T_LIST_LINE_COLOR_DEFAULT}`;
        return css`
            .${itemBorderCls} {
                border-bottom: ${borderBottom};
            }
        `;
    })
);
export const StyledItem = withProps()(
    styled('div')(props => {
        const {
            styleType = 'horizontal',
            aligin = 'left',
            prefix,
            theme: { designTokens: DT }
        } = props;

        const justifyContent = prefix ? 'justify-content:space-between;' : '';
        return css`
            display: ${styleType === 'horizontal' || prefix ? 'flex' : 'block'};
            box-sizing: border-box;
            padding: ${DT.T_LIST_ITEM_PADDING_VERTICAL} ${DT.T_LIST_ITEM_PADDING_HORIZONAL};
            align-items: center;
            font-size: ${DT.T_TYPO_FONT_SIZE_1};
            vertical-align: middle;
           
            ${justifyContent}
            .${itemPrefixCls}{
              display: block;
              width: ${DT.T_SQUARE_LG};
              height: ${DT.T_SQUARE_LG};
              margin-right: ${DT.T_SPACING_COMMON_MD};
              border-radius: ${DT.T_CORNER_LG};
              overflow: hidden;
            }
            .${itemBodyCls} {
               display:  flex;
               box-sizing: border-box;
               align-items: center;
               vertical-align: middle;
               ${styleType === 'vertical' ? 'flex:1;' : ''}
            }
            .${itemSourceCls}{
               display: ${styleType === 'horizontal' ? 'flex' : 'block'};
               box-sizing: border-box;
               align-items: center;
               vertical-align: middle;
                flex:auto;
            }
            .${itemTitleCls} {
                box-sizing: border-box;
                display: inline-block;
                width: 100px;
                font-size: ${DT.T_LIST_HEADER_FONT_SIZE};
                color: ${DT.T_LIST_HEADER_FONT_COLOR_DEFAULT};
                font-weight: ${DT.T_LIST_HEADER_FONT_FONT_WEIGHT};
                line-height: ${DT.T_LIST_CONTENT_FONT_LINE_HEIGHT};
                padding-right: ${DT.T_SPACING_COMMON_SM};
                &>span{
                    vertical-align: middle;
                }
            }

            .${itemTitleIconCls} {
                vertical-align: middle;
                color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                fill: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                margin-left: ${DT.T_SPACING_COMMON_XS};
                g {
                    fill: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                }
            }

            .${itemContentWrapperCls} {
                display: flex;
                flex: 1;
                align-items: center;
                min-width: 0;
                font-size: ${DT.T_LIST_CONTENT_FONT_SIZE};
                color: ${DT.T_LIST_CONTENT_FONT_COLOR_DEFAULT};
                font-weight: ${DT.T_LIST_CONTENT_FONT_FONT_WEIGHT};
                line-height: ${DT.T_LIST_CONTENT_FONT_LINE_HEIGHT};
            }
            .${itemContentCls} {
                display: block;
                flex: auto;
                text-align: ${aligin};
                color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                min-width: 0;
            }
            .${itemContentRemarkCls}{
                color: ${DT.T_LIST_CONTENT_FONT_COLOR_REMARK};
            }

            .${itemExtraCls} {
                display: block;
                margin-left: ${DT.T_SPACING_COMMON_MD};
                color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
            }

            .${itemContentCompCls} {
                & + .${itemContentCompCls} {
                    margin-top: ${DT.T_SPACING_COMMON_XS};
                }
            }
        `;
    })
);

export const StyledIcon = withProps()(
    styled('div')(props => {
        const {
            disabled,
            theme: { designTokens: DT }
        } = props;
        return css`
            display: inline-block;
            cursor: ${disabled ? 'default' : 'pointer'};
            color: ${disabled ? DT.T_COLOR_TEXT_DISABLED : DT.T_COLOR_TEXT_DEFAULT_LIGHT};
            fill: ${disabled ? DT.T_COLOR_TEXT_DISABLED : DT.T_COLOR_TEXT_DEFAULT_LIGHT};

            &:hover {
                color: ${disabled ? DT.T_COLOR_TEXT_DISABLED : DT.T_COLOR_TEXT_PRIMARY_HOVER};
                fill: ${disabled ? DT.T_COLOR_TEXT_DISABLED : DT.T_COLOR_TEXT_PRIMARY_HOVER};
                text-decoration: none;
            }
        `;
    })
);

export const StyledContent = withProps()(
    styled('div')(props => {
        const {
            styleType = 'primary',
            theme: { designTokens: DT }
        } = props;

        const colorMap = {
            primary: DT.T_COLOR_TEXT_DEFAULT_DARK,
            secondary: DT.T_COLOR_TEXT_DEFAULT_LIGHT
        };

        return css`
            line-height: 20px;
            color: ${colorMap[styleType]};
        `;
    })
);

export const iconCls = _prefixCls + '-icontip';
export const StyledSpan = withProps()(
    styled('span')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            display: flex;
            .${iconCls} {
                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                fill: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            }
        `;
    })
);

export const listWrapperInnerCls = _prefixCls + '-list-wrapper-inner';
export const listWrapperCls = _prefixCls + '-list-wrapper';

export const ListStyledOuterWrapper = withProps()(
    styled('div')(props => {
        const {
            width,
            spacing,
            theme: { designTokens: DT }
        } = props;
        const margin = [],
            boxMargin = [],
            cleanMargin = [];
        let hSpace = null,
            vSpace = null;

        if (spacing && Array.isArray(spacing)) {
            hSpace = spacing[0] + 'px';
            vSpace = spacing[1] + 'px';
        } else {
            hSpace = DT.T_LIST_OUTSIDE_PADDING_HORIZONAL;
            vSpace = DT.T_LIST_OUTSIDE_PADDING_VERTICAL;
        }
        if (hSpace != null) {
            hSpace = Number(hSpace.replace('px', '')) / 2;
            margin.push(css`
                margin-right: ${hSpace}px;
                margin-left: ${hSpace}px;
            `);
            boxMargin.push(css`
                padding-right: ${hSpace}px;
                padding-left: ${hSpace}px;
                margin-right: 0;
                margin-left: 0;
            `);
            cleanMargin.push(css`
                margin-right: -${hSpace}px;
                margin-left: -${hSpace}px;
            `);
        }
        if (vSpace != null) {
            vSpace = Number(vSpace.replace('px', ''));
            margin.push(css`
                margin-bottom: ${vSpace}px;
                margin-top: ${vSpace}px;
            `);
            boxMargin.push(css`
                padding-bottom: ${vSpace}px;
                margin-bottom: 0;
                margin-top: 0;
            `);
            cleanMargin.push(css`
                margin-bottom: -${vSpace}px;
            `);
        }

        const boxPadding = [];

        boxPadding.push(css`
            padding-left: ${hSpace}px;
            padding-right: ${hSpace}px;
        `);

        return css`
            .${listWrapperInnerCls} {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(${width}, 1fr));
                ${boxPadding};
                ${cleanMargin};
                & > .${prefixClsBox} {
                    ${boxMargin};
                }
            }
        `;
    })
);
