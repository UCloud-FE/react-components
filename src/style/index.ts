import { css } from '@emotion/core';

import { spinKeyframes } from './animation';

/** @deprecated */
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
/** @deprecated */
export const calculateSize = (size: string, offset: number) => {
    const [, number, unit] = /^(\d+)(\S+)$/.exec(size) || [];
    return +number + +offset + unit;
};

export const inlineBlockWithVerticalMixin = css`
    display: inline-block;
    vertical-align: middle;
`;

export const spinMixin = css`
    animation: ${spinKeyframes} 1.2s infinite linear;
`;

export * from './interface';
export * from './utils';
export * from './animation';
export { default as sWrap } from './sWrap';
