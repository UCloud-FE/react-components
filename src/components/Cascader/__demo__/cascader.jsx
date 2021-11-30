import React from 'react';

import Cascader from 'src/components/Cascader';
import Switch from 'src/components/Switch';
import Form from 'src/components/Form';
import Button from 'src/components/Button';
import Radio from 'src/components/Radio';
import demoUtil from 'shared/demoUtil';

// demo start
const generateNumber = (min, max) => {
    const random = Math.random();
    return (min + random * (max + 1 - min)) | 0;
};

const generateItems = (count, prefix, depth) => {
    return new Array(count).fill(null).map((v, i) => {
        const key = `${prefix}-${i}-item`;
        let subItems = [];
        if (depth) {
            subItems = generateItems(generateNumber(0, 5), key, depth - 1);
        }
        const item = {
            key: key,
            title: ' ✨ ' + key,
            disabled: Math.random() > 0.8
        };
        if (subItems.length) {
            item.children = subItems;
        }
        return item;
    });
};

const generateGroupData = (depth, prefix) => {
    const itemCount = generateNumber(1, 5);
    const menuItems = generateItems(itemCount, prefix, depth);
    return menuItems;
};

const _dataSource = generateGroupData(generateNumber(2, 6), 'root');

const { formLayout, DemoWrap, Sizes, defaultSize } = demoUtil;
class Demo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            multiple: false,
            disabled: false,
            clearable: false,
            dataSource: _dataSource,
            size: defaultSize
        };
    }
    refresh() {
        this.setState({ dataSource: generateGroupData(generateNumber(2, 6), 'root') });
    }
    render() {
        const { disabled, search, clearable, size } = this.state;
        return (
            <div>
                <Form className="demo-form" itemProps={{ ...formLayout }}>
                    <Form.Item label="disabled">
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="search">
                        <Switch checked={search} onChange={search => this.setState({ search })} />
                    </Form.Item>
                    <Form.Item label="clearable">
                        <Switch checked={clearable} onChange={clearable => this.setState({ clearable })} />
                    </Form.Item>
                    <Form.Item label="size">
                        <Radio.Group
                            value={size}
                            onChange={size => this.setState({ size })}
                            options={Sizes.map(size => ({
                                value: size
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="random">
                        <Button onClick={() => this.refresh()}>Refresh</Button>
                    </Form.Item>
                </Form>
                <DemoWrap>
                    <Cascader {...this.state} onChange={console.log} />
                </DemoWrap>
            </div>
        );
    }
}
// demo end

export default Demo;
