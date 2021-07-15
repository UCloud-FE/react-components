import React from 'react';
import Select from 'src/components/Select';
import Radio from 'src/components/Radio';
import Switch from 'src/components/Switch';
import Input from 'src/components/Input';
import Form from 'src/components/Form';

// demo start
const { Option, Size } = Select;

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md',
            placeholder: 'placeholder',
            multiple: false,
            disabled: false,
            search: false
        };
    }
    render() {
        const { value, size, placeholder, multiple, showSelectAll, disabled, search } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
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
                    <Form.Item label="placeholder" {...itemLayout}>
                        <Input value={placeholder} onChange={e => this.setState({ placeholder: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="multiple" {...itemLayout}>
                        <Switch
                            value={multiple}
                            onChange={multiple => this.setState({ multiple, value: multiple ? [] : undefined })}
                        />
                    </Form.Item>
                    <Form.Item label="showSelectAll" {...itemLayout}>
                        <Switch value={showSelectAll} onChange={showSelectAll => this.setState({ showSelectAll })} />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch value={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="search" {...itemLayout}>
                        <Switch value={search} onChange={search => this.setState({ search })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Select
                        value={value}
                        size={size}
                        placeholder={placeholder}
                        multiple={multiple}
                        showSelectAll={showSelectAll}
                        disabled={disabled}
                        {...(search ? { search } : {})}
                        onChange={v => this.setState({ value: v })}
                    >
                        <Option value={1}>
                            <span>option 1</span>
                        </Option>
                        <Option value={'disable'} disabled>
                            disable
                        </Option>
                        <Option value={2}>
                            <span>option 2</span>
                        </Option>
                        <Option value={3}>
                            <span>option 3</span>
                        </Option>
                    </Select>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
