import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Resizable } from 'react-resizable';
import styled from 'styled-components';

const ResizableTHWrap = styled(Resizable)`
    position: relative;
    box-sizing: border-box;
    border-right: 1px solid transparent;

    .react-resizable-handle {
        position: absolute;
        width: 6px;
        height: 100%;
        bottom: 0;
        right: 0;
        cursor: col-resize;
    }
    :hover {
        background: rgba(250, 250, 252);
        border-right-color: rgba(210, 214, 234);
    }
`;

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
    onResize = (e, { size }) => {
        const { onResize = () => {} } = this.props;
        onResize(size.width);
    };
    render() {
        // eslint-disable-next-line no-unused-vars
        const { width, resizeAble, onResize, minWidth = 20, maxWidth = Infinity, ...rest } = this.props;

        return resizeAble ? (
            <ResizableTHWrap
                width={width}
                height={0}
                onResize={this.onResize}
                minConstraints={[minWidth, 0]}
                maxConstraints={[maxWidth, 0]}
            >
                <th {...rest} />
            </ResizableTHWrap>
        ) : (
            <th {...rest} />
        );
    }
}
