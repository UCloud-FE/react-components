import styled, { css } from 'styled-components';

import { inlineBlockWithVerticalMixin, Color, Height } from 'src/style';
import Icon from 'components/Icon';

export const InputWrap = styled.span`
    position: relative;

    color: ${Color.font.default};

    ${inlineBlockWithVerticalMixin};

    ${({ disabled }) =>
        disabled &&
        css`
            color: ${Color.font.disabled};
            pointer-events: none;
        `};

    input {
        display: block;
        box-sizing: border-box;
        width: 100%;
        padding: 4px 8px;
        margin: 0;
        border: 1px solid ${Color.border.default};
        border-radius: 2px;
        background: ${Color.bg.white};
        font-size: inherit;
        outline: none;
        color: inherit;

        height: ${props => Height[props.size]};
        ${props => (props.withIcon ? `padding-right: ${Height[props.size]}` : '')};

        &::placeholder {
            color: ${Color.font.grayLight};
        }
        &:hover {
            border-color: ${Color.border.blue};
        }
        &:focus {
            border-color: ${Color.border.blue};
        }

        ${({ disabled }) =>
            disabled &&
            css`
                &,
                &:hover,
                &:focus {
                    background: ${Color.bg.disabled};
                    border-color: ${Color.border.disabled};
                }
            `};
    }
`;

export const IconWrap = styled.span`
    position: absolute;
    right: 0;
    top: 0;
    text-align: center;
    color: inherit;
    width: ${props => Height[props.size]};
    height: ${props => Height[props.size]};
    line-height: ${props => Height[props.size]};
`;

export const SearchIcon = styled(Icon)`
    cursor: pointer;
`;
