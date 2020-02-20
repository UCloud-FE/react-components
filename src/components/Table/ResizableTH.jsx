import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Resizable } from 'react-resizable';
import styled, { css } from 'styled-components';

import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

// eslint-disable-next-line no-unused-vars
const FilteredResizable = ({ resizing, theme, ...rest }) => <Resizable {...rest} />;
FilteredResizable.propTypes = { resizing: PropTypes.bool, theme: PropTypes.any };

const ResizableTHWrap = styled(FilteredResizable)(
    ({ resizing, theme: { designTokens: DT } }) => css`
        position: relative;
        box-sizing: border-box;

        .react-resizable-handle {
            position: absolute;
            width: 6px;
            height: 100%;
            bottom: 0;
            right: 0;
            cursor: col-resize;
            border-right: 1px solid transparent;
        }
        :hover {
            .react-resizable-handle {
                border-right-color: ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
            }
        }

        ${resizing &&
            css`
                background: ${DT.T_COLOR_BG_DEFAULT_LIGHT};
                .react-resizable-handle {
                    border-right-color: ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                }
            `};
    `
);

addDefaultThemeProps(ResizableTHWrap);

export default class ResizableTH extends Component {
    static propTypes = {
        /** 当前宽度 */
        width: PropTypes.number,
        /** 最小宽度 */
        minWidth: PropTypes.number,
        /** 最大宽度 */
        maxWidth: PropTypes.number,
        /** 是否可调整大小 */
        resizeAble: PropTypes.bool,
        /** 调整时的回调 */
        onResize: PropTypes.func
    };
    state = {};
    onResize = (e, { size }) => {
        const { onResize = () => {} } = this.props;
        onResize(size.width);
    };
    render() {
        // eslint-disable-next-line no-unused-vars
        const { width, resizeAble, onResize, minWidth = 20, maxWidth = Infinity, ...rest } = this.props;
        const { resizing } = this.state;

        return resizeAble ? (
            <ResizableTHWrap
                width={width}
                height={0}
                onResize={this.onResize}
                onResizeStart={() => this.setState({ resizing: true })}
                onResizeStop={() => this.setState({ resizing: false })}
                minConstraints={[minWidth, 0]}
                maxConstraints={[maxWidth, 0]}
                resizing={resizing}
            >
                <th {...rest} />
            </ResizableTHWrap>
        ) : (
            <th {...rest} />
        );
    }
}
