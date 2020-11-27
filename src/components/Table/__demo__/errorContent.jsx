import React from 'react';

import Table from 'src/components/Table';
import Notice from 'src/components/Notice';

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        rowKey="dataIndex"
                        columns={[
                            {
                                title: 'name',
                                key: 'name',
                                dataIndex: 'name'
                            }
                        ]}
                        errorContent={
                            <Notice closable={false} styleType="error">
                                哎，报错了
                            </Notice>
                        }
                    />
                </div>
                <div className="demo-wrap">
                    <Table
                        rowKey="dataIndex"
                        columns={[
                            {
                                title: 'name',
                                key: 'name',
                                dataIndex: 'name'
                            }
                        ]}
                        errorContent={<p style={{ background: 'red' }}>哎，报错了</p>}
                    />
                </div>
            </div>
        );
    }
}

// demo end

export default Demo;
