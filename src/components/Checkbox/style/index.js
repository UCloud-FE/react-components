import styled, { css } from 'styled-components';

import Icon from 'src/components/Icon';
import Card from 'src/components/Radio/Card';
import { inlineBlockWithVerticalMixin } from 'src/style';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';
import config from 'src/config';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-checkbox';

export const CheckboxIcon = styled(Icon).attrs({
    className: prefixCls + '-icon'
})`
    margin-right: 8px;
    font-size: 14px;
    vertical-align: middle;
`;

const propsMixin = ({ theme: { designTokens: DT, Height }, size, disabled, checked }) => css`
    min-height: ${Height[size]};
    font-size: ${DT.T_TYPO_FONT_SIZE_1};

    ${disabled &&
        css`
            color: ${DT.T_COLOR_TEXT_DISABLED};
            cursor: not-allowed;
        `};

    ${!disabled &&
        css`
            :hover ${CheckboxIcon} {
                color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
            }
        `} ${CheckboxIcon} {
        line-height: ${Height[size]};
        color: ${disabled
            ? DT.T_COLOR_LINE_DISABLED_DARK
            : checked
                ? DT.T_COLOR_LINE_PRIMARY_HOVER
                : DT.T_COLOR_LINE_DEFAULT_LIGHT};
    }
`;

export const CheckboxWrap = styled.span.attrs({
    className: prefixCls
})`
    cursor: pointer;
    position: relative;

    ${inlineBlockWithVerticalMixin};
    ${propsMixin};
`;

export const CheckboxContentWrap = styled.div.attrs({
    className: prefixCls + '-content'
})`
    ${inlineBlockWithVerticalMixin};
`;

export const CheckboxCardWrap = styled(Card)`
    /* empty */
`;
export const CheckboxGroupWrap = styled.div.attrs({
    className: prefixCls + '-group'
})`
    ${CheckboxWrap}, ${CheckboxCardWrap} {
        margin-right: 8px;

        &:last-child {
            margin-right: 0;
        }
    }
`;

addDefaultThemeProps(CheckboxWrap);
