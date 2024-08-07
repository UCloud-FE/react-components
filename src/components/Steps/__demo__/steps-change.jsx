import React from 'react';

import Steps from 'src/components/Steps';

// demo start

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 2,
            current1: 2,
            current2: 2,
            current3: 2,
            current4: 1,
            current5: 3
        };
    }
    render() {
        const { current, current1, current2, current3, current4, current5 } = this.state;

        return (
            <div>
                <div className="demo-wrap">
                    <Steps
                        current={current}
                        onChange={current => {
                            this.setState({ current: current });
                        }}
                        steps={new Array(5).fill(null).map((v, i) => ({ title: 'content', remark: 'This is remark' }))}
                    />
                </div>
                <div className="demo-wrap">
                    <Steps
                        direction="vertical"
                        current={current1}
                        onChange={current => {
                            this.setState({ current1: current });
                        }}
                        steps={new Array(5).fill(null).map((v, i) => ({ title: 'content', remark: 'This is remark' }))}
                    />
                </div>
                <div className="demo-wrap">
                    <Steps
                        direction="vertical"
                        current={current2}
                        onChange={current => {
                            this.setState({ current2: current });
                        }}
                        steps={new Array(5).fill(null).map((v, i) => ({
                            title: 'content is disabled',
                            status: i > 2 ? 'disabled' : '',
                            remark: 'This is remark'
                        }))}
                    />
                </div>
                <div className="demo-wrap">
                    <Steps
                        direction="vertical"
                        current={current3}
                        onChange={(current3, status) => {
                            if (status == 'error') {
                                return;
                            }
                            this.setState({ current3: current3 });
                        }}
                        steps={new Array(5).fill(null).map((v, i) => ({
                            title: 'content is error',
                            status: i > 2 ? 'error' : '',
                            remark: 'This is remark'
                        }))}
                    />
                </div>
                <div className="demo-wrap">
                    <Steps
                        direction="vertical"
                        current={current4}
                        onChange={current4 => {
                            this.setState({ current4: current4 });
                        }}
                        steps={new Array(5).fill(null).map((v, i) => ({
                            title: 'content is error',
                            status: i > 2 ? 'success' : '',
                            remark: 'This is remark'
                        }))}
                    />
                </div>
                <div className="demo-wrap">
                    <Steps
                        direction="vertical"
                        current={current5}
                        onChange={current5 => {
                            this.setState({ current5: current5 });
                        }}
                        steps={new Array(5).fill(null).map((v, i) => ({
                            title: 'content is error',
                            status: 'normal',
                            remark: 'This is remark'
                        }))}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
