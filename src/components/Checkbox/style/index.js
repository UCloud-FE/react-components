import styled, { css } from 'styled-components';

import Icon from 'src/components/Icon';
import { inlineBlockWithVerticalMixin } from 'src/style';
import defaultTheme from 'src/components/ThemeProvider/theme';

export const CheckboxIcon = styled(Icon)`
    margin-right: 8px;
    font-size: 14px;
`;

const propsMixin = ({ theme: { Height, colorMap, fontSize }, size, disabled, checked }) => css`
    height: ${Height[size]};
    line-height: ${Height[size]};
    font-size: ${fontSize};
    color: ${colorMap.default.text};

    ${disabled &&
        css`
            color: ${colorMap.disabled.text};
            cursor: not-allowed;
            pointer-events: none;
        `};

    ${/*sc-sel */ CheckboxIcon} {
        color: ${disabled ? colorMap.disabled.icon : checked ? colorMap.active.icon : colorMap.default.icon};
    }
`;

export const CheckboxWrap = styled.span`
    cursor: pointer;
    position: relative;

    ${inlineBlockWithVerticalMixin};
    ${propsMixin};
`;
CheckboxWrap.defaultProps = {
    theme: defaultTheme
};

export const CheckboxGroupWrap = styled.div`
    ${/* sc-sel */ CheckboxWrap} {
        margin-right: 8px;

        &:last-child {
            margin-right: 0;
        }
    }
`;
