import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Combine from 'src/components/Combine';
import config from 'src/config';
import SvgIcon from 'src/components/SvgIcon';
import Icon from 'src/components/Icon';
import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-tag';
export const menuCls = _prefixCls + '-menu';
export const iconCls = _prefixCls + '-tag-icon';

export const styleMap = {
    gray: {
        color: 'T_TAG_COLOR_GRAY_TEXT',
        icon: 'T_TAG_COLOR_GRAY_ICON',
        border: 'T_TAG_COLOR_GRAY_BORDER',
        divider: 'T_TAG_COLOR_GRAY_DIVIDER',
        bg: 'T_TAG_COLOR_GRAY_BG_LIGHT',
        iconHoverBG: 'T_TAG_COLOR_GRAY_BG_DARK'
    },
    green: {
        color: 'T_TAG_COLOR_GREEN_TEXT',
        icon: 'T_TAG_COLOR_GREEN_ICON',
        border: 'T_TAG_COLOR_GREEN_BORDER',
        divider: 'T_TAG_COLOR_GREEN_DIVIDER',
        bg: 'T_TAG_COLOR_GREEN_BG_LIGHT',
        iconHoverBG: 'T_TAG_COLOR_GREEN_BG_DARK'
    },
    yellow: {
        color: 'T_TAG_COLOR_YELLOW_TEXT',
        icon: 'T_TAG_COLOR_YELLOW_ICON',
        border: 'T_TAG_COLOR_YELLOW_BORDER',
        divider: 'T_TAG_COLOR_YELLOW_DIVIDER',
        bg: 'T_TAG_COLOR_YELLOW_BG_LIGHT',
        iconHoverBG: 'T_TAG_COLOR_YELLOW_BG_DARK'
    },
    red: {
        color: 'T_TAG_COLOR_RED_TEXT',
        icon: 'T_TAG_COLOR_RED_ICON',
        border: 'T_TAG_COLOR_RED_BORDER',
        divider: 'T_TAG_COLOR_RED_DIVIDER',
        bg: 'T_TAG_COLOR_RED_BG_LIGHT',
        iconHoverBG: 'T_TAG_COLOR_RED_BG_DARK'
    },
    primary: {
        color: 'T_TAG_COLOR_PRIMARY_TEXT',
        icon: 'T_TAG_COLOR_PRIMARY_ICON',
        border: 'T_TAG_COLOR_PRIMARY_BORDER',
        divider: 'T_TAG_COLOR_PRIMARY_DIVIDER',
        bg: 'T_TAG_COLOR_PRIMARY_BG_LIGHT',
        iconHoverBG: 'T_TAG_COLOR_PRIMARY_BG_DARK'
    },
    purple: {
        color: 'T_TAG_COLOR_PURPLE_TEXT',
        icon: 'T_TAG_COLOR_PURPLE_ICON',
        border: 'T_TAG_COLOR_PURPLE_BORDER',
        divider: 'T_TAG_COLOR_PURPLE_DIVIDER',
        bg: 'T_TAG_COLOR_PURPLE_BG_LIGHT',
        iconHoverBG: 'T_TAG_COLOR_PURPLE_BG_DARK'
    },
    lightblue: {
        color: 'T_TAG_COLOR_LIGHTBLUE_TEXT',
        icon: 'T_TAG_COLOR_LIGHTBLUE_ICON',
        border: 'T_TAG_COLOR_LIGHTBLUE_BORDER',
        divider: 'T_TAG_COLOR_LIGHTBLUE_DIVIDER',
        bg: 'T_TAG_COLOR_LIGHTBLUE_BG_LIGHT',
        iconHoverBG: 'T_TAG_COLOR_LIGHTBLUE_BG_DARK'
    },
    blue: {
        color: 'T_TAG_COLOR_BLUE_TEXT',
        icon: 'T_TAG_COLOR_BLUE_ICON',
        border: 'T_TAG_COLOR_BLUE_BORDER',
        divider: 'T_TAG_COLOR_BLUE_DIVIDER',
        bg: 'T_TAG_COLOR_BLUE_BG_LIGHT',
        iconHoverBG: 'T_TAG_COLOR_BLUE_BG_DARK'
    },
    orange: {
        color: 'T_TAG_COLOR_ORANGE_TEXT',
        icon: 'T_TAG_COLOR_ORANGE_ICON',
        border: 'T_TAG_COLOR_ORANGE_BORDER',
        divider: 'T_TAG_COLOR_ORANG_DIVIDER',
        bg: 'T_TAG_COLOR_ORANGE_BG_LIGHT',
        iconHoverBG: 'T_TAG_COLOR_ORANGE_BG_DARK'
    },
    cyan: {
        color: 'T_TAG_COLOR_CYAN_EXT',
        icon: 'T_TAG_COLOR_CYAN_ICON',
        border: 'T_TAG_COLOR_CYAN_BORDER',
        divider: 'T_TAG_COLOR_CYAN_DIVIDER',
        bg: 'T_TAG_COLOR_CYAN_BG_LIGHT',
        iconHoverBG: 'T_TAG_COLOR_CYAN_BG_DARK'
    }
};

