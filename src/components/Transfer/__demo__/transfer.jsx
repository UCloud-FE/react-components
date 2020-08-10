import React from 'react';

import Switch from 'src/components/Switch';
import Form from 'src/components/Form';
import Menu from 'src/components/Menu';
import Transfer from 'src/components/Transfer';
import Combine from 'src/components/Combine';
import Button from 'src/components/Button';
import Radio from 'src/components/Radio';
import Checkbox from 'src/components/Radio';

// demo start
const { defaultProps } = Transfer;

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

const dataSource = new Array(100).fill(null).map((v, i) => ({
    key: i,
    label: `item-${i}`
}));

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: defaultProps.search,
            disabled: defaultProps.disabled,
            sourceSearch: 'default',
            sourceDisabled: 'default',
            sourceTitle: 'default',
            sourceFooter: false,
            targetSearch: 'default',
            targetDisabled: 'default',
            targetTitle: 'default',
            targetFooter: false
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
        const {
            search,
            disabled,
            sourceSearch,
            sourceDisabled,
            sourceTitle,
            sourceFooter,
            targetSearch,
            targetDisabled,
            targetTitle,
            targetFooter
        } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const source = {},
            target = {};

        if (sourceSearch !== 'default') {
            source.search = sourceSearch;
        }
        if (sourceDisabled != 'default') {
            source.disabled = sourceDisabled;
        }
        if (sourceTitle === null) {
            source.title = null;
        } else if (sourceTitle === 'custom') {
            source.title = <span>Custom Source Title</span>;
        }
        if (sourceFooter) {
            source.footer = (
                <Combine style={{ float: 'right' }}>
                    <Button disabled={sourceDisabled === 'default' ? disabled : sourceDisabled}>按钮 1</Button>
                    <Button disabled={sourceDisabled === 'default' ? disabled : sourceDisabled}>按钮 2</Button>
                </Combine>
            );
        }
        if (targetSearch !== 'default') {
            target.search = targetSearch;
        }
        if (targetDisabled != 'default') {
            target.disabled = targetDisabled;
        }
        if (targetTitle === null) {
            target.title = null;
        } else if (targetTitle === 'custom') {
            target.title = <span>Custom Target Title</span>;
        }
        if (targetFooter) {
            target.footer = (
                <Combine style={{ float: 'right' }}>
                    <Button disabled={targetDisabled === 'default' ? disabled : targetDisabled}>按钮 3</Button>
                    <Button disabled={targetDisabled === 'default' ? disabled : targetDisabled}>按钮 4</Button>
                </Combine>
            );
        }
        const props = {
            source,
            target,
            disabled,
            search,
            dataSource
        };

        return (
            <div>
                <Form className="demo-form" onSubmit={e => e.preventDefault()}>
                    <Form.Item label="search" {...itemLayout}>
                        <Switch checked={search} onChange={search => this.setState({ search })} />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="source.search" {...itemLayout}>
                        <Radio.Group
                            options={['default', true, false].map(v => ({ value: v, label: v + '' }))}
                            value={sourceSearch}
                            onChange={sourceSearch =>
                                this.setState({
                                    sourceSearch
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="source.disabled" {...itemLayout}>
                        <Radio.Group
                            options={['default', true, false].map(v => ({ value: v, label: v + '' }))}
                            value={sourceDisabled}
                            onChange={sourceDisabled => this.setState({ sourceDisabled })}
                        />
                    </Form.Item>
                    <Form.Item label="source.title" {...itemLayout}>
                        <Radio.Group
                            options={['default', null, 'custom'].map(v => ({ value: v, label: v + '' }))}
                            value={sourceTitle}
                            onChange={sourceTitle => this.setState({ sourceTitle })}
                        />
                    </Form.Item>
                    <Form.Item label="source.footer" {...itemLayout}>
                        <Switch
                            checked={sourceFooter}
                            value={sourceFooter}
                            onChange={sourceFooter => this.setState({ sourceFooter })}
                        />
                    </Form.Item>
                    <Form.Item label="target.search" {...itemLayout}>
                        <Radio.Group
                            options={['default', true, false].map(v => ({ value: v, label: v + '' }))}
                            value={targetSearch}
                            onChange={targetSearch =>
                                this.setState({
                                    targetSearch
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="target.disabled" {...itemLayout}>
                        <Radio.Group
                            options={['default', true, false].map(v => ({ value: v, label: v + '' }))}
                            value={targetDisabled}
                            onChange={targetDisabled => this.setState({ targetDisabled })}
                        />
                    </Form.Item>
                    <Form.Item label="target.title" {...itemLayout}>
                        <Radio.Group
                            options={['default', null, 'custom'].map(v => ({ value: v, label: v + '' }))}
                            value={targetTitle}
                            onChange={targetTitle => this.setState({ targetTitle })}
                        />
                    </Form.Item>
                    <Form.Item label="target.footer" {...itemLayout}>
                        <Switch
                            checked={targetFooter}
                            value={targetFooter}
                            onChange={targetFooter => this.setState({ targetFooter })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Transfer
                        {...props}
                        renderList={({ dataSource, selectedKeys, onChange, disabled }) => {
                            return (
                                <div style={{ padding: '12px', height: '300px', overflow: 'auto' }}>
                                    <Checkbox.Group value={selectedKeys} onChange={onChange} disabled={disabled}>
                                        {dataSource.map(v => (
                                            <div key={v.key}>
                                                <Checkbox value={v.key}>{v.label}</Checkbox>
                                            </div>
                                        ))}
                                    </Checkbox.Group>
                                </div>
                            );
                        }}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
