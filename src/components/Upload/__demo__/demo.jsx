import React from 'react';
import axios from 'axios';

import Upload from 'src/components/Upload';
import Button from 'src/components/Button';
import Loading from 'src/components/Loading';

// demo start
const handleUpload = (file, updateProgress, needProgress = true) => {
    console.log(file);
    needProgress && updateProgress(0);
    var formData = new FormData();
    formData.append('image', file);
    return axios
        .post('https://api.imgur.com/3/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Client-ID e147a4591b6996f'
            },
            onUploadProgress:
                needProgress &&
                function (progressEvent) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log(percentCompleted, progressEvent);
                    updateProgress(percentCompleted);
                }
        })
        .then(data => {
            file.url = data.data.data.link;
        });
};
const handleUpload2 = file => {
    var formData = new FormData();
    formData.append('image', file);
    return axios
        .post('https://api.imgur.com/3/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Client-ID e147a4591b6996f'
            }
        })
        .then(data => {
            return {
                name: file.name,
                url: data.data.data.link
            };
        });
};
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList1: [],
            fileList2: [],
            loading: false
        };
    }
    onConfirm1() {
        for (let i = 0; i < this.state.fileList1.length; i++) {
            const file = this.state.fileList1[i];
            if (file.status !== 'success') {
                console.log(file, 'not ready');
                return;
            }
        }
        const files = this.state.fileList1.map(file => ({
            url: file.url,
            name: file.name
        }));
        console.log(files);
    }
    onConfirm2() {
        const files = this.state.fileList2;
        this.setState({
            loading: true
        });
        Promise.all(
            files.map(file => {
                return handleUpload2(file, null, false);
            })
        ).then(files => {
            this.setState({
                loading: false
            });
            console.log(files);
        });
    }
    render() {
        const { loading } = this.state;
        return (
            <div>
                <div className="demo-wrap">
                    <h3>上传完成后点击 完成 按钮查看结果</h3>
                    <Upload
                        onChange={fileList => {
                            this.setState({
                                fileList1: fileList
                            });
                        }}
                        handleUpload={handleUpload}
                        multiple
                        accept="image/*"
                        listType={['list', 'thumbnail']}
                    />
                    <Button onClick={() => this.onConfirm1()}>submit</Button>
                </div>
                <Loading loading={loading}>
                    <div className="demo-wrap">
                        <h3>点击按钮后开始上传</h3>
                        <Upload
                            onChange={fileList => {
                                this.setState({
                                    fileList2: fileList
                                });
                            }}
                            multiple
                            accept="image/*"
                            listType={['list', 'thumbnail']}
                        />
                        <Button onClick={() => this.onConfirm2()}>upload</Button>
                    </div>
                </Loading>
            </div>
        );
    }
}
// demo end

export default Demo;
