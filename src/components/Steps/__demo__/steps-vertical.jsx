import React from 'react';

import Steps from 'src/components/Steps';

// demo start
const steps = new Array(5).fill(null).map(() => ({ title: 'content', remark: 'This is remark' }));
class Demo extends React.Component {
    render() {
        return (
            <div>
                {steps.map((step, i) => (
                    <div className="demo-wrap" key={i}>
                        <Steps direction="vertical" current={i} steps={steps} />
                    </div>
                ))}
                <div className="demo-wrap">
                    <Steps direction="vertical" steps={steps} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
