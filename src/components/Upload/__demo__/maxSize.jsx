import React from 'react';
import Upload from 'components/Upload';

// demo start
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList)}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        maxSize={1024 * 1024}
    />
);
// demo end

export default Demo;
