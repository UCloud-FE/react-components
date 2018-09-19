import React from 'react';
import Upload from 'components/Upload';

// demo start
const handleUpload = file => {
    console.log(file);
    return new Promise((resolve, reject) => {
        const success = Math.random() > 0.5;
        setTimeout(() => {
            if (success) {
                resolve('success');
            } else {
                reject(new Error('Upload fail'));
            }
        }, 10000 * Math.random());
    });
};
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList.map(file => file.status))}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        handleUpload={handleUpload}
        multiple
    />
);
// demo end

export default Demo;
