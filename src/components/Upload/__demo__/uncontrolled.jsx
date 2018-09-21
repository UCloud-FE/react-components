import React from 'react';
import Upload from 'components/Upload';

// demo start
const defaultFileList = [
    {
        name: 'defaultFile1',
        uid: 'file_1'
    },
    {
        name: 'defaultFile2',
        uid: 'file_2'
    },
    {
        name: 'defaultFile3',
        uid: 'file_3'
    },
    {
        name: 'defaultFile4',
        uid: 'file_4'
    }
];
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList)}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        defaultFileList={defaultFileList}
    />
);
// demo end

export default Demo;
