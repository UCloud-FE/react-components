import React from 'react';

import EditableTable from 'src/components/EditableTable';
import Switch from 'src/components/Switch';
import Form from 'src/components/Form';
import Input from 'src/components/Input';

// demo start
const { defaultProps } = EditableTable;

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
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addition: defaultProps.addition,
            additionTip: '',
            rowDeletion: defaultProps.rowDeletion,
            randomRowDeletionDisable: false,
            dataSource: []
        };
    }
    onDelete(record) {
        console.log('Delete', record);
        const key = record.key;
        const dataSource = this.state.dataSource.filter(item => item.key !== key);
        this.setState({ dataSource });
    }
    onAdd() {
        const dataSource = [...this.state.dataSource];
        dataSource.push(generateData());
        this.setState({ dataSource });
    }
    getDisabledOfRow(record) {
        return record.key % 2;
    }
    render() {
        const { addition, rowDeletion, additionTip, randomRowDeletionDisable, dataSource } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        let _addition = addition,
            _rowDeletion = rowDeletion;
        if (addition) {
            _addition = {
                onAdd: () => this.onAdd(),
                tip: additionTip
            };
        }
        if (rowDeletion) {
            _rowDeletion = {
                onDelete: record => this.onDelete(record),
                getDisabledOfRow: randomRowDeletionDisable ? this.getDisabledOfRow : null
            };
        }

        return (
            <div>
                <Form className="demo-form" onSubmit={e => e.preventDefault()}>
                    <Form.Item label="addition" {...itemLayout}>
                        <Switch checked={addition} onChange={addition => this.setState({ addition })} />
                    </Form.Item>
                    <Form.Item label="addition.tip" {...itemLayout}>
                        <Input
                            value={additionTip}
                            onChange={e =>
                                this.setState({
                                    additionTip: e.target.value
                                })
                            }
                            type="input"
                        />
                    </Form.Item>
                    <Form.Item label="rowDeletion" {...itemLayout}>
                        <Switch checked={rowDeletion} onChange={rowDeletion => this.setState({ rowDeletion })} />
                    </Form.Item>
                    <Form.Item label="rowDeletion.getDisabledOfRow" {...itemLayout}>
                        <Switch
                            checked={randomRowDeletionDisable}
                            onChange={randomRowDeletionDisable => this.setState({ randomRowDeletionDisable })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <EditableTable
                        {...{
                            addition: _addition,
                            rowDeletion: _rowDeletion,
                            dataSource,
                            columns
                        }}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
