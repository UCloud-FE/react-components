import styled from '@emotion/styled';
import React from 'react';
import withProps from 'src/utils/withProps';
import { css } from '@emotion/core';
import { Tag, CopyTag, IconTag } from '../Tag';

const colorMap = theme => ({
    light: theme.T_COLOR_TEXT_DEFAULT_LIGHT,
    dark: theme.T_COLOR_TEXT_DEFAULT_DARK,
    normal: theme.T_COLOR_TEXT_DEFAULT_NORMAL,
    bright: theme.T_COLOR_TEXT_DEFAULT_BRIGHT,
    primary: theme.T_COLOR_TEXT_PRIMARY_DEFAULT,
    success: theme.T_COLOR_TEXT_SUCCESS,
    warning: theme.T_COLOR_TEXT_WARNING,
    error: theme.T_COLOR_TEXT_ERROR,
    remark: theme.T_COLOR_TEXT_REMARK_DARK,
    remark_light: theme.T_COLOR_TEXT_REMARK_LIGHT
});

const sizeMap = theme => ({
    t1: theme.T_TYPO_FONT_SIZE_1,
    t2: theme.T_TYPO_FONT_SIZE_2,
    t3: theme.T_TYPO_FONT_SIZE_3,
    t4: theme.T_TYPO_FONT_SIZE_4,
    t5: theme.T_TYPO_FONT_SIZE_5,
    t6: theme.T_TYPO_FONT_SIZE_6,
    t7: theme.T_TYPO_FONT_SIZE_7,
    t8: theme.T_TYPO_FONT_SIZE_8,
    h1: theme.T_TYPOGRAPHY_FONT_H1_SIZE,
    h2: theme.T_TYPOGRAPHY_FONT_H2_SIZE,
    h3: theme.T_TYPOGRAPHY_FONT_H3_SIZE,
    h4: theme.T_TYPOGRAPHY_FONT_H4_SIZE,
    h5: theme.T_TYPOGRAPHY_FONT_H5_SIZE,
    text: theme.T_TYPOGRAPHY_FONT_TEXT_SIZE,
    normal: theme.T_TYPOGRAPHY_FONT_PARAGRAPH_NORMAL_SIZE,
    impact: theme.T_TYPOGRAPHY_FONT_PARAGRAPH_IMPACT_SIZE
});

const lineHeightMap = theme => ({
    sm: theme.T_TYPO_LINE_HEIGHT_SM,
    md: theme.T_TYPO_LINE_HEIGHT_MD,
    lg: theme.T_TYPO_LINE_HEIGHT_LG,
    h1: theme.T_TYPOGRAPHY_FONT_H1_LINE_HEIGHT,
    h2: theme.T_TYPOGRAPHY_FONT_H2_LINE_HEIGHT,
    h3: theme.T_TYPOGRAPHY_FONT_H3_LINE_HEIGHT,
    h4: theme.T_TYPOGRAPHY_FONT_H4_LINE_HEIGHT,
    h5: theme.T_TYPOGRAPHY_FONT_H5_LINE_HEIGHT,
    text: theme.T_TYPOGRAPHY_FONT_TEXT_LINE_HEIGHT,
    normal: theme.T_TYPOGRAPHY_FONT_PARAGRAPH_NORMAL_LINE_HEIGHT,
    impact: theme.T_TYPOGRAPHY_FONT_PARAGRAPH_IMPACT_LINE_HEIGHT
});
const fontWeightMap = theme => ({
    h1: theme.T_TYPOGRAPHY_FONT_H1_FONT_WEIGHT,
    h2: theme.T_TYPOGRAPHY_FONT_H2_FONT_WEIGHT,
    h3: theme.T_TYPOGRAPHY_FONT_H3_FONT_WEIGHT,
    h4: theme.T_TYPOGRAPHY_FONT_H4_LINE_HEIGHT,
    h5: theme.T_TYPOGRAPHY_FONT_H5_FONT_WEIGHT,
    text: theme.T_TYPOGRAPHY_FONT_TEXT_FONT_WEIGHT,
    normal: theme.T_TYPOGRAPHY_FONT_PARAGRAPH_NORMAL_FONT_WEIGHT,
    impact: theme.T_TYPOGRAPHY_FONT_PARAGRAPH_IMPACT_FONT_WEIGHT
});

