import React from 'react';
import Upload from 'src/components/Upload';

// demo start
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList)}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        multiple
        maxCount={3}
    />
);
// demo end

export default Demo;
