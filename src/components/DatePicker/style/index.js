import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled, { css } from 'styled-components';
import RcPicker from 'rc-calendar/lib/Picker';

import Icon from 'components/Icon';
import Select from 'components/Select';
import Button from 'components/Button';
import { calendarMixin } from 'components/Calendar/style';
import { Color, Height, calculateSize, inlineBlockWithVerticalMixin, clearFixMixin } from 'src/style';

import config from 'config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-datepicker';

const RcPickerWrap = ({ className, dropdownClassName, ...rest }) => (
    <RcPicker dropdownClassName={classnames(className, dropdownClassName)} {...rest} />
);
RcPickerWrap.propTypes = {
    className: PropTypes.string.isRequired,
    dropdownClassName: PropTypes.string
};

export const PickerWrap = styled(RcPickerWrap)`
    user-select: none;
    width: 285px;
    z-index: ${props => props.zIndex};

    ${calendarMixin};
`;

export const DateWrap = styled.div`
    height: ${props => Height[props.size]};
    line-height: ${props => calculateSize(Height[props.size], -2)};
    padding: 0 8px;
    border: 1px solid ${Color.border.default};
    border-radius: 2px;
    cursor: pointer;
    box-sizing: border-box;

    ${inlineBlockWithVerticalMixin};
`;

export const DateSpan = styled.span`
    ${inlineBlockWithVerticalMixin};
`;

export const PickerIcon = styled(Icon)`
    margin-left: 5px;
    ${inlineBlockWithVerticalMixin};
`;

export const TimeWrap = styled.div`
    margin-left: 8px;

    ${inlineBlockWithVerticalMixin};
`;

export const TimeSeparator = styled.span`
    margin: 0 4px;
`;

export const PickerContainer = styled.div`
    ${inlineBlockWithVerticalMixin};

    ${({ disabled }) =>
        disabled &&
        css`
            ${/*sc-sel*/ DateWrap} {
                pointer-events: none;
                color: ${Color.font.disabled};
                border-color: ${Color.border.disabled};
                background: ${Color.bg.disabled};
            }
        `};
`;

export const RangePopup = styled.div`
    background: ${Color.bg.white};
    display: inline-block;
    border: 1px solid ${Color.border.default};
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    padding: 0;
`;

export const RangeSelect = styled(Select)`
    margin-right: 8px;
`;

export const RangeDateWrap = styled.div`
    border: 1px solid ${Color.border.default};
    padding: 0 8px;
    border-radius: 2px;
    cursor: pointer;
    box-sizing: border-box;
    height: ${props => Height[props.size]};
    line-height: ${props => calculateSize(Height[props.size], -2)};
    color: ${Color.font.default};

    ${inlineBlockWithVerticalMixin};

    ${({ disabled }) =>
        disabled &&
        css`
            pointer-events: none;
            background: ${Color.bg.disabled};
            border-color: ${Color.border.disabled};
            color: ${Color.font.disabled};
        `};

    ${({ modifyAble }) =>
        !modifyAble &&
        css`
            pointer-events: none;
            border: none;
            line-height: ${props => Height[props.size]};

            ${/* sc-sel */ PickerIcon} {
                display: none;
            }
        `};
`;

export const RangeDateSeparator = styled.span`
    margin: 0 4px;
    width: 12px;
    height: 1px;
    background: ${Color.border.default};

    ${inlineBlockWithVerticalMixin};
`;

export const RangePopupPickerContainer = styled.div`
    margin: 10px 10px 0 10px;

    ${/*sc-sel */ PickerContainer} {
        margin-left: 10px;
    }
`;

export const RangePopupConfirmButton = styled(Button)`
    float: right;
`;

export const RangePopupFooter = styled.div`
    padding: 10px;
    margin-top: 10px;
    border-top: 1px solid ${Color.border.default};
    ${clearFixMixin};
`;

export const RangePopupError = styled.p`
    color: ${Color.font.red};
    display: inline-block;
    line-height: 28px;
`;