const disabledMixin = theme => `
    color: ${theme.T_COLOR_TEXT_DISABLED};
    cursor: default;

    &:hover {
        color: ${theme.T_COLOR_TEXT_DISABLED};
        text-decoration: none;
    }
`;

const isLinkMixin = theme => `
  cursor: pointer;
  &:hover {
      color: ${theme.T_COLOR_TEXT_PRIMARY_HOVER};
      text-decoration: underline;
  }
`;

const isSvgLinkMixin = theme => `
  cursor: pointer;
  color: ${theme.T_TYPOGRAPHY_ICON_LINK_DEFAULT};
    &:hover {
        color: ${theme.T_TYPOGRAPHY_ICON_LINK_HOVER};
    }
`;

const isCodeMixin = `
  font-family: Consolas, Monaco, monospace;
  white-space: pre-wrap;
`;

const isNumMixin = `
  font-family: "Open Sans", sans-serif;
  letter-spacing: 0.8px;
`;

export const SuffixStyleTag = withProps()(
    styled('span')(props => {
        const {
            theme: { designTokens: DT },
            isLink
        } = props;

        return css`
            ${isLink ? isSvgLinkMixin(DT || {}) : ''}
        `;
    })
);
export const StyledTag = withProps()(
    styled(Tag)(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
          
          margin: auto;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
              "Arial", "PingFang SC", "Hiragino Sans GB", "Noto Sans", "Microsoft Yahei", sans-serif;
          opacity: ${props.opacity ? props.opacity : '1'};
          color: ${props.color ? colorMap(DT || {})[props.color] : 'inherit'};
          font-size: ${props.size ? sizeMap(DT || {})[props.size] : lineHeightMap(DT || {})['t1']};
          line-height: ${props.lineHeight ? lineHeightMap(DT || {})[props.lineHeight] : lineHeightMap(DT || {})['lg']};
          font-weight: ${
              props.strong
                  ? DT?.T_TYPO_FONT_WEIGHT_BOLD
                  : props.fontWeight
                  ? fontWeightMap(DT || {})[props.fontWeight]
                  : 'inherit'
          };
          text-decoration: ${props.deleted ? 'line-through' : 'inherit'};
          ${props.isLink ? isLinkMixin(DT || {}) : ''}
          ${props.isCode ? isCodeMixin : ''}
          ${props.isNum ? isNumMixin : ''}
          ${
              props.transform === 'initial'
                  ? `
            &:first-letter {
                text-transform: uppercase;
            }
        `
                  : props.transform
                  ? `text-transform: ${props.transform};`
                  : ''
          }
          ${props.disabled ? disabledMixin(DT || {}) : ''}
          a& {
              color: ${props.color && colorMap(DT || {})[props.color]};
              ${props.isLink ? isLinkMixin(DT || {}) : ''}
              ${props.disabled ? disabledMixin(DT || {}) : ''}
          }
        `;
    })
);

const EllipsisTag = React.forwardRef((props, ref) => {
    const others = Object.assign({}, props, { component: undefined });
    return <div ref={ref} {...others} />;
});

export const StyledWrapper = styled(EllipsisTag)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const TipWrapper = withProps()(
    styled.div(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            line-height: 14px;
            font-size: ${DT?.T_TYPO_FONT_SIZE_1};
            color: ${DT?.T_COLOR_TEXT_DEFAULT_LIGHT};
        `;
    })
);

export const CopyStyledWrapper = withProps()(
    styled(CopyTag)(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            cursor: pointer;
            color: ${DT?.T_COLOR_TEXT_PRIMARY_DEFAULT};
            position: relative;
            svg {
                fill: currentColor;
            }
        `;
    })
);

export const CopyIconTag = withProps()(
    styled(IconTag)(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: ${sizeMap(DT || {})['t2']};
            height: ${sizeMap(DT || {})['t2']};
        `;
    })
);
