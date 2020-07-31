import React from 'react';

import Combine from 'src/components/Combine';
import Table from 'src/components/Table';
import Button from 'src/components/Button';

// demo start
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const columns = new Array(5).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 200,
            render: record => <span>content {record.index}</span>
        }));
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        title={() => (
                            <Combine>
                                <Button styleType="primary">Add</Button>
                                <Button>Rmove</Button>
                            </Combine>
                        )}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
