import React from 'react';
import { Resizable } from 'react-resizable';

import Tag from 'src/components/Tag';

// demo start
const Demo = () => {
    const [width, setWidth] = React.useState(300);
    const onResize = (e, { size }) => {
        setWidth(size.width);
    };
    return (
        <>
            <style>
                {`
.react-resizable {
    position: relative;
}
.react-resizable-handle {
    width: 3px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    display: block;
    position: absolute;
    bottom: 3px;
    top: 3px;
    right: 5px;
    cursor: col-resize;
}
`}
            </style>
            <div style={{ width }}>
                <Resizable
                    style={{ position: 'relative' }}
                    onResize={onResize}
                    width={width}
                    height={0}
                    minConstraints={[100, 0]}
                    maxConstraints={[1000, 0]}
                >
                    <div className="demo-wrap">
                        <Tag.Group exposeCount={6} autoAdjustment>
                            <Tag>Tag Content1</Tag>
                            <Tag>Tag Content2</Tag>
                            <Tag>Tag Content3</Tag>
                            <Tag>Tag Content4</Tag>
                            <Tag>Tag Content5</Tag>
                            <Tag>Tag Content6</Tag>
                            <Tag>Tag Content7</Tag>
                            <Tag>Tag Content8</Tag>
                        </Tag.Group>
                    </div>
                </Resizable>
            </div>
        </>
    );
};

// demo end

export default Demo;
