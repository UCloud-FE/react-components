import React from 'react';
import Upload from 'components/Upload';

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [
                {
                    name: 'file1',
                    uid: 'file_1'
                },
                {
                    name: 'file2',
                    uid: 'file_2'
                }
            ],
            count: 0
        };
    }
    render() {
        const { state } = this;
        return (
            <Upload
                onChange={fileList => {
                    console.log(fileList);
                    if (state.count % 2 !== 0) {
                        this.setState(
                            {
                                fileList,
                                count: ++state.count
                            },
                            alert('这次更改我接受')
                        );
                    } else {
                        this.setState(
                            {
                                count: ++state.count
                            },
                            alert('这次更改我不接受')
                        );
                    }
                }}
                onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
                fileList={state.fileList}
            />
        );
    }
}
// demo end

export default Demo;