[
    ['default', 'gray'],
    ['success', 'green'],
    ['warning', 'yellow'],
    ['error', 'red']
].map(([styleType, color]) => {
    styleMap[styleType] = styleMap[color];
});

const filledStyleMap = {
    purple: {
        bg: 'T_TAG_COLOR_PURPLE_FILLBG_LIGHT',
        iconHoverBG: 'T_TAG_COLOR_PURPLE_FILLBG_DARK'
    },
    lightblue: {
        bg: 'T_TAG_COLOR_LIGHTBLUE_FILLBG_LIGHT',
        iconHoverBG: 'T_TAG_COLOR_LIGHTBLUE_FILLBG_DARK'
    },
    blue: {
        bg: 'T_TAG_COLOR_BLUE_FILLBG_LIGHT',
        iconHoverBG: 'T_TAG_COLOR_BLUE_FILLBG_DARK'
    },
    orange: {
        bg: 'T_TAG_COLOR_ORANGE_FILLBG_LIGHT',
        iconHoverBG: 'T_TAG_COLOR_ORANGE_FILLBG_DARK'
    },
    yellow: {
        bg: 'T_TAG_COLOR_YELLOW_FILLBG_LIGHT',
        iconHoverBG: 'T_TAG_COLOR_YELLOW_FILLBG_DARK'
    },
    cyan: {
        bg: 'T_TAG_COLOR_CYAN_FILLBG_LIGHT',
        iconHoverBG: 'T_TAG_COLOR_CYAN_FILLBG_DARK'
    },
    red: {
        bg: 'T_TAG_COLOR_RED_FILLBG_LIGHT',
        iconHoverBG: 'T_TAG_COLOR_RED_FILLBG_DARK'
    }
};

Object.keys(filledStyleMap).map(key => {
    const map = filledStyleMap[key];
    styleMap[key + '-filled'] = {
        ...map,
        border: map.bg,
        divider: map.bg,
        color: 'T_COLOR_TEXT_SYSTEM_WHITE'
    };
});

const stateStyleMap = {
    green: {
        color: 'T_TAG_COLOR_GREEN_TEXT',
        icon: 'T_TAG_COLOR_GREEN_ICON',
        divider: 'T_TAG_COLOR_GREEN_DIVIDER',
        bg: 'T_COLOR_BG_DEFAULT_BRIGHT',
        iconHoverBG: 'T_COLOR_BG_DEFAULT_BRIGHT',
        border: 'T_COLOR_LINE_NOTICE_LIGHT',
        fontColor: 'T_COLOR_TEXT_DEFAULT_DARK'
    },
    blue: {
        color: 'T_TAG_COLOR_BLUE_TEXT',
        icon: 'T_TAG_COLOR_BLUE_ICON',
        divider: 'T_TAG_COLOR_BLUE_DIVIDER',
        bg: 'T_COLOR_BG_DEFAULT_BRIGHT',
        iconHoverBG: 'T_COLOR_BG_DEFAULT_BRIGHT',
        border: 'T_COLOR_LINE_NOTICE_LIGHT',
        fontColor: 'T_COLOR_TEXT_DEFAULT_DARK'
    },
    yellow: {
        color: 'T_TAG_COLOR_YELLOW_TEXT',
        icon: 'T_TAG_COLOR_YELLOW_ICON',
        divider: 'T_TAG_COLOR_YELLOW_DIVIDER',
        bg: 'T_COLOR_BG_DEFAULT_BRIGHT',
        iconHoverBG: 'T_COLOR_BG_DEFAULT_BRIGHT',
        border: 'T_COLOR_LINE_NOTICE_LIGHT',
        fontColor: 'T_COLOR_TEXT_DEFAULT_DARK'
    },
    red: {
        color: 'T_TAG_COLOR_RED_TEXT',
        icon: 'T_TAG_COLOR_RED_ICON',
        divider: 'T_TAG_COLOR_RED_DIVIDER',
        bg: 'T_TAG_COLOR_RED_BG_LIGHT',
        iconHoverBG: 'T_TAG_COLOR_RED_BG_DARK',
        border: 'T_TAG_COLOR_RED_DIVIDER',
        fontColor: 'T_COLOR_TEXT_DEFAULT_DARK'
    }
};

