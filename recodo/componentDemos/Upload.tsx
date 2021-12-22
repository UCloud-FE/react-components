import React from 'react';
import { Upload, Box, UploadListType, UploadFile } from '@ucloud-fe/react-components';

const gif: UploadFile = {
    uid: 'gif',
    name: 'gif.gif',
    thumbnailUrl: 'https://i.imgur.com/d9oUfhA.gif',
    url: 'https://i.imgur.com/d9oUfhA.gif'
};
const png: UploadFile = {
    uid: 'png',
    name: 'png.png',
    thumbnailUrl: 'https://i.imgur.com/Pqxezi8.png',
    url: 'https://i.imgur.com/Pqxezi8.png'
};
const jpg: UploadFile = {
    uid: 'jpg',
    name: 'jpg.jpg',
    thumbnailUrl: 'https://i.imgur.com/PfPOQBe.jpg',
    url: 'https://i.imgur.com/PfPOQBe.jpg'
};
const image: UploadFile = {
    uid: 'image',
    name: 'image',
    type: 'image/png'
};
const text: UploadFile = {
    uid: 'text',
    name: 'text.text',
    type: 'text/text'
};
const pdf: UploadFile = {
    uid: 'pdf',
    name: 'pdf.pdf',
    type: 'application/pdf'
};
const word: UploadFile = {
    uid: 'msword',
    name: 'word.doc',
    type: 'application/msword'
};
const zip: UploadFile = {
    uid: 'zip',
    name: 'zip.zip',
    type: 'application/zip'
};
const rar: UploadFile = {
    uid: 'rar',
    name: 'rar.rar',
    type: 'application/x-rar'
};
const gzip: UploadFile = {
    uid: 'gzip',
    name: 'gzip.gzip',
    type: 'application/gzip'
};
const unknown: UploadFile = {
    uid: 'unknown',
    name: 'unknown',
    type: 'unknown'
};
const error: UploadFile = {
    uid: 'error',
    name: 'error',
    type: 'image/png',
    status: 'error',
    error: new Error('Upload fail')
};
const uploading: UploadFile = {
    uid: 'uploading',
    name: 'uploading',
    type: 'image/png',
    status: 'uploading'
};
const progress: UploadFile = {
    uid: 'progress',
    name: 'progress',
    type: 'image/png',
    status: 'uploading',
    progress: 50
};
const overflowName: UploadFile = {
    uid: 'overflow-name',
    name:
        'very loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong name',
    type: 'image/png'
};
const overflowError: UploadFile = {
    uid: 'overflow-error',
    name: 'overflow-error',
    type: 'image/png',
    status: 'error',
    error: new Error(
        'very loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong error name'
    )
};
const Demo = () => (
    <Box container direction="column" spacing="lg">
        {([
            'list',
            ['list', 'thumbnail'],
            ['list', 'card'],
            'dropzone',
            ['dropzone', 'thumbnail'],
            ['dropzone', 'card']
        ] as UploadListType[]).map(listType => {
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
    </Box>
);

export default React.memo(Demo);
