import React from 'react';
import Select from 'components/Select';
import Radio from 'components/Radio';

// demo start
const { Option, Group, Size } = Select;

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
                        <Option value={'disable'} disabled>
                            disable
                        </Option>
                        <Option value={2}>2</Option>
                    </Group>
                    <Option value={3}>3</Option>
                </Select>
            </div>
        );
    }
}
// demo end

export default Demo;
