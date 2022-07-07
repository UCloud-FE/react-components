import React from 'react';
import { Resizable } from 'react-resizable';

import ActionList from 'src/components/ActionList';

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
                        <ActionList
                            exposeCount={6}
                            autoAdjustment
                            actionList={new Array(10).fill(null).map((v, i) => ({
                                label: `Action ${i}`,
                                onClick: e => console.log('action', i, e)
                            }))}
                        />
                    </div>
                </Resizable>
            </div>
        </>
    );
};

// demo end

export default Demo;
