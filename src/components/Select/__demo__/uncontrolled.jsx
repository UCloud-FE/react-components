import React from 'react';
import Select from 'src/components/Select';

// demo start
const { Option } = Select;

class Demo extends React.Component {
    render() {
        return (
            <div>
                <Select defaultValue={1} onChange={v => console.log(v)}>
                    <Option value={1}>1</Option>
                    <Option value={'disable'} disabled>
                        disable
                    </Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                </Select>
            </div>
        );
    }
}
// demo end

export default Demo;
