import styled, { css } from 'styled-components';

import Input from 'components/Input';
import Icon from 'components/Icon';
import Menu from 'components/Menu';
import { Color, Height, inlineBlockWithVerticalMixin } from 'src/style';

export const SelectSearchInput = styled(Input.Search)`
    min-width: 100px;
    margin: 0 8px;
    margin-top: 10px;
`;

const sizeMixin = ({ size }) => css`
    height: ${Height[size]};
    line-height: ${Height[size]};
`;

export const Selector = styled.div`
    border-radius: 2px;
    cursor: pointer;
    padding: 0 8px;
    border: 1px solid #c3cad9;
    padding-right: 40px;
    box-sizing: border-box;
    &:hover {
        border: 1px solid ${Color.border.blue};
    }

    ${sizeMixin};
`;

export const Arrow = styled(Icon)`
    position: absolute;
    right: 8px;
    top: 50%;
    margin-top: -6px;
`;
export const OptionWrap = styled(Menu.Item)`
    ${({ hidden }) =>
        hidden &&
        css`
            display: none;
        `};
`;
export const MenuWrap = styled.div`
    background: ${Color.bg.white};
    border: 1px solid ${Color.border.default};
`;

export const BlockMenu = styled(Menu)`
    display: block;
    border: none;
    max-height: 380px;
`;

export const SelectWrap = styled.div`
    box-sizing: border-box;
    position: relative;
    font-size: 12px;
    color: ${Color.font.default};
    background-color: ${Color.bg.white};

    ${inlineBlockWithVerticalMixin};
    ${({ disabled }) =>
        disabled &&
        css`
            pointer-events: none;
            color: ${Color.font.disabled};

            ${/*sc-sel*/ Selector} {
                background: ${Color.bg.disabled};
                border-color: ${Color.border.disabled};
            }
        `};
`;
