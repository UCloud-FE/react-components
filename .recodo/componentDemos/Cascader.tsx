// @ts-nocheck
import { Box, Button, Cascader, Form, Radio, Switch } from '@ucloud-fe/react-components';
import React from 'react';
const formLayout = {
    labelCol: {
        span: 3
    },
    controllerCol: {
        span: 9
    }
};
const Sizes = ['sm', 'md', 'lg'];
const defaultSize = 'md';
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

class BaseDemo extends React.PureComponent {
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

                <Cascader {...this.state} onChange={console.log} />
            </div>
        );
    }
}
// demo end

const Demo = () => {
    const generateNumber = (min: number, max: number) => {
        const random = Math.random();
        return (min + random * (max + 1 - min)) | 0;
    };

    const generateItems = (count: number, prefix: string, depth?: number) => {
        return new Array(count).fill(null).map((v, i) => {
            const key = `${prefix}-${i}-item`;
            let subItems: {
                key: string;
                title: string;
                disabled: boolean;
            }[] = [];
            if (depth) {
                subItems = generateItems(generateNumber(0, 5), key, depth - 1);
            }
            const item = {
                key: key,
                title: ' ✨ ' + key,
                disabled: Math.random() > 0.8,
                children: undefined as { key: string; title: string; disabled: boolean }[] | undefined
            };
            if (subItems.length) {
                item.children = subItems;
            }
            return item;
        });
    };

    const generateGroupData = (depth: number, prefix: string) => {
        const itemCount = generateNumber(1, 5);
        const menuItems = generateItems(itemCount, prefix, depth);
        return menuItems;
    };

    const _dataSource = generateGroupData(generateNumber(2, 6), 'root');

    const list = [
        { props: { size: 'sm' as 'sm' | 'md' | 'lg' } },
        { props: { size: 'md' as 'sm' | 'md' | 'lg' } },
        { props: { size: 'lg' as 'sm' | 'md' | 'lg' } },
        { props: { disabled: true } },
        { props: { clearable: true } }
    ];

    return (
        <Box container direction="column" spacing="lg">
            {list.map(({ props }) => (
                <Cascader {...props} dataSource={_dataSource} />
            ))}
            <Form.Group>
                <BaseDemo />
            </Form.Group>
        </Box>
    );
};

export default React.memo(Demo);
