import React from 'react';
import Input from 'src/components/Input';

// demo start
const IconType = ['circle-fill', 'circle', 'loading'];
class Demo extends React.Component {
    render() {
        return (
            <div>
                {IconType.map(icon => (
                    <div className="demo-wrap" key={icon}>
                        <Input icon={icon} />
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
