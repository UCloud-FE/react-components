import React from 'react';
import Input from 'components/Input';

// demo start
const { Status } = Input;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Status.map(status => (
                    <div className="demo-wrap" key={status}>
                        <Input status={status} />
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
