import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { injectGlobal } from 'emotion';
import RcDialog from 'rc-dialog';

import config from 'src/config';
import 'src/style/globalAnimation';
import withProps from 'src/utils/withProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-modal';
export const contentCls = prefixCls + '-body-content';
export const noticeCls = prefixCls + '-notice';

injectGlobal`
    .${prefixCls} {
        &-mask {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            height: 100%;
            z-index: 1010;
            &-hidden {
                display: none;
            }
        }
    }
`;

class RcDialogWrap extends Component {
    static propTypes = {
        className: PropTypes.string,
        wrapClassName: PropTypes.string,
        trueClassName: PropTypes.string
    };
    render() {
        const { className, wrapClassName, trueClassName, ...rest } = this.props;
        return <RcDialog className={trueClassName} wrapClassName={classnames(className, wrapClassName)} {...rest} />;
    }
}

export const SContent = withProps({ className: contentCls })(
    styled.div(props => {
        const { maxHeight } = props;
        return css`
            padding: 16px 20px;
            overflow: auto;
            max-height: ${maxHeight};
        `;
    })
);

export const ModalWrap = withProps()(
    styled(RcDialogWrap)(props => {
        const {
            theme: { designTokens: DT, fontSize },
            mask,
            customStyle
        } = props;

        return css`
            position: fixed;
            overflow: auto;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1010;
            -webkit-overflow-scrolling: touch;
            outline: 0;
            background: ${mask && DT.T_MODAL_COLOR_LAYER_DEFAULT};

            .${prefixCls} {
                padding: 0;
                line-height: 1;
                font-size: ${fontSize};
                color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                position: relative;
                width: 340px;
                margin: 0 auto 100px;
                top: 15%;
                border-radius: 4px;
                background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
                box-shadow: ${DT.T_MODAL_SHADOW_DEFAULT};
                &-content {
                    position: relative;
                    border: none;
                    border-radius: 6px 6px;
                    background-clip: padding-box;
                }
                &-close {
                    position: absolute;
                    z-index: 1;
                    right: 0;
                    top: 0;
                    padding: 16px;
                    margin: 0;
                    cursor: pointer;
                    fill: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
                }
                &-close-svg {
                    width: 20px;
                    height: 20px;
                    font-size: 20px;
                }
                &-close-x {
                    display: none;
                }

                &-title-content {
                    position: relative;
                    padding: 16px 52px 16px 16px;
                    min-height: 20px;
                    color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                    border-bottom: 1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
                    border-radius: 4px 4px 0 0;
                    font-size: 16px;
                    line-height: 20px;
                }
                &-footer {
                    padding: 15px 16px;
                    border-top: 1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
                    border-radius: 0 0 4px 4px;
                    line-height: 1;
                    text-align: right;
                }
                &-body {
                    ${customStyle?.contentPadding &&
                    css`
                        padding: 16px 20px;
                    `}
                }
                .${noticeCls}.${noticeCls}.${noticeCls} {
                    border-top: none;
                    border-left: none;
                    border-right: none;
                    border-radius: 0;
                }
            }
        `;
    })
);
