import React from 'react';

import Steps from 'src/components/Steps';

// demo start
const { Status } = Steps;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Status.map(status => (
                    <div className="demo-wrap" key={status}>
                        <Steps
                            current={2}
                            status={status}
                            steps={new Array(5).fill(null).map(() => ({ title: 'content', remark: 'This is remark' }))}
                        />
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
