import React from 'react';
import Upload from 'src/components/Upload';

// demo start
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList)}
        onAdd={files => {
            console.log(files);
            if (files.length < 2) {
                alert('一次至少两个我才让你加');
                return false;
            } else if (files.length > 4) {
                alert('一次传超过4个我也不让你加');
                return false;
            }
        }}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        multiple
    />
);
// demo end

export default Demo;
