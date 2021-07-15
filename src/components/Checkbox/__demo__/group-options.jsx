import React from 'react';
import Checkbox from 'src/components/Checkbox';

// demo start
const options = [1, 2, 3];
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Checkbox.Group options={options.map(v => ({ value: v, label: `option-${v}` }))} />
                </div>
                <div className="demo-wrap">
                    <Checkbox.Group>
                        {options.map(v => (
                            <Checkbox key={v} value={v}>
                                checkbox-{v}
                            </Checkbox>
                        ))}
                    </Checkbox.Group>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
