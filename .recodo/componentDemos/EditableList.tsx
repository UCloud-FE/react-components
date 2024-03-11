// @ts-nocheck
import React from 'react';

import { EditableList, Form, Input, Radio, Switch } from '@ucloud-fe/react-components';
const Sizes = ['sm', 'md', 'lg'];
// demo start
const { defaultProps } = EditableList;

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
            itemDeletion: defaultProps.itemDeletion,
            randomRowDeletionDisable: false,
            dataSource: [],
            size: defaultProps.size
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
    renderItem(item) {
        const { size } = this.state;
        return <Input defaultValue={item.name} size={size} />;
    }

    getDisabledOfItem(record) {
        return record.key % 2;
    }
    render() {
        const { addition, itemDeletion, randomRowDeletionDisable, dataSource, grid, size } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        let _addition = addition,
            _itemDeletion = itemDeletion;
        if (addition) {
            _addition = {
                onAdd: () => this.onAdd()
            };
        }
        if (itemDeletion) {
            _itemDeletion = {
                onDelete: record => this.onDelete(record),
                getDisabledOfItem: randomRowDeletionDisable ? this.getDisabledOfItem : null
            };
        }

        return (
            <div>
                <Form className="demo-form" onSubmit={e => e.preventDefault()}>
                    <Form.Item label="addition" {...itemLayout}>
                        <Switch checked={addition} onChange={addition => this.setState({ addition })} />
                    </Form.Item>
                    <Form.Item label="itemDeletion" {...itemLayout}>
                        <Switch checked={itemDeletion} onChange={itemDeletion => this.setState({ itemDeletion })} />
                    </Form.Item>
                    <Form.Item label="itemDeletion.getDisabledOfItem" {...itemLayout}>
                        <Switch
                            checked={randomRowDeletionDisable}
                            onChange={randomRowDeletionDisable => this.setState({ randomRowDeletionDisable })}
                        />
                    </Form.Item>
                    <Form.Item label="grid" {...itemLayout}>
                        <Switch checked={grid} onChange={grid => this.setState({ grid })} />
                    </Form.Item>
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            options={Sizes.map(v => ({ value: v, lable: v }))}
                            onChange={size => this.setState({ size })}
                            value={size}
                        ></Radio.Group>
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <EditableList
                        {...{
                            addition: _addition,
                            itemDeletion: _itemDeletion,
                            grid: grid ? {} : null,
                            dataSource,
                            size,
                            renderItem: item => this.renderItem(item)
                        }}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
