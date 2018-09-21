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

export const Color = {
    white: '#FFF',
    blue: '#4074e1',
    grayLight: '#abb4c3',
    disabled: '#bbb',
    font: {
        default: '#6b798e',
        disabled: '#bbb',
        white: '#FFF',
        blue: '#4074e1',
        yellow: '#f9ce1d',
        red: '#f44336',
        grayLight: '#abb4c3',
        title: '#0a1633',
        black: '#3a4161'
    },
    border: {
        default: '#c3cad9',
        disabled: '#d9d9d9',
        yellow: '#fff28f',
        red: '#fed4d4',
        blue: '#4683e6',
        blueBright: '#cae3ff',
        defaultLight: '#e1e6f0',
        black: '#3a4161'
    },
    bg: {
        default: '#fcfcfd',
        disabled: '#f7f7f7',
        yellow: '#fffce5',
        red: '#fff0f0',
        white: '#FFF',
        blueLight: '#eaf3fd',
        blue: '#4683e6',
        blueActive: '#f4f9ff',
        blueBold: '#3664c8',
        content: '#f2f6fc',
        black: '#3a4161',
        gray: '#e1e6f0'
    }
};

export const FontSize = {
    xs: '12px',
    sm: '14px'
};

export const Height = {
    sm: '22px',
    md: '28px',
    lg: '34px'
};
export const HeightNumber = {
    sm: 22,
    md: 28,
    lg: 34
};

export const Padding = {
    sm: '8px',
    md: '8px',
    lg: '12px'
};

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
