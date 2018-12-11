import { keyframes, css } from 'styled-components';

export const clearFixMixin = css`
    &:before,
    &:after {
        content: ' ';
        display: table;
    }
    &:after {
        clear: both;
    }
`;

export const inlineBlockWithVerticalMixin = css`
    display: inline-block;
    vertical-align: middle;
`;

export const calculateSize = (size, offset) => {
    const [, number, unit] = /^(\d+)(\S+)$/.exec(size);
    return +number + +offset + unit;
};

const spinKeyframes = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const spinMixin = css`
    animation: ${spinKeyframes} 1.2s infinite linear;
`;
