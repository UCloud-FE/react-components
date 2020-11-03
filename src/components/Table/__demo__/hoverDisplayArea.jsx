import React from 'react';
import PropTypes from 'prop-types';

import Table from 'src/components/Table';
import Icon from 'src/components/Icon';
import Combine from 'src/components/Combine';

// demo start

const EditIcon = ({ record }) => {
    return <Icon type="edit" style={{ cursor: 'pointer' }} onClick={() => console.log(record)} />;
};
EditIcon.propTypes = {
    record: PropTypes.object
};

class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const columns = [
            {
                title: `title`,
                key: `title`,
                width: 200,
                render: record => <span>content {record.index}</span>
            },
            {
                title: `hover`,
                key: 'hover',
                render: record => (
                    <Combine>
                        <span>content</span>
                        <Table.HoverDisplayArea>
                            <EditIcon record={record} />
                        </Table.HoverDisplayArea>
                    </Combine>
                )
            },
            {
                title: `hover-m`,
                key: 'hover-m',
                render: record => (
                    <>
                        <Combine>
                            <span>content 1</span>
                            <Table.HoverDisplayArea>
                                <EditIcon record={record} />
                            </Table.HoverDisplayArea>
                        </Combine>
                        <Combine>
                            <span>content 2</span>
                            <Table.HoverDisplayArea>
                                <EditIcon record={record} />
                            </Table.HoverDisplayArea>
                        </Combine>
                    </>
                )
            }
        ];
        return (
            <div>
                <div className="demo-wrap">
                    <Table dataSource={dataSource} columns={columns} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
