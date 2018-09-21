import styled, { css } from 'styled-components';

import { Height, calculateSize, inlineBlockWithVerticalMixin } from 'src/style';

import config from 'config';

const { prefixCls: _prefixCls } = config;

export const prefixCls = _prefixCls + '-pagination';

export const PaginationWrap = styled.ul`
    color: #6b798e;
    font-size: 12px;
    user-select: none;
    ${inlineBlockWithVerticalMixin};

    .${prefixCls} {
        &-item,
        &-prev,
        &-next,
        &-jump-prev,
        &-jump-next {
            outline: none;
            box-sizing: border-box;
            background-color: #fff;
            text-align: center;
            border-radius: 2px;
            margin-right: 5px;
            cursor: pointer;
            padding: 0 2px;

            ${inlineBlockWithVerticalMixin};
            ${({ size }) => css`
                min-width: ${Height[size]};
                height: ${Height[size]};
                line-height: ${calculateSize(Height[size], -2)};
            `};
        }

        &-item,
        &-prev,
        &-next {
            border: 1px solid #c3cad9;
        }
        &-item:hover,
        &-prev:hover,
        &-next:hover {
            border-color: #4683e6;
            color: #fff;
            background-color: #4683e6;
        }
        &-jump-prev:hover,
        &-jump-next:hover {
            color: #4074e1;
        }

        &-item-active,
        &-item-active:hover {
            border-color: #4683e6;
            color: #4074e1;
            background-color: #f4f9ff;
            cursor: default;
        }
        &-disabled,
        &-disabled:hover {
            border-color: #d9d9d9;
            background-color: #f7f7f7;
            color: #bbb;
            cursor: not-allowed;
        }

        &-prev-icon,
        &-next-icon {
            cursor: inherit;
        }

        &-options {
            &,
            &-size-changer,
            &-quick-jumper {
                display: inline-block;
                vertical-align: middle;
            }
            &-size-changer {
                margin-right: 5px;
            }
            &-gobutton {
                margin-left: 5px;
            }
        }
        &-quick-jumper-text,
        &-options-quick-jumper-text {
            color: #6b798e;
        }
    }
`;
