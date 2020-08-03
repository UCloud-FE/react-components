import React from 'react';

import EditableTable from 'src/components/EditableTable';

// demo start
const list = [
    { label: 'false', props: false },
    { label: 'onAdd', props: { onAdd: () => console.log('onAdd') } },
    { label: 'tip', props: { tip: '自定义提示' } },
    { label: 'disabled', props: { disabled: true } },
    { label: 'disabledWithTip', props: { disabled: true, tip: '自定义提示' } }
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
            dataSource: []
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
                            <InstanceDemo addition={props} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
