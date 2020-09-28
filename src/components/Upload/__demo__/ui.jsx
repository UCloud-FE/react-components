import React from 'react';

import Upload from 'src/components/Upload';

// demo start
const gif = {
    uid: 'gif',
    name: 'gif.gif',
    thumbnailUrl: 'https://i.imgur.com/d9oUfhA.gif',
    url: 'https://i.imgur.com/d9oUfhA.gif'
};
const png = {
    uid: 'png',
    name: 'png.png',
    thumbnailUrl: 'https://i.imgur.com/Pqxezi8.png',
    url: 'https://i.imgur.com/Pqxezi8.png'
};
const jpg = {
    uid: 'jpg',
    name: 'jpg.jpg',
    thumbnailUrl: 'https://i.imgur.com/PfPOQBe.jpg',
    url: 'https://i.imgur.com/PfPOQBe.jpg'
};
const image = {
    uid: 'image',
    name: 'image',
    type: 'image/png'
};
const text = {
    uid: 'text',
    name: 'text.text',
    type: 'text/text'
};
const pdf = {
    uid: 'pdf',
    name: 'pdf.pdf',
    type: 'application/pdf'
};
const word = {
    uid: 'msword',
    name: 'word.doc',
    type: 'application/msword'
};
const zip = {
    uid: 'zip',
    name: 'zip.zip',
    type: 'application/zip'
};
const rar = {
    uid: 'rar',
    name: 'rar.rar',
    type: 'application/x-rar'
};
const gzip = {
    uid: 'gzip',
    name: 'gzip.gzip',
    type: 'application/gzip'
};
const unknown = {
    uid: 'unknown',
    name: 'unknown',
    type: 'unknown'
};
const error = {
    uid: 'error',
    name: 'error',
    type: 'image/png',
    status: 'error',
    error: new Error('Upload fail')
};
const uploading = {
    uid: 'uploading',
    name: 'uploading',
    type: 'image/png',
    status: 'uploading'
};
const progress = {
    uid: 'progress',
    name: 'progress',
    type: 'image/png',
    status: 'uploading',
    progress: 50
};
const overflowName = {
    uid: 'overflow-name',
    name:
        'very loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong name',
    type: 'image/png'
};
const overflowError = {
    uid: 'overflow-error',
    name: 'overflow-error',
    type: 'image/png',
    status: 'error',
    error: new Error(
        'very loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong error name'
    )
};
const Demo = () => (
    <div>
        {[
            'list',
            ['list', 'thumbnail'],
            ['list', 'card'],
            'dropzone',
            ['dropzone', 'thumbnail'],
            ['dropzone', 'card']
        ].map(listType => {
            return (
                <div key={listType + ''}>
                    <h2>list-type: {JSON.stringify(listType)}</h2>
                    <div>
                        <h3>无文件状态</h3>
                        <div className="demo-wrap">
                            <Upload listType={listType} fileList={[]} />
                        </div>
                    </div>
                    <div>
                        <h3>单文件状态</h3>
                        <div className="demo-wrap">
                            <Upload listType={listType} fileList={[gif]} />
                        </div>
                    </div>
                    <div>
                        <h3>多文件状态</h3>
                        <div className="demo-wrap">
                            <Upload
                                listType={listType}
                                fileList={[
                                    gif,
                                    png,
                                    jpg,
                                    image,
                                    text,
                                    pdf,
                                    word,
                                    zip,
                                    rar,
                                    gzip,
                                    unknown,
                                    error,
                                    uploading,
                                    progress,
                                    overflowName,
                                    overflowError
                                ]}
                            />
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
);
// demo end

export default Demo;
