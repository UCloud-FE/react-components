import React from 'react';

import demoUtil from 'tests/shared/demoUtil';
import AutoComplete from 'src/components/AutoComplete';
import Form from 'src/components/Form';
import Radio from 'src/components/Radio';
import Switch from 'src/components/Switch';

// demo start
const { formLayout, DemoWrap } = demoUtil;
const options = new Array(100).fill(null).map((v, i) => ({ value: `Item ${i}` }));
class Demo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            handleSearch: 'default',
            disabled: false
        };
    }
    render() {
        const { handleSearch, disabled, loading } = this.state;
        const props = {
            disabled,
            loading
        };
        if (handleSearch === 'false') {
            props.handleSearch = false;
        } else if (handleSearch === 'custom') {
            props.handleSearch = (item, searchValue) => {
                return item.value.toUpperCase().indexOf(searchValue.toUpperCase()) >= 0;
            };
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
