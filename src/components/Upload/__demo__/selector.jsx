import React from 'react';
import Upload from 'components/Upload';

// demo start
const Demo = () => (
    <div>
        <Upload
            onChange={fileList => console.log(fileList)}
            onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
            selector={<button>点我点我选</button>}
            multiple
        />
    </div>
);
// demo end

export default Demo;
