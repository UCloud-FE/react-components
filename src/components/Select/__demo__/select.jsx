import React from 'react';

import Select from 'src/components/Select';
import Radio from 'src/components/Radio';
import Switch from 'src/components/Switch';
import Input from 'src/components/Input';
import Form from 'src/components/Form';

// demo start
const { Option, Size } = Select;

const simpleOptions = new Array(100).fill(null).map((v, i) => ({ key: i, value: `option-${i}` }));
const labelOptions = new Array(100).fill(null).map((v, i) => ({ key: i, value: `option-${i}`, label: `label ${i}` }));
const spanLabelOptions = new Array(100)
    .fill(null)
    .map((v, i) => ({ key: i, value: `option-${i}`, label: <span style={{ color: 'red' }}>{`label ${i}`}</span> }));
const childrenOptions = new Array(100).fill(null).map((v, i) => (
    <Option value={i} key={i}>
        The option {i}
    </Option>
));

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md',
            placeholder: 'placeholder',
            multiple: true,
            showSelectAll: true,
            disabled: false,
            search: false,
            block: false,
            optionType: 'simple',
            width: 'default',
            styleType: 'default',
            error: 'default'
        };
    }
    render() {
        const {
            value,
            size,
            placeholder,
            multiple,
            showSelectAll,
            disabled,
            search,
            optionType,
            width,
            clearable,
            block,
            styleType,
            error
        } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const optionProps =
            optionType === 'simple'
                ? { options: simpleOptions }
                : optionType === 'label'
                ? { options: labelOptions }
                : optionType === 'spanLabel'
                ? { options: spanLabelOptions }
                : optionType === 'empty'
                ? {}
                : { children: childrenOptions };

        const widthProps = width === 'width: 500px' ? { style: { width: '500px' } } : {};
        const props = {};
        if (styleType !== 'default') {
            props.styleType = styleType;
        }
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            value={size}
                            onChange={size => this.setState({ size })}
                            options={Size.map(size => ({ value: size }))}
                        />
                    </Form.Item>
                    <Form.Item label="option type" {...itemLayout}>
                        <Radio.Group
                            value={optionType}
                            onChange={optionType => this.setState({ optionType })}
                            options={['simple', 'label', 'spanLabel', 'children', 'empty'].map(type => ({
                                value: type
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="width" {...itemLayout}>
                        <Radio.Group
                            value={width}
                            onChange={width => this.setState({ width })}
                            options={['default', 'width: 500px'].map(v => ({ value: v }))}
                        />
                    </Form.Item>
                    <Form.Item label="styleType" {...itemLayout}>
                        <Radio.Group
                            value={styleType}
                            onChange={styleType => this.setState({ styleType })}
                            options={['default', 'list'].map(v => ({ value: v }))}
                        />
                    </Form.Item>
                    <Form.Item label="placeholder" {...itemLayout}>
                        <Input value={placeholder} onChange={e => this.setState({ placeholder: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="multiple" {...itemLayout}>
                        <Switch
                            checked={multiple}
                            onChange={multiple => this.setState({ multiple, value: multiple ? [] : undefined })}
                        />
                    </Form.Item>
                    <Form.Item label="showSelectAll" {...itemLayout}>
                        <Switch checked={showSelectAll} onChange={showSelectAll => this.setState({ showSelectAll })} />
                    </Form.Item>
                    <Form.Item label="block" {...itemLayout}>
                        <Switch checked={block} onChange={block => this.setState({ block })} />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="search" {...itemLayout}>
                        <Switch checked={search} onChange={search => this.setState({ search })} />
                    </Form.Item>
                    <Form.Item label="clearable" {...itemLayout}>
                        <Switch checked={clearable} onChange={clearable => this.setState({ clearable })} />
                    </Form.Item>
                    <Form.Item label="status-error" {...itemLayout}>
                        <Switch
                            checked={error === 'default' ? false : true}
                            onChange={error => this.setState({ error: error ? 'error' : 'default' })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Select
                        value={value}
                        onChange={v => this.setState({ value: v })}
                        size={size}
                        placeholder={placeholder}
                        multiple={multiple}
                        showSelectAll={showSelectAll}
                        disabled={disabled}
                        clearable={clearable}
                        block={block}
                        status={error}
                        {...widthProps}
                        {...optionProps}
                        {...(search ? { search } : {})}
                        {...props}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
