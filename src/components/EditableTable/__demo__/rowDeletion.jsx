import React from 'react';

import EditableTable from 'src/components/EditableTable';

// demo start
const list = [
    { label: 'false', props: false },
    { label: 'onDelete', props: { onDelete: () => console.log('onDelete') } },
    { label: 'getDisabledOfRow', props: { getDisabledOfRow: record => record.deletable === false } }
];

const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        filter: {
            options: [1, 2, 3, 4]
        },
        order: true
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
        filter: {
            options: [1, 2, 3, 4],
            multiple: true
        },
        order: true
    }
];

let uid = 0;

const generateData = ({ name, desc, deletable } = {}) => {
    const id = uid++;
    return {
        key: id + '',
        name: name || `name-${id}`,
        desc: desc || `desc-${id}`,
        deletable
    };
};
class InstanceDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new Array(10).fill(null).map((v, i) => generateData({ deletable: i % 2 }))
        };
    }
    handleDelete(record) {
        console.log('Remove', record);
        const { dataSource } = this.state;
        const key = record.key;
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
    handleAdd() {
        const { dataSource } = this.state;
        dataSource.push(generateData());
        this.setState({ dataSource });
    }
    render() {
        const { dataSource } = this.state;
        return (
            <EditableTable
                columns={columns}
                dataSource={dataSource}
                rowDeletion={{
                    onDelete: record => this.handleDelete(record)
                }}
                {...this.props}
            />
        );
    }
}

class Demo extends React.Component {
    render() {
        return (
            <div>
                {list.map(({ props, label }) => (
                    <div key={label}>
                        <h2>{label}</h2>
                        <div className="demo-wrap">
                            <InstanceDemo rowDeletion={props} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
