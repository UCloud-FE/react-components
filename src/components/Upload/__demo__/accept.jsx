import React from 'react';
import Upload from 'src/components/Upload';

// demo start
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList)}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        accept="image/* , .pdf"
        multiple
    />
);
// demo end

export default Demo;
