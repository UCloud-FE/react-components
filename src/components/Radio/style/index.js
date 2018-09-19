import styled, { css } from 'styled-components';

import { Height, Color, FontSize, inlineBlockWithVerticalMixin } from 'src/style';
import Icon from 'components/Icon';
import Button from 'components/Button';

export const RadioIcon = styled(Icon)`
    margin-right: 8px;
`;

const radioCommonStyleMixin = css`
    color: ${Color.font.default};
    font-size: ${FontSize.sm};
    position: relative;
    cursor: pointer;
`;

const sizeMixin = ({ size }) => css`
    height: ${Height[size]};
    line-height: ${Height[size]};
`;

export const RadioWrap = styled.div`
    ${radioCommonStyleMixin};

    ${inlineBlockWithVerticalMixin};

    ${sizeMixin};

    ${({ checked }) =>
        checked &&
        css`
            ${/* sc-sel */ RadioIcon} {
                color: ${Color.font.blue};
            }
        `};

    ${({ disabled }) =>
        disabled &&
        css`
            color: ${Color.font.disabled};
            cursor: not-allowed;
            pointer-events: none;

            ${/* sc-sel */ RadioIcon} {
                color: ${Color.font.disabled};
            }
        `};
`;

export const RadioButtonWrap = styled(Button)`
    min-width: 50px;
    text-align: center;
    border: 1px solid ${Color.border.default};
    border-radius: 0;

    ${radioCommonStyleMixin};

    ${({ disabled }) =>
        disabled &&
        css`
            z-index: 1;
        `};

    ${({ checked }) =>
        checked &&
        css`
            border-color: ${Color.border.blue};
            color: ${Color.font.blue};
            z-index: 2;
        `};

    &:hover {
        z-index: 3;
    }
`;

export const RadioTagWrap = styled.div`
    padding: 0 8px;
    cursor: pointer;
    border-radius: 2px;

    ${radioCommonStyleMixin};

    ${inlineBlockWithVerticalMixin};

    ${sizeMixin};

    ${({ checked }) =>
        checked &&
        css`
            background-color: ${Color.bg.blueActive};
            color: ${Color.font.blue};
        `};

    ${({ disabled }) =>
        disabled &&
        css`
            color: ${Color.font.disabled};
            cursor: not-allowed;
            pointer-events: none;
        `};
`;

export const RadioGroupWrap = styled.div`
    ${/* sc-sel */ RadioWrap}, ${/* sc-sel */ RadioTagWrap} {
        margin-right: 8px;

        &:last-child {
            margin-right: 0;
        }
    }

    ${/* sc-custom */ RadioButtonWrap} {
        margin-right: -1px;
        &:first-child {
            border-radius: 2px 0 0 2px;
        }
        &:last-child {
            border-radius: 0 2px 2px 0;
            margin-right: 0;
        }
    }
`;
