import React from 'react';
import Select from 'src/components/Select';

// demo start
const { Option } = Select;

class Demo extends React.Component {
    render() {
        const placements = ['bottomLeft', 'leftTop', 'topRight'];
        return (
            <div>
                {placements.map(placement => (
                    <div className="demo-wrap" key={placement}>
                        <Select defaultValue={1} popoverProps={{ placement }}>
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
