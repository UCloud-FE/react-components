import React from 'react';
import axios from 'axios';

import Upload from 'src/components/Upload';

// demo start
const handleUpload = (file, updateProgress, needProgress = true) => {
    console.log(file);
    needProgress && updateProgress(0);
    var formData = new FormData();
    formData.append('image', file);
    return axios.post('https://api.imgur.com/3/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: Math.random() > 0.5 && 'Client-ID e147a4591b6996f'
        },
        onUploadProgress:
            needProgress &&
            function (progressEvent) {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(percentCompleted, progressEvent);
                updateProgress(percentCompleted);
            }
    });
};
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <h3>可尝试上传文件看看效果，为了模拟会随机出现报错</h3>
            <Upload
                onChange={fileList => console.log(fileList.map(file => file.status))}
                onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
                handleUpload={handleUpload}
                multiple
                accept="image/*"
                listType={['list', 'thumbnail']}
            />
        </div>
        <div className="demo-wrap">
            <h3>这里是没有上报进度时的效果，会有个虚假的进度条，😂</h3>
            <Upload
                onChange={fileList => console.log(fileList.map(file => file.status))}
                onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
                handleUpload={(...args) => handleUpload(...args, false)}
                multiple
                accept="image/*"
                listType={['list', 'thumbnail']}
            />
        </div>
    </div>
);
// demo end

export default Demo;
