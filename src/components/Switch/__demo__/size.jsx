import React from 'react';
import Switch from 'components/Switch';

// demo start
const { Sizes } = Switch;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Sizes.map(size => (
                    <div className="demo-wrap" key={size}>
                        <Switch size={size} />
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
