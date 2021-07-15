import React from 'react';
import Upload from 'src/components/Upload';

// demo start
const { readFile } = Upload;
const handleOnAdd = fileList => {
    fileList.forEach(file => {
        readFile(file)
            .then(dataUrl => {
                console.log(dataUrl);
            })
            .catch(e => {
                console.log(e);
            });
    });
};
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList)}
        onAdd={handleOnAdd}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        multiple
    />
);
// demo end

export default Demo;
