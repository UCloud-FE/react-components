import React from 'react';
import Select from 'src/components/Select';

// demo start
const { Option } = Select;

class Demo extends React.Component {
    render() {
        const animations = ['fade', 'zoom', 'bounce', 'slide-up'];
        return (
            <div>
                {animations.map(animation => (
                    <div className="demo-wrap" key={animation}>
                        <Select defaultValue={1} popoverProps={{ animation }}>
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
