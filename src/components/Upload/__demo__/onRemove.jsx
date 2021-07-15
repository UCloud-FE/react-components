import React from 'react';
import Upload from 'src/components/Upload';

// demo start
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList)}
        onRemove={(file, index) => {
            console.log(file, index);
            if (index === 0) {
                alert('这个文件我喜欢，你不能删');
                return false;
            }
        }}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        multiple
    />
);
// demo end

export default Demo;
