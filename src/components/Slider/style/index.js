import styled, { css } from 'styled-components';
import config from 'config';

import { inlineBlockWithVerticalMixin, Color, Height, calculateSize, HeightNumber } from 'src/style';
import { tint } from 'src/style/color';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-slider';

export const SliderWrap = styled.div`
    .${prefixCls} {
        position: relative;
        width: 300px;
        border-radius: 2px;
        touch-action: none;
        margin-right: 12px;
        background: ${Color.bg.white};
        height: ${props => Height[props.size]};

        ${({ disabled }) =>
            disabled &&
            css`
                background: ${Color.bg.disabled};
            `};
        ${inlineBlockWithVerticalMixin};

        &-rail {
            box-sizing: border-box;
            position: absolute;
            width: 100%;
            border-radius: 2px;
            background: #e9e9e9;
            border: 1px solid ${Color.border.default};
            height: ${props => Height[props.size]};

            ${({ disabled }) =>
                disabled &&
                css`
                    background: ${Color.bg.disabled};
                `};
        }

        &-track {
            box-sizing: border-box;
            position: absolute;
            left: 0;
            border: 1px solid ${Color.border.blue};
            border-radius: 2px;
            background: ${Color.bg.blueActive};
            height: ${props => Height[props.size]};
        }

        &-tooltip {
            line-height: normal;
            user-select: none;
        }

        &-handle {
            box-sizing: border-box;
            position: absolute;
            margin-left: -10px;
            margin-top: -3px;
            width: 20px;
            cursor: pointer;
            cursor: grab;
            text-align: center;
            border: 1px solid #c3cad9;
            background: ${Color.bg.white};
            touch-action: pan-x;
            z-index: 1;
            height: ${props => calculateSize(Height[props.size], 6)};
            line-height: ${props => calculateSize(Height[props.size], 8)};

            ${({ disabled }) =>
                disabled &&
                css`
                    box-shadow: none;
                    border-color: ${Color.border.disabled};
                    cursor: not-allowed;
                `};

            &::before,
            &::after {
                content: '';
                display: inline-block;
                width: 1px;
                height: 16px;
                background: #dbdcdf;
                margin-top: ${props => (HeightNumber[props.size] + 6 - 2 - 16) / 2}px;
            }
            &::after {
                margin-left: 4px;
            }

            &:hover {
                border-color: ${tint(Color.border.blue, 0.2)};
            }
            &:active {
                border-color: ${tint(Color.border.blue, 0.2)};
                box-shadow: 0 0 5px ${tint(Color.border.blue, 0.2)};
                cursor: grabbing;
            }
            &:focus {
                border-color: ${tint(Color.border.blue, 0.2)};
                box-shadow: 0 0 5px ${tint(Color.border.blue, 0.5)};
                outline: none;
            }
        }

        &-mark {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            font-size: 12px;
        }

        &-mark-text {
            position: absolute;
            display: inline-block;
            vertical-align: middle;
            text-align: right;
            cursor: pointer;
            color: ${Color.font.default};
            border-right: 1px solid ${Color.border.default};
            padding: 0 8px;
            box-sizing: border-box;
            pointer-events: none;
            line-height: ${props => Height[props.size]};

            ${({ disabled }) =>
                disabled &&
                css`
                    cursor: not-allowed;
                    border-right-color: ${Color.border.disabled};
                `};

            &-active {
                color: ${Color.font.blue};
                border-right-color: ${Color.bg.blue};
            }
        }

        &-step {
            position: absolute;
            width: 100%;
            background: transparent;
            height: ${props => Height[props.size]};
        }

        &-dot {
            display: none;
        }
    }
`;
