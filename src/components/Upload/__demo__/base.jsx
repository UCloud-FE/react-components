import React from 'react';
import Upload from 'components/Upload';

// demo start
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList)}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        multiple
    />
);
// demo end

export default Demo;
