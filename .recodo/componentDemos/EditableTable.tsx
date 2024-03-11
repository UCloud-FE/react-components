// @ts-nocheck
import { Box, EditableTable, Form, Input, Switch } from '@ucloud-fe/react-components';
import React from 'react';

// demo start
const { defaultProps } = EditableTable;

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
class BaseDemo extends React.Component {
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
        const { addition, rowDeletion, additionTip, additionHidden, randomRowDeletionDisable, dataSource } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const _addition = {
            onAdd: () => this.onAdd(),
            tip: additionTip,
            disabled: !addition,
            hidden: additionHidden
        };
        let _rowDeletion = rowDeletion;
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
                    <Form.Item label="additionHidden" {...itemLayout}>
                        <Switch
                            checked={additionHidden}
                            onChange={additionHidden => this.setState({ additionHidden })}
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

const columns = [
    {
        title: '名称',
        key: 'name',
        dataIndex: 'name',
        filter: {
            options: [
                { label: '1号', value: '1' },
                { label: '2号', value: '2' }
            ]
        },
        order: true
    },
    {
        title: '备注',
        key: 'remark',
        dataIndex: 'remark',
        filter: {
            options: [
                { label: '1号', value: '1' },
                { label: '2号', value: '2' }
            ]
        },
        order: true
    }
];
const dataSource = new Array(2).fill(null).map((v, i) => ({
    key: i,
    name: `名称 ${i}`,
    remark: '备注'
}));

const list = [
    { label: 'tip', props: { tip: '自定义提示', dataSource } },
    { label: 'disabledWithTip', props: { addition: false, tip: '自定义提示', dataSource } },
    { label: 'tip', props: { tip: '自定义提示' } },
    { label: 'disabledWithTip', props: { addition: false, tip: '自定义提示' } }
];
const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            <BaseDemo />
            {list.map(({ props }, i) => (
                <EditableTable columns={columns} {...props} key={i} columnPlaceholder zebraCrossing />
            ))}
        </Box>
    );
};

export default React.memo(Demo);