Object.keys(stateStyleMap).map(key => {
    const map = stateStyleMap[key];
    styleMap[key + '-crisped'] = {
        ...map
    };
});

export const CloseIcon = styled(SvgIcon)`
    /* empty */
`;

export const CloseIconWrapper = styled('span')`
    /* empty */
`;

export const PrefixIcon = withProps({
    className: iconCls
})(
    styled(Icon)(props => {
        const {
            size,
            theme: { designTokens: DT }
        } = props;
        const iconSize = DT[`T_TAG_ICON_SIZE_${(size || 'sm').toLocaleUpperCase()}`];
        return `
         font-size:${iconSize};
    `;
    })
);

export const SvgIconWrapper = withProps({
    className: iconCls
})(
    styled('i')(props => {
        const {
            size,
            theme: { designTokens: DT }
        } = props;
        const iconSize = DT[`T_TAG_ICON_SIZE_${(size || 'sm').toLocaleUpperCase()}`];
        return css`
            svg {
                width: ${iconSize};
                height: ${iconSize};
            }
        `;
    })
);
export const PrefixIconWrapper = styled('span')`
    /* empty */
`;
export const SuffixIconWrapper = styled('span')`
    /* empty */
`;
const getColorMap = (styleType, disabled) => {
    if (/-fill$/.test(styleType)) {
        styleType += 'ed';
    }

    return (
        (disabled
            ? {
                  color: 'T_TAG_COLOR_DISABLED_TEXT',
                  border: 'T_TAG_COLOR_DISABLED_BORDER',
                  divider: 'T_TAG_COLOR_DISABLED_DIVIDER',
                  bg: 'T_TAG_COLOR_DISABLED_BG_LIGHT',
                  iconHoverBG: 'T_TAG_COLOR_DISABLED_BG_LIGHT'
              }
            : styleMap[styleType]) || {}
    );
};

