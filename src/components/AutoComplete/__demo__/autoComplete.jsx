import React from 'react';

import demoUtil from 'shared/demoUtil';
import AutoComplete from 'src/components/AutoComplete';
import Form from 'src/components/Form';
import Radio from 'src/components/Radio';
import Switch from 'src/components/Switch';
import Icon from 'src/components/Icon';

// demo start
const { formLayout, DemoWrap } = demoUtil;
const options = new Array(100).fill(null).map((v, i) => ({ value: `Item ${i}` }));
class Demo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md',
            handleSearch: 'default',
            disabled: false
        };
    }
    render() {
        const { handleSearch, disabled, loading, prefix, block, size } = this.state;
        const props = {
            disabled,
            loading,
            block,
            size
        };
        if (handleSearch === 'false') {
            props.handleSearch = false;
        } else if (handleSearch === 'custom') {
            props.handleSearch = (item, searchValue) => {
                return item.value.toUpperCase().indexOf(searchValue.toUpperCase()) >= 0;
            };
        }
        if (prefix) {
            props.prefix = <Icon type="circle" />;
        }
        return (
            <div>
                <Form className="demo-form" itemProps={{ ...formLayout }}>
                    <Form.Item label="disabled">
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="loading">
                        <Switch checked={loading} onChange={loading => this.setState({ loading })} />
                    </Form.Item>
                    <Form.Item label="block">
                        <Switch checked={block} onChange={block => this.setState({ block })} />
                    </Form.Item>
                    <Form.Item label="prefix">
                        <Switch checked={prefix} onChange={prefix => this.setState({ prefix })} />
                    </Form.Item>
                    <Form.Item label="size">
                        <Radio.Group
                            value={size}
                            onChange={size => this.setState({ size })}
                            options={['sm', 'md', 'lg'].map(v => ({ value: v }))}
                        />
                    </Form.Item>
                    <Form.Item label="handleSearch">
                        <Radio.Group
                            value={handleSearch}
                            onChange={handleSearch => this.setState({ handleSearch })}
                            options={['default', 'false', 'custom'].map(v => ({ value: v }))}
                        />
                    </Form.Item>
                </Form>
                <DemoWrap>
                    <AutoComplete options={options} onChange={console.log} {...props} />
                </DemoWrap>
            </div>
        );
    }
}
// demo end

export default Demo;
