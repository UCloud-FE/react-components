import React from 'react';
import Checkbox from 'src/components/Checkbox';

// demo start
const options = [1, 2, 3];
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Checkbox.Group onChange={console.log} value={[2, 3]} options={options.map(v => ({ value: v }))} />
                </div>
                <div className="demo-wrap">
                    <Checkbox.Group
                        onChange={console.log}
                        defaultValue={[1, 3]}
                        options={options.map(v => ({ value: v }))}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
