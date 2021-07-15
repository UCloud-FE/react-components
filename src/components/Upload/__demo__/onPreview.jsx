import React from 'react';
import Upload from 'src/components/Upload';
import Modal from 'src/components/Modal';

// demo start
const { readFile } = Upload;
const handlePreview = file => {
    if (file.type.split('/')[0] === 'image') {
        readFile(file)
            .then(url => {
                Modal.alert(
                    {
                        title: '预览',
                        size: 'md'
                    },
                    <div style={{ textAlign: 'center' }}>
                        <img src={url} width={500} />
                    </div>
                );
            })
            .catch(e => {
                alert(e);
            });
    } else {
        Modal.alert(
            {
                title: '预览',
                size: 'md'
            },
            <div style={{ textAlign: 'center' }}>
                <div>类型{file.type}</div>
                <div>名称{file.name}</div>
            </div>
        );
    }
};
const Demo = () => <Upload onChange={fileList => console.log(fileList)} onPreview={handlePreview} multiple />;
// demo end

export default Demo;
