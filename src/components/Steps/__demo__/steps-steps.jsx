import React from 'react';

import Steps from 'src/components/Steps';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Steps
                        current={'fourth'}
                        steps={new Array(5)
                            .fill(null)
                            .map((v, i) => ({ key: ['first', 'second', 'third', 'fourth', 'fifth'][i] }))}
                    />
                </div>
                <div className="demo-wrap">
                    <Steps
                        current={2}
                        steps={new Array(5).fill(null).map((v, i) => ({ step: ['一', '二', '三', '四', '五'][i] }))}
                    />
                </div>
                <div className="demo-wrap">
                    <Steps current={2} steps={new Array(5).fill(null).map((v, i) => ({ title: 'content' }))} />
                </div>
                <div className="demo-wrap">
                    <Steps
                        current={2}
                        steps={new Array(5).fill(null).map((v, i) => ({ title: 'content', remark: 'This is remark' }))}
                    />
                </div>
                <div className="demo-wrap">
                    <Steps
                        current={2}
                        nowrap={true}
                        steps={new Array(5).fill(null).map((v, i) => ({ title: 'content', remark: 'This is remark' }))}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
