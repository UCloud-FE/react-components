import React from 'react';
import NumberInput from 'src/components/NumberInput';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <NumberInput
                        defaultValue={2}
                        onChange={(...args) => console.log('onChange:', ...args)}
                        onNumberChange={(...args) => console.log('onNumberChange:', ...args)}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
