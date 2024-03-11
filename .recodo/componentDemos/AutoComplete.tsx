// @ts-nocheck
import { AutoComplete, Box, Form, Icon, Radio, Switch } from '@ucloud-fe/react-components';
import React from 'react';
const formLayout = {
    labelCol: {
        span: 3
    },
    controllerCol: {
        span: 9
    }
};
// demo start

const options = new Array(100).fill(null).map((v, i) => ({ value: `Item ${i}` }));
class BaseDemo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            handleSearch: 'default',
            disabled: false
        };
    }
    render() {
        const { handleSearch, disabled, loading, prefix, block } = this.state;
        const props = {
            disabled,
            loading,
            block
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
                    <Form.Item label="handleSearch">
                        <Radio.Group
                            value={handleSearch}
                            onChange={handleSearch => this.setState({ handleSearch })}
                            options={['default', 'false', 'custom'].map(v => ({ value: v }))}
                        />
                    </Form.Item>
                </Form>

                <AutoComplete options={options} onChange={console.log} {...props} />
            </div>
        );
    }
}
// demo end

const Demo = () => {
    const list = [{ props: { disabled: false } }, { props: { disabled: true } }, { props: { loading: true } }];

    return (
        <Box container direction="column" spacing="lg">
            {list.map(({ props }) => (
                <AutoComplete {...props} status="default" />
            ))}
            <BaseDemo />
        </Box>
    );
};

export default React.memo(Demo);
