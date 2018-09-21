import React from 'react';
import Select from 'components/Select';

// demo start
const { Option } = Select;

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Select defaultValue={1} search>
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                    </Select>
                </div>
                <div className="demo-wrap">
                    <Select defaultValue={1} search={{ handleSearch: (s, v) => v < s }}>
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                    </Select>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
