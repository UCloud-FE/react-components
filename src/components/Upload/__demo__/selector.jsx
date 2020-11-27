import React from 'react';
import Upload from 'components/Upload';

// demo start
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <h3>自定义控件</h3>
            <Upload onChange={fileList => console.log(fileList)} selector={<button>点我点我选</button>} multiple />
        </div>
        <div className="demo-wrap">
            <h3>隐藏控件</h3>
            <Upload listType="dropzone" onChange={fileList => console.log(fileList)} selector={null} multiple />
        </div>
    </div>
);
// demo end

export default Demo;
