import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import classnames from 'classnames';

import config from 'src/config';
import { inlineBlockWithVerticalMixin } from 'src/style';
import Icon from 'src/components/Icon';
import Button from 'src/components/Button';
import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-radio';

export const iconWrapCls = prefixCls + '-icon-wrap';
export const iconCls = prefixCls + '-icon';
export const contentCls = prefixCls + '-content';
export const disabledCls = prefixCls + '-disabled';
export const checkedCls = prefixCls + '-checked';
export const extraCls = prefixCls + '-extra';

export const genStyleTypeCls = styleType => prefixCls + '-styletype-' + styleType;

const radioCommonStyleMixin = props => {
    const {
        theme: { designTokens: DT, fontSize }
    } = props;

    return css`
        color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
        font-size: ${fontSize};
        position: relative;
        cursor: pointer;
    `;
};

const sizeMixin = props => {
    const {
        theme: { Height },
        size
    } = props;

    return css`
        min-height: ${Height[size]};
        line-height: ${Height[size]};
    `;
};

const sharedClassName = ({ disabled, checked, size, styleType }) =>
    classnames({
        [prefixCls]: true,
        [disabledCls]: disabled,
        [checkedCls]: checked,
        [`${prefixCls}-size-${size}`]: true,
        [genStyleTypeCls(styleType)]: true
    });

const radioIconMixin = props => {
    const {
        theme: { designTokens: DT }
    } = props;
    return css`
        .${iconWrapCls} {
            display: inline-block;
            box-sizing: border-box;
            overflow: hidden;
            position: relative;
            width: 14px;
            height: 14px;
            border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
            border-radius: 8px;
            vertical-align: middle;

            .${iconCls} {
                visibility: hidden;
                opacity: 0;
                position: absolute;
                top: -1px;
                left: -1px;
            }
        }
        :hover,
        &.${checkedCls} {
            .${iconWrapCls} {
                border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
            }
        }

        &.${checkedCls} {
            .${iconCls} {
                visibility: visible;
                opacity: 1;
                fill: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            }
        }

        &.${disabledCls} {
            .${iconWrapCls} {
                border-color: ${DT.T_COLOR_LINE_DISABLED_LIGHT};
                background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
            }
        }

        &.${disabledCls}.${checkedCls} {
            .${iconCls} {
                fill: ${DT.T_COLOR_TEXT_DISABLED};
            }
            .${iconWrapCls} {
                background: none;
            }
        }
    `;
};

/* stylelint-disable no-duplicate-selectors */
export const RadioWrap = styled(
    withProps({
        className: sharedClassName
    })(
        styled('span')(props => {
            const {
                theme: { designTokens: DT }
            } = props;

            return css`
                ${radioCommonStyleMixin(props)};
                ${inlineBlockWithVerticalMixin};
                ${sizeMixin(props)};
                font-size: 0;
                color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                > * {
                    font-size: 12px;
                }

                .${contentCls} {
                    display: inline-block;
                    vertical-align: middle;
                    max-height: 100%;
                    margin-left: 8px;
                }

                &.${disabledCls} {
                    cursor: default;
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                }
                ${radioIconMixin(props)};
            `;
        })
    )
)`
    /* empty */
`;

