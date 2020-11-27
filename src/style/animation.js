import { keyframes } from "@emotion/core";

export const slideUpIn = keyframes`
    0% {
        opacity: 0;
        transform-origin: 0% 0%;
        transform: scaleY(0);
    }
    100% {
        opacity: 1;
        transform-origin: 0% 0%;
        transform: scaleY(1);
    }
`;
export const slideUpOut = keyframes`
    0% {
        opacity: 1;
        transform-origin: 0% 0%;
        transform: scaleY(1);
    }
    100% {
        opacity: 0;
        transform-origin: 0% 0%;
        transform: scaleY(0);
    }
`;
export const slideDownIn = keyframes`
    0% {
        opacity: 0;
        transform-origin: 0% 100%;
        transform: scaleY(0);
    }
    100% {
        opacity: 1;
        transform-origin: 0% 100%;
        transform: scaleY(1);
    }
`;
export const slideDownOut = keyframes`
    0% {
        opacity: 1;
        transform-origin: 0% 100%;
        transform: scaleY(1);
    }
    100% {
        opacity: 0;
        transform-origin: 0% 100%;
        transform: scaleY(0);
    }
`;

export const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;
export const fadeOut = keyframes`
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
`;

export const bounceIn = keyframes`
    from,
    20%,
    40%,
    60%,
    80%,
    to {
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
        opacity: 0;
        transform: scale3d(0.3, 0.3, 0.3);
    }

    20% {
        transform: scale3d(1.1, 1.1, 1.1);
    }

    40% {
        transform: scale3d(0.9, 0.9, 0.9);
    }

    60% {
        opacity: 1;
        transform: scale3d(1.03, 1.03, 1.03);
    }

    80% {
        transform: scale3d(0.97, 0.97, 0.97);
    }

    to {
        opacity: 1;
        transform: scale3d(1, 1, 1);
    }
`;
export const bounceOut = keyframes`
    20% {
        transform: scale3d(0.9, 0.9, 0.9);
    }

    50%,
    55% {
        opacity: 1;
        transform: scale3d(1.1, 1.1, 1.1);
    }

    to {
        opacity: 0;
        transform: scale3d(0.3, 0.3, 0.3);
    }
`;

export const zoomIn = keyframes`
    from {
        opacity: 0;
        transform: scale3d(0.3, 0.3, 0.3);
    }

    50% {
        opacity: 1;
    }
`;
export const zoomOut = keyframes`
    from {
        opacity: 1;
    }

    50% {
        opacity: 0;
        transform: scale3d(0.3, 0.3, 0.3);
    }

    to {
        opacity: 0;
    }
`;

export const slideOutDown = keyframes`
    from {
        transform: translate3d(0, 0, 0);
    }

    to {
        visibility: hidden;
        transform: translate3d(0, 100%, 0);
    }
`;

export const slideInDown = keyframes`
    from {
        transform: translate3d(0, -100%, 0);
        visibility: visible;
    }

    to {
        transform: translate3d(0, 0, 0);
    }
`;
