import React from 'react';

import Table from 'src/components/Table';

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
                        emptyContent={<p style={{ background: 'blue' }}>没东西啊</p>}
                    />
                </div>
            </div>
        );
    }
}

// demo end

export default Demo;
