import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled, { css, injectGlobal } from 'styled-components';
import RcDialog from 'rc-dialog';

import config from 'src/config';
import 'src/style/globalAnimation';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-modal';

injectGlobal`
    .${prefixCls} {
        &-mask {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
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

export const ModalWrap = styled(RcDialogWrap)(
    ({ theme: { colorMap, fontSize } }) => css`
        position: fixed;
        overflow: auto;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1010;
        -webkit-overflow-scrolling: touch;
        outline: 0;

        .${prefixCls} {
            padding: 0;
            line-height: 1;
            font-size: ${fontSize};
            color: ${colorMap.default.text};
            position: relative;
            border: 1px solid ${colorMap.default.border};
            width: 340px;
            margin: 0 auto 100px;
            top: 15%;
            border-radius: 4px;
            background-color: ${colorMap.default.background};
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
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
                width: 20px;
                height: 20px;
                font-size: 20px;
                cursor: pointer;
            }
            &-close-x {
                display: none;
            }

            &-title-content {
                position: relative;
                padding: 16px 52px 16px 16px;
                min-height: 20px;
                border-bottom: 1px solid ${colorMap.default.border};
                border-radius: 4px 4px 0 0;
                font-size: 16px;
                line-height: 20px;
            }
            &-footer {
                padding: 15px 16px;
                border-top: 1px solid ${colorMap.default.border};
                border-radius: 0 0 4px 4px;
                line-height: 1;
                text-align: right;
            }
            &-body {
                min-height: 60px;
            }
        }
    `
);
