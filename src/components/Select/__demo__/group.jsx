import React from 'react';
import Select from 'src/components/Select';
import Button from 'src/components/Button';

// demo start
const { Option, Group, Extra } = Select;

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 2,
            size: 'md'
        };
    }
    render() {
        const { value, size } = this.state;
        return (
            <div>
                <Select value={value} size={size} onChange={v => this.setState({ value: v })} search>
                    <Group title="组">
                        <Option value={1}>1</Option>
                        <Extra>
                            <span style={{ padding: '0 8px' }}>插入一段文案</span>
                        </Extra>
                        <Option value={'disable'} disabled>
                            disable
                        </Option>
                        <Option value={2}>2</Option>
                    </Group>
                    <Extra>
                        <span style={{ padding: '0 8px' }}>插入一段文案</span>
                    </Extra>
                    <Option value={3}>3</Option>
                    <Extra>
                        <Button style={{ width: '100%' }} styleType="primary" onClick={() => console.log(123)}>
                            插入按钮
                        </Button>
                    </Extra>
                </Select>
            </div>
        );
    }
}
// demo end

export default Demo;