export const RadioListWrap = withProps({
    className: sharedClassName
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            ${radioCommonStyleMixin(props)};
            display: flex;
            align-items: center;
            padding: 8px 8px 8px 0;
            border-bottom: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
            ${radioIconMixin(props)};

            .${iconWrapCls} {
                margin: 0 12px 0 8px;
                flex-shrink: 0;
            }
            .${contentCls} {
                flex: 1 1 auto;
                line-height: 20px;
                overflow-x: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .${extraCls} {
                flex-shrink: 0;
                color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
                margin-left: 8px;
            }

            &.${checkedCls} {
                background: ${DT.T_COLOR_BG_PRIMARY_5};
                .${contentCls} {
                    font-weight: bold;
                }
            }
            &.${disabledCls} {
                cursor: default;
                color: ${DT.T_COLOR_TEXT_DISABLED};
                .${extraCls} {
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                }
            }
            &.${checkedCls}.${disabledCls} {
                background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
            }
        `;
    })
);

// eslint-disable-next-line no-unused-vars
const FilterStyleTypeButton = ({ styleType, ...rest }) => <Button styleType="border-gray" checkAble {...rest} />;
FilterStyleTypeButton.propTypes = {
    styleType: PropTypes.string
};

export const RadioButtonWrap = withProps({
    className: sharedClassName
})(
    styled(FilterStyleTypeButton)(props => {
        const {
            size,
            theme: { fontSize },
            disabled,
            checked
        } = props;

        return css`
            && {
                min-width: ${{ lg: 80, md: 68, sm: 56 }[size]}px;
                text-align: center;
                border-radius: 0;
                ${css`
                    font-size: ${fontSize};
                `};
                position: relative;

                ${disabled &&
                css`
                    z-index: 1;
                `};

                ${checked &&
                css`
                    z-index: 2;
                `};

                &:hover {
                    z-index: 3;
                }
            }
        `;
    })
);

export const RadioTagWrap = withProps({
    className: sharedClassName
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT },
            checked,
            disabled
        } = props;

        return css`
            padding: 0 8px;
            cursor: pointer;
            border-radius: 2px;

            ${radioCommonStyleMixin(props)};

            ${inlineBlockWithVerticalMixin};

            ${sizeMixin(props)};

            ${checked &&
            css`
                background: ${DT.T_COLOR_BG_PRIMARY_5};
                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            `};

            ${disabled &&
            css`
                color: ${DT.T_COLOR_TEXT_DISABLED};
                cursor: default;
            `};

            ${disabled &&
            checked &&
            css`
                background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
            `};

            ${!checked &&
            !disabled &&
            css`
                :hover {
                    color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                }
            `};
        `;
    })
);

export const RadioCardHeader = styled('div')`
    position: relative;
    padding: 8px 16px;
    line-height: 22px;
    min-height: 22px;
    font-weight: bold;
`;
export const RadioCardContent = styled('div')`
    padding: 16px;
    min-height: 20px;
`;
const RadioCardTipPosition = css`
    position: absolute;
    right: 12px;
    top: 10px;
`;
export const RadioCardIcon = styled(Icon)`
    font-size: 16px;
    ${RadioCardTipPosition};
`;
export const RadioCardDisabledLabelWrap = styled('span')`
    font-weight: bold;
    line-height: 16px;
    ${RadioCardTipPosition};
`;
const cardPropsMixin = props => {
    const {
        theme: { designTokens: DT, titleFontSize },
        disabled,
        checked
    } = props;

    return css`
        border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
        background: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};
        box-shadow: ${DT.T_SHADOW_BUTTON_DEFAULT};

        /* stylelint-disable no-descending-specificity */
        ${RadioCardIcon} {
            color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
        }
        /* stylelint-enable no-descending-specificity */

        ${RadioCardHeader} {
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
            font-size: ${titleFontSize};
            border-bottom: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
        }
        ${checked &&
        css`
            border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
            background: ${DT.T_COLOR_BG_DEFAULT_HOVER};
            box-shadow: ${DT.T_SHADOW_BUTTON_HOVER};
            ${RadioCardHeader} {
                border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
            }
            ${RadioCardIcon} {
                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            }
        `};
        ${disabled &&
        css`
            cursor: default;
            box-shadow: 0 0 0 0 ${DT.T_COLOR_BG_TRANSPARENT};
        `};
        ${disabled &&
        !checked &&
        css`
            border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
            ${RadioCardHeader} {
                background: ${DT.T_COLOR_BG_DISABLED_DARK};
                color: ${DT.T_COLOR_TEXT_DEFAULT_NORMAL};
            }
            ${RadioCardContent} {
                background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                color: ${DT.T_COLOR_TEXT_DISABLED};
            }
        `};
        ${disabled &&
        checked &&
        css`
            ${RadioCardIcon} {
                color: ${DT.T_COLOR_LINE_DISABLED_DARK};
            }
        `};

        ${!checked &&
        !disabled &&
        css`
            :hover {
                box-shadow: ${DT.T_SHADOW_BUTTON_HOVER};
                border: 1px solid ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};

                ${RadioCardHeader} {
                    border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                }

                ${RadioCardIcon} {
                    color: ${DT.T_COLOR_LINE_PRIMARY_HOVER};
                }
            }
        `};
    `;
};
export const RadioCardWrap = withProps({
    className: sharedClassName
})(styled('div')`
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    cursor: pointer;

    ${cardPropsMixin};
`);

export const RadioTextWrap = withProps({
    className: sharedClassName
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT, Height },
            checked,
            disabled,
            size
        } = props;

        return css`
            padding: 2px 0;
            box-sizing: border-box;
            cursor: pointer;
            height: ${Height[size]};

            > span {
                display: table;
                height: 100%;
                > span {
                    padding: 0 12px;
                    border-color: ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                    border-style: solid;
                    border-width: 0 1px;
                    height: 100%;
                    display: table-cell;
                    vertical-align: middle;
                }
            }

            ${radioCommonStyleMixin(props)};

            ${inlineBlockWithVerticalMixin};

            ${sizeMixin(props)};
            line-height: normal;
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};

            ${!checked &&
            !disabled &&
            css`
                :hover {
                    color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                }
            `};

            ${checked &&
            css`
                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            `};

            ${disabled &&
            css`
                && {
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                    cursor: default;
                }
            `};
        `;
    })
);

export const RadioGroupWrap = styled('div')`
    position: relative;
    margin-bottom: -8px;
    .${genStyleTypeCls('default')}, .${genStyleTypeCls('tag')} {
        margin-right: 8px;
        margin-bottom: 8px;

        &:last-child {
            margin-right: 0;
        }
    }
    .${genStyleTypeCls('card')} {
        margin-right: 12px;
        margin-bottom: 8px;

        &:last-child {
            margin-right: 0;
        }
    }
    .${genStyleTypeCls('text')}+.${genStyleTypeCls('text')} {
        margin-left: -1px;
    }

    .${genStyleTypeCls('button')} {
        margin-right: -1px;
        margin-bottom: 8px;
        &:first-of-type {
            border-radius: 2px 0 0 2px;
        }
        &:last-of-type {
            border-radius: 0 2px 2px 0;
            margin-right: 0;
        }
    }
    .${genStyleTypeCls('list')} {
        &:last-of-type {
            margin-bottom: 8px;
        }
    }
`;
