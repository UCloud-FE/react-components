import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from 'src/config';
import SvgIcon from 'src/components/SvgIcon';
import Icon from 'src/components/Icon';
import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-tag';
export const iconCls = _prefixCls + '-tag-icon';

export const styleMap = {
    gray: {
        color: 'T_COLOR_TEXT_DEFAULT_LIGHT',
        border: 'T_COLOR_LINE_NOTICE_LIGHT',
        bg: 'T_COLOR_BG_NOTICE_LIGHT',
        iconHoverBG: 'T_COLOR_BG_NOTICE_DARK'
    },
    green: {
        color: 'T_COLOR_TEXT_SUCCESS',
        border: 'T_COLOR_LINE_SUCCESS_LIGHT',
        bg: 'T_COLOR_BG_SUCCESS_LIGHT',
        iconHoverBG: 'T_COLOR_BG_SUCCESS_DARK'
    },
    yellow: {
        color: 'T_COLOR_TEXT_WARNING',
        border: 'T_COLOR_LINE_WARNING_LIGHT',
        bg: 'T_COLOR_BG_WARNING_LIGHT',
        iconHoverBG: 'T_COLOR_BG_WARNING_DARK'
    },
    red: {
        color: 'T_COLOR_TEXT_ERROR',
        border: 'T_COLOR_LINE_ERROR_LIGHT',
        bg: 'T_COLOR_BG_ERROR_LIGHT',
        iconHoverBG: 'T_COLOR_BG_ERROR_DARK'
    },
    primary: {
        color: 'T_COLOR_TEXT_SYSTEM_WHITE',
        border: 'T_COLOR_LINE_PRIMARY_DEFAULT',
        bg: 'T_COLOR_BG_PRIMARY_1',
        iconHoverBG: 'T_COLOR_BG_PRIMARY_2'
    },
    purple: {
        color: 'T_COLOR_LEGEND_PURPLE_5',
        border: 'T_COLOR_LEGEND_PURPLE_2',
        bg: 'T_COLOR_LEGEND_PURPLE_1',
        iconHoverBG: 'T_COLOR_LEGEND_PURPLE_5'
    },
    lightblue: {
        color: 'T_COLOR_LEGEND_LIGHTBLUE_5',
        border: 'T_COLOR_LEGEND_LIGHTBLUE_2',
        bg: 'T_COLOR_LEGEND_LIGHTBLUE_1',
        iconHoverBG: 'T_COLOR_LEGEND_LIGHTBLUE_5'
    },
    blue: {
        color: 'T_COLOR_LEGEND_BLUE_5',
        border: 'T_COLOR_LEGEND_BLUE_2',
        bg: 'T_COLOR_LEGEND_BLUE_1',
        iconHoverBG: 'T_COLOR_LEGEND_BLUE_5'
    },
    orange: {
        color: 'T_COLOR_LEGEND_ORANGE_5',
        border: 'T_COLOR_LEGEND_ORANGE_2',
        bg: 'T_COLOR_LEGEND_ORANGE_1',
        iconHoverBG: 'T_COLOR_LEGEND_ORANGE_5'
    },
    cyan: {
        color: 'T_COLOR_LEGEND_CYAN_5',
        border: 'T_COLOR_LEGEND_CYAN_2',
        bg: 'T_COLOR_LEGEND_CYAN_1',
        iconHoverBG: 'T_COLOR_LEGEND_CYAN_5'
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

const fillStyleMap = {
    purple: {
        bg: 'T_COLOR_LEGEND_PURPLE_6',
        iconHoverBG: 'T_COLOR_LEGEND_PURPLE_7'
    },
    lightblue: {
        bg: 'T_COLOR_LEGEND_LIGHTBLUE_6',
        iconHoverBG: 'T_COLOR_LEGEND_LIGHTBLUE_7'
    },
    blue: {
        bg: 'T_COLOR_LEGEND_BLUE_6',
        iconHoverBG: 'T_COLOR_LEGEND_BLUE_7'
    },
    orange: {
        bg: 'T_COLOR_LEGEND_ORANGE_6',
        iconHoverBG: 'T_COLOR_LEGEND_ORANGE_7'
    },
    yellow: {
        bg: 'T_COLOR_LEGEND_YELLOW_6',
        iconHoverBG: 'T_COLOR_LEGEND_YELLOW_7'
    },
    cyan: {
        bg: 'T_COLOR_LEGEND_CYAN_6',
        iconHoverBG: 'T_COLOR_LEGEND_CYAN_7'
    }
};

Object.keys(fillStyleMap).map(key => {
    const map = fillStyleMap[key];
    styleMap[key + '-fill'] = {
        ...map,
        color: 'T_COLOR_TEXT_SYSTEM_WHITE'
    };
});

export const CloseIcon = styled(SvgIcon)`
    /* empty */
`;

export const CloseIconWrapper = styled('span')`
    /* empty */
`;

export const PrefixIcon = styled(Icon)`
    /* empty */
`;
export const PrefixIconWrapper = styled('span')`
    /* empty */
`;

const getColorMap = (styleType, disabled) => {
    return (
        (disabled
            ? {
                  color: 'T_COLOR_TEXT_DISABLED',
                  border: 'T_COLOR_LINE_DISABLED_LIGHT',
                  bg: 'T_COLOR_BG_DISABLED_LIGHT',
                  iconHoverBG: 'T_COLOR_BG_DISABLED_LIGHT'
              }
            : styleMap[styleType]) || {}
    );
};

export const TagWrapper = withProps({
    className: prefixCls
})(
    styled('span')(props => {
        const {
            styleType,
            disabled,
            theme: { designTokens: DT }
        } = props;
        const colorMap = getColorMap(styleType, disabled);
        const border = colorMap.border;
        return css`
            box-sizing: border-box;
            height: 20px;
            line-height: normal;
            padding-left: 8px;
            display: inline-block;
            border-radius: 2px;

            color: ${DT[colorMap.color]};
            ${border &&
            css`
                border: 1px solid ${DT[border]};
            `};
            background: ${DT[colorMap.bg]};

            ${PrefixIconWrapper} {
                margin-right: 4px;
                vertical-align: middle;
                line-height: 20px;
            }
            ${ContentWrapper} {
                margin-right: 8px;
                vertical-align: middle;
                line-height: 20px;
            }
            ${CloseIconWrapper} {
                float: right;
                width: 20px;
                height: 20px;
                line-height: 20px;
                font-size: 0;
                vertical-align: middle;
                text-align: center;
                ${!disabled && 'cursor: pointer'};
                color: ${DT[colorMap.color]};
                transition: background 0.3s;

                ${CloseIcon} {
                    fill: ${DT[colorMap.color]};
                }
                ${!disabled &&
                css`
                    :hover {
                        background: ${DT[colorMap.iconHoverBG]};
                        ${CloseIcon} {
                            fill: ${DT.T_COLOR_TEXT_SYSTEM_WHITE};
                        }
                    }
                `};
            }

            ${border &&
            css`
                ${PrefixIconWrapper} {
                    line-height: 18px;
                }
                ${ContentWrapper} {
                    line-height: 18px;
                }
                ${CloseIconWrapper} {
                    width: 18px;
                    height: 18px;
                    line-height: 18px;
                }
            `}
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
            theme: { designTokens: DT }
        } = props;

        const colorMap = getColorMap(styleType);
        return css`
            box-sizing: border-box;
            height: 20px;
            width: 20px;
            line-height: 18px;
            text-align: center;
            display: inline-block;
            border-radius: 2px;
            position: relative;

            color: ${DT[colorMap.color]};
            border: 1px solid ${DT[colorMap.border]};
            background: ${DT[colorMap.bg]};
            ::after {
                background: ${DT[colorMap.border]};
                position: absolute;
                right: 0;
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
                      :first-child {
                          border-left-style: solid;
                          border-top-left-radius: 2px;
                          border-bottom-left-radius: 2px;
                      }
                      ::after {
                          content: ' ';
                          height: 8px;
                          width: 1px;
                          margin: 5px 0;
                          display: inline-block;
                          vertical-align: middle;
                      }
                      :last-child {
                          border-right-style: solid;
                          border-top-right-radius: 2px;
                          border-bottom-right-radius: 2px;
                          ::after {
                              content: none;
                          }
                      }
                  }
                  .${prefixCls} {
                      padding-left: 4px;
                      :first-child {
                          padding-left: 8px;
                      }
                      ${ContentWrapper} {
                          margin-right: 4px;
                      }
                      :last-child {
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