export const TagWrapper = withProps({
    className: prefixCls
})(
    styled('span')(props => {
        const {
            border: customBorder,
            borderType: customBorderType,
            styleType,
            disabled,
            theme: { designTokens: DT },
            customStyle,
            closable
        } = props;

        const colorMap = getColorMap(styleType, disabled);

        const color = customStyle?.color || DT[colorMap.color];
        const iconColor = customStyle?.color || DT[colorMap.icon];
        const bg = customStyle?.background || DT[colorMap.bg];

        function getBorder(customBorder) {
            if (customBorder) {
                return customStyle?.borderColor || DT[colorMap.border];
            }
            return DT['T_COLOR_LINE_DEFAULT_TRANSPARENT'];
        }

        const border = getBorder(customBorder);
        const borderRadius =
            customBorderType === 'circle'
                ? `calc(${DT['T_TAG_HEIGHT_SM']} * ${DT['T_CORNER_CIRCLE'].replace('%', '') / 100})`
                : DT['T_TAG_BORDER_RADIUS'];

        const closeIconBorderRadius = customBorderType === 'circle' ? 'calc((20px - 2px)/2)' : '0 2px 2px 0';

        const paddingRight = closable ? 0 : '8px';
        const fontColor = DT[colorMap.fontColor || colorMap.color];
        const divider = DT[colorMap.divider];

        const iconHoverBG =
            customStyle?.closeIconHoverBackground ||
            (styleType.includes('-crisped') ? DT['T_COLOR_BG_TRANSPARENT'] : DT[colorMap.iconHoverBG]);
        const closeIconColor = styleType.includes('-crisped') ? DT['T_COLOR_TEXT_DEFAULT_DARK'] : color;
        const closeIconHoverColor = styleType.includes('-crisped')
            ? DT['T_COLOR_TEXT_DEFAULT_DARK']
            : DT.T_TAG_ICON_CLOSE;
        const closeIconOpacity = styleType.includes('-crisped') ? '0.5' : DT['T_TAG_ICON_OPACITY_DEFAULT'];
        return css`
            box-sizing: border-box;
            height: ${DT['T_TAG_HEIGHT_SM']};
            padding-left: 8px;
            padding-right: ${paddingRight};
            display: inline-flex;
            align-items: center;
            color: ${color};
            background: ${bg};
            border: 1px solid ${border};
            border-radius: ${borderRadius};

            ${PrefixIconWrapper} {
                display: flex;
                margin-right: 4px;
                line-height: calc(${DT['T_TAG_HEIGHT_SM']} - 2px);
                flex-shrink: 0;
                align-items: center;
                min-width: ${DT['T_TAG_ICON_WIDTH_SM']};
                justify-content: center;
                color: ${iconColor};
                i {
                    display: flex;
                    margin: 0;
                }
            }
            ${ContentWrapper} {
                color: ${fontColor};
                line-height: calc(${DT['T_TAG_HEIGHT_SM']} - 2px);
                flex: 1 1 auto;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            ${SuffixIconWrapper} {
                margin-left: 4px;
                line-height: calc(${DT['T_TAG_HEIGHT_SM']} - 2px);
                flex-shrink: 0;
            }
            ${CloseIconWrapper} {
                float: right;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 18px;
                margin-left: 4px;
                height: calc(${DT['T_TAG_HEIGHT_SM']} - 2px);
                line-height: calc(${DT['T_TAG_HEIGHT_SM']} - 2px);
                font-size: 0;
                text-align: center;
                border-radius: ${closeIconBorderRadius};
                ${!disabled && 'cursor: pointer'};
                color: ${closeIconColor};
                transition: background 0.3s;
                flex-shrink: 0;
                opacity: ${closeIconOpacity};
                ${CloseIcon} {
                    fill: ${closeIconColor};
                }
                ${!disabled &&
                css`
                    :hover {
                        background: ${iconHoverBG};
                        opacity: ${DT['T_TAG_ICON_OPACITY_HOVER']};
                        ${CloseIcon} {
                            fill: ${closeIconHoverColor};
                        }
                    }
                `};
            }
            ::after {
                background: ${divider};
            }
        `;
    })
);

export const ContentWrapper = styled('span')`
    /* empty */
`;

export const IconTag = styled(Icon)`
    /* empty */
`;
export const IconTagWrapper = withProps({
    className: iconCls
})(
    styled('span')(props => {
        const {
            styleType = 'default',
            theme: { designTokens: DT },
            disabled,
            customStyle,
            borderType: customBorderType,
            iconSize: size,
            border: customBorder
        } = props;

        function getBorder(customBorder) {
            if (customBorder) {
                return customStyle?.borderColor || DT[colorMap.border];
            }
            return DT['T_COLOR_LINE_DEFAULT_TRANSPARENT'];
        }
        const iconSize = DT[`T_TAG_ICON_SIZE_${(size || 'sm').toLocaleUpperCase()}`];

        const colorMap = getColorMap(styleType, disabled);
        const color = customStyle?.color || DT[colorMap.color];
        const bg = customStyle?.background || DT[colorMap.bg];

        const border = getBorder(customBorder);
        const borderRadius =
            customBorderType === 'circle'
                ? `calc(${DT['T_TAG_HEIGHT_SM']} * ${DT['T_CORNER_CIRCLE'].replace('%', '') / 100})`
                : DT['T_TAG_BORDER_RADIUS'];
        const divider = DT[colorMap.divider];

        return css`
            box-sizing: border-box;
            height: ${DT['T_TAG_HEIGHT_SM']};
            width: 20px;
            line-height: calc(${DT['T_TAG_HEIGHT_SM']} - 2px);
            text-align: center;
            display: inline-block;
            border-radius: ${borderRadius};
            position: relative;
            border: 1px solid ${border};
            color: ${color};
            background: ${bg};
            font-size: ${iconSize};
            ::after {
                position: absolute;
                right: -1px;
                background: ${divider};
                box-sizing: border-box;
                border: 0 solid ${bg};
                border-width: 5px 0;
            }
        `;
    })
);

