import React from 'react';
import Select from 'src/components/Select';

// demo start
const { Option } = Select;

class Demo extends React.Component {
    render() {
        const Size = Select.Size;
        return (
            <div>
                {Size.map(size => (
                    <div className="demo-wrap" key={size}>
                        <Select defaultValue={1} size={size}>
                            <Option value={1}>1</Option>
                            <Option value={2}>2</Option>
                            <Option value={3}>3</Option>
                        </Select>
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
