import React from 'react';

import Button from 'src/components/Button';
import Cascader from 'src/components/Cascader';
import Drawer from 'src/components/Drawer';

// demo start

const dataSource = [
    {
        key: 'ubuntu',
        title: 'Ubuntu版本',
        width: 132,
        children: [
            {
                key: 'ubuntu-22.04',
                title: 'Ubuntu 22.04',
                width: 132,
                children: [
                    {
                        key: 'cuda',
                        title: 'Cuda版本',
                        width: 132,
                        children: [
                            {
                                key: 'cuda-13.0',
                                title: '13.0',
                                width: 132,
                                children: [
                                    {
                                        key: 'framework',
                                        title: '框架版本',
                                        width: 132,
                                        children: [
                                            {
                                                key: 'framework-13.0',
                                                title: '13.0',
                                                width: 132,
                                                children: [
                                                    {
                                                        key: 'python',
                                                        title: 'Python版本',
                                                        width: 132,
                                                        children: [
                                                            {
                                                                key: 'python-3.12',
                                                                title: '3.12'
                                                            },
                                                            {
                                                                key: 'python-3.11',
                                                                title: '3.11'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                key: 'cuda-12.8',
                                title: '12.8'
                            },
                            {
                                key: 'cuda-12.6',
                                title: '12.6'
                            }
                        ]
                    }
                ]
            },
            {
                key: 'ubuntu-20.04',
                title: 'Ubuntu 20.04'
            }
        ]
    }
];

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
    }

    render() {
        const { visible } = this.state;
        return (
            <div>
                <Button onClick={() => this.setState({ visible: true })}>Open Drawer</Button>
                <Drawer
                    visible={visible}
                    placement="right"
                    width={360}
                    onClose={() => this.setState({ visible: false })}
                >
                    <div style={{ padding: 24, display: 'flex', justifyContent: 'flex-end' }}>
                        <Cascader
                            dataSource={dataSource}
                            popupPlacement="bottomRight"
                            popupMaxWidth={320}
                            defaultValue={['ubuntu', 'ubuntu-22.04']}
                            onChange={console.log}
                        />
                    </div>
                </Drawer>
            </div>
        );
    }
}

// demo end

export default Demo;
