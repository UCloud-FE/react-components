import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import RcPicker from 'rc-calendar/lib/Picker';

import Icon from 'src/components/Icon';
import Select from 'src/components/Select';
import Button from 'src/components/Button';
import { calendarMixin } from 'src/components/Calendar/style';
import { inlineBlockWithVerticalMixin, clearFixMixin } from 'src/style';
import config from 'src/config';
import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-datepicker';
export const pickerPrefixCls = prefixCls + '–picker';
export const monthPickerPrefixCls = prefixCls + '-month-picker';
export const dataWrapCls = prefixCls + '-data-wrap';
export const dateSeparatorCls = prefixCls + '-data-separator';

const RcPickerWrap = ({ className, dropdownClassName, ...rest }) => (
    <RcPicker dropdownClassName={classnames(className, dropdownClassName)} {...rest} />
);
RcPickerWrap.propTypes = {
    className: PropTypes.string.isRequired,
    dropdownClassName: PropTypes.string
};

export const PickerWrap = withProps({
    className: `${prefixCls}-popup-wrap`
})(
    styled(RcPickerWrap)(props => {
        const { zIndex, isMonth } = props;

        return css`
            user-select: none;
            width: 285px;
            z-index: ${zIndex};
            ${isMonth &&
            css`
                width: 240px;
            `};
            ${calendarMixin(props)};
        `;
    })
);

export const DateWrap = withProps({
    className: dataWrapCls
})(
    styled('div')(props => {
        const {
            theme: { Height, HeightNumber, designTokens: DT },
            size
        } = props;

        return css`
            height: ${Height[size]};
            line-height: ${HeightNumber[size] - 2}px;
            padding: 1px 8px;
            border-radius: 2px;
            cursor: pointer;
            box-sizing: border-box;
            box-shadow: ${DT.T_SHADOW_BUTTON_DEFAULT};
            background: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};
            ${inlineBlockWithVerticalMixin};
        `;
    })
);

export const DateSpan = styled('span')`
    display: inline-block;
`;

export const PickerIcon = styled(Icon)`
    margin-left: 5px;
    display: inline-block;
`;

export const TimeWrap = styled(
    withProps({
        className: `${prefixCls}-time-wrap`
    })(styled('div')`
        margin-left: 8px;

        ${inlineBlockWithVerticalMixin};
    `)
)`
    /* empty */
`;

export const TimeSeparator = styled('span')`
    margin: 0 4px;
`;

export const PickerContainer = withProps({
    className: ({ disabled, isMonth }) =>
        classnames(prefixCls, isMonth && `${prefixCls}-month`, disabled && `${prefixCls}-disabled`)
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT },
            disabled
        } = props;

        return css`
            ${inlineBlockWithVerticalMixin};

            ${disabled &&
            css`
                .${dataWrapCls} {
                    pointer-events: none;
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                    border: 1px solid ${DT.T_COLOR_LINE_DISABLED_DARK};
                    background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                    box-shadow: none;
                }
            `};
        `;
    })
);

export const RangeContainer = withProps({
    className: ({ disabled }) => classnames(`${prefixCls}-range`, disabled && `${prefixCls}-range-disabled`)
})(
    styled('div')`
        /* empty */
    `
);

export const RangePopup = withProps({
    className: `${prefixCls}-range-popup`
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            background: ${DT.T_COLOR_BG_MENU};
            display: inline-block;
            border-radius: 2px;
            padding: 0;
            box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_LG};
        `;
    })
);

export const RangeSelect = styled(Select)`
    margin-right: 8px;
`;

export const RangeDateWrap = withProps({
    className: ({ readonly, disabled }) =>
        classnames(
            `${prefixCls}-range-date-wrap`,
            readonly && `${prefixCls}-range-date-wrap-readonly`,
            disabled && `${prefixCls}-range-date-wrap-disabled`
        )
})(
    styled('div')(props => {
        const {
            theme: { Height, HeightNumber, designTokens: DT },
            size,
            readonly,
            disabled
        } = props;

        return css`
            padding: 0 8px;
            border-radius: 2px;
            cursor: pointer;
            box-sizing: border-box;
            height: ${Height[size]};
            line-height: ${HeightNumber[size] - 2}px;
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
            box-shadow: ${DT.T_SHADOW_BUTTON_DEFAULT};
            :hover {
                box-shadow: ${DT.T_SHADOW_BUTTON_HOVER};
            }

            ${inlineBlockWithVerticalMixin};

            ${readonly &&
            css`
                pointer-events: none;
                border-width: 0;
                line-height: ${Height[size]};
                box-shadow: none;

                ${/* sc-sel */ PickerIcon} {
                    display: none;
                }
            `};

            ${disabled &&
            css`
                pointer-events: none;
                background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                border: 1px solid ${DT.T_COLOR_LINE_DISABLED_DARK};
                color: ${DT.T_COLOR_TEXT_DISABLED};
                box-shadow: none;
                .${dateSeparatorCls} {
                    background: ${DT.T_COLOR_LINE_DEFAULT_DARK};
                }
            `};
        `;
    })
);

export const RangeDateSeparator = withProps({
    className: dateSeparatorCls
})(
    styled('span')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            margin: 0 4px;
            width: 12px;
            height: 1px;
            background: ${DT.T_COLOR_LINE_DEFAULT_DARK};

            ${inlineBlockWithVerticalMixin};
        `;
    })
);

export const RangePopupPickerContainer = styled('div')`
    margin: 10px 10px 0 10px;

    .${prefixCls} {
        margin-left: 10px;
    }
`;

export const RangePopupConfirmButton = styled(Button)`
    float: right;
`;

export const RangePopupFooter = withProps()(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            padding: 10px;
            margin-top: 10px;
            border-top: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
            ${clearFixMixin};
        `;
    })
);

export const RangePopupTip = withProps()(
    styled('p')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            color: ${DT.T_COLOR_TEXT_REMARK_DARK};
            display: inline-block;
            line-height: 28px;
        `;
    })
);

export const RangePopupError = withProps()(
    styled('p')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            color: ${DT.T_COLOR_TEXT_ERROR};
            display: inline-block;
            line-height: 28px;
        `;
    })
);
