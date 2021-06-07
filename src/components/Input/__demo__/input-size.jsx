import React from 'react';

import Input from 'src/components/Input';

// demo start
const { Sizes } = Input;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Sizes.map(size => (
                    <div className="demo-wrap" key={size}>
                        <Input size={size} />
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
