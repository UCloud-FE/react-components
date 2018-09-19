import React from 'react';
import Upload from 'components/Upload';
import Modal from 'components/Modal';

// demo start
const { readFile } = Upload;
const handlePreview = file => {
    readFile(file)
        .then(url => {
            Modal.alert(
                {
                    title: '预览',
                    size: 'md'
                },
                <img src={url} width={500} height={500} />
            );
        })
        .catch(e => {
            alert(e);
        });
};
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList)}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        onPreview={handlePreview}
        multiple
    />
);
// demo end

export default Demo;