export const TagGroupWrapper = withProps()(
    styled('div')(props => {
        const { compact } = props;

        return compact
            ? css`
                  margin-bottom: -4px;
                  .${prefixCls}, .${iconCls} {
                      border-left-style: none;
                      border-right-style: none;
                      border-radius: 0;
                      vertical-align: middle;
                      margin-bottom: 4px;
                      :first-of-type {
                          border-left-style: solid;
                          border-top-left-radius: 2px;
                          border-bottom-left-radius: 2px;
                      }
                      :after {
                          content: ' ';
                          height: 8px;
                          width: 1px;
                          margin: 5px 0;
                          display: inline-block;
                          vertical-align: middle;
                      }
                      :last-of-type {
                          border-right-style: solid;
                          border-top-right-radius: 2px;
                          border-bottom-right-radius: 2px;
                          ::after {
                              height: 100%;
                              content: none;
                          }
                      }
                  }
                  .${iconCls} {
                      :after {
                          margin: 0;
                          top: 50%;
                          transform: translateY(-50%);
                          border: none;
                      }
                  }
                  .${prefixCls} {
                      padding-left: 4px;
                      padding-right: 0px;
                      :first-of-type {
                          padding-left: 8px;
                      }
                      ${ContentWrapper} {
                          margin-right: 4px;
                      }
                      :last-of-type {
                          ${ContentWrapper} {
                              margin-right: 8px;
                          }
                      }
                  }
              `
            : css`
                  margin-bottom: -4px;
                  .${prefixCls}, .${iconCls} {
                      margin-right: 4px;
                      margin-bottom: 4px;
                      vertical-align: middle;
                  }
              `;
    })
);
export const SWrap = withProps({
    className: iconCls
})(
    styled(Combine)(props => {
        const { exposeCount } = props;
        return exposeCount === void 0
            ? ''
            : css`
                  white-space: nowrap;
                  .${prefixCls}, .${iconCls} {
                      margin-right: 0px;
                      margin-bottom: 0px;
                      vertical-align: middle;
                  }
                  .${iconCls} {
                      margin-bottom: 0px;
                  }
              `;
    })
);
export const TagMenuWapper = withProps({
    className: iconCls
})(
    styled('div')(props => {
        return css`
            .${menuCls} {
                padding: 8px 0 4px 0;
            }
            .${prefixCls},.${iconCls} {
                margin-bottom: 4px;
            }
        `;
    })
);
export const TagPopoverWrap = withProps({
    className: iconCls
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;
        return css`
            padding: 0 8px;
            line-height: ${DT['T_TAG_HEIGHT_SM']};
        `;
    })
);

export const TagMoreWapper = withProps({
    className: iconCls
})(
    styled('span')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            .${prefixCls} {
                box-sizing: border-box;
                height: ${DT['T_TAG_HEIGHT_SM']};
                padding: 0 6px;
                line-height: calc(${DT['T_TAG_HEIGHT_SM']} - 2px);
                text-align: center;
                display: inline-block;
                border-radius: ${DT['T_TAG_BORDER_RADIUS']};
                position: relative;
                border: 1px ${DT['T_LINE_STYLE_DASHED']} ${DT['T_POPOVER_COLOR_LINE_LIGHT']};
                color: ${DT['T_COLOR_TEXT_DEFAULT_DARK']};
                background-color: none;
                cursor: pointer;
            }
        `;
    })
);
