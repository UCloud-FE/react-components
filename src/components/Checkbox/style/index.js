import styled, { css } from 'styled-components';

import Icon from 'components/Icon';
import { inlineBlockWithVerticalMixin, Color, Height } from 'src/style';

const disabledMixin = css`
    color: ${Color.font.disabled};
    cursor: not-allowed;
    pointer-events: none;
`;

const sizeMixin = ({ size }) => css`
    height: ${Height[size]};
    line-height: ${Height[size]};
`;

export const CheckboxWrap = styled.span`
    font-size: 14px;
    cursor: pointer;
    position: relative;

    ${inlineBlockWithVerticalMixin};
    ${sizeMixin};
    ${({ disabled }) => disabled && disabledMixin};
`;

export const CheckboxIcon = styled(Icon)`
    margin-right: 8px;

    color: ${props => (props.disabled ? Color.font.disabled : props.checked ? Color.font.blue : Color.font.default)};
`;

export const CheckboxGroupWrap = styled.div`
    ${/* sc-sel */ CheckboxWrap} {
        margin-right: 8px;

        &:last-child {
            margin-right: 0;
        }
    }
`;
