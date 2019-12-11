import { injectGlobal } from 'styled-components';

import config from 'config';
import { fadeIn, fadeOut, bounceIn, bounceOut, zoomIn, zoomOut, slideDownIn, slideDownOut } from './animation';

const { prefixCls: _prefixCls } = config;
export const animationPrefixCls = _prefixCls + '-animation';
const animationDuration = '0.1s';

injectGlobal`
    .${animationPrefixCls} {
        &-fade {
            &-enter,
            &-appear,
            &-leave,
            &-exit {
                animation-duration: ${animationDuration};
                animation-fill-mode: both;
            }
            &-enter,
            &-appear {
                animation-name: ${fadeIn};
            }
            &-leave,
            &-exit {
                animation-name: ${fadeOut};
            }
        }


        &-bounce {
            &-enter,
            &-appear,
            &-leave,
            &-exit {
                animation-duration: ${animationDuration};
                animation-fill-mode: both;
            }
            &-enter,
            &-appear {
                animation-name: ${bounceIn};
            }
            &-leave,
            &-exit {
                animation-name: ${bounceOut};
            }
        }


        &-zoom {
            &-enter,
            &-appear,
            &-leave,
            &-exit {
                animation-duration: ${animationDuration};
                animation-fill-mode: both;
            }
            &-enter,
            &-appear {
                animation-name: ${zoomIn};
            }
            &-leave,
            &-exit {
                animation-name: ${zoomOut};
            }
        }

        &-slide-down {
            &-enter,
            &-appear,
            &-leave,
            &-exit {
                animation-duration: ${animationDuration};
                animation-fill-mode: both;
            }
            &-enter,
            &-appear {
                animation-name: ${slideDownIn};
            }
            &-leave,
            &-exit {
                animation-name: ${slideDownOut};
            }
        }
    }
`;
