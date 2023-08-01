import React from 'react';

import Progress from 'src/components/Progress';
import Combine from 'src/components/Combine';

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Progress percent={40} />
                </div>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Progress percent={100} color="success" />
                </div>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Progress percent={20} color="warn" />
                </div>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Progress percent={50} color="error" />
                </div>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Progress percent={67} color="#411" />
                </div>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Combine>
                        <Progress percent={40} styleType="circle" style={{ width: 100 }} />
                        <Progress percent={100} color="success" styleType="circle" style={{ width: 100 }} />
                        <Progress percent={20} color="warn" styleType="circle" style={{ width: 100 }} />
                        <Progress percent={50} color="error" styleType="circle" style={{ width: 100 }} />
                        <Progress percent={67} color="#411" styleType="circle" style={{ width: 100 }} />
                    </Combine>
                </div>
            </div>
        );
    }
}

// demo end

export default Demo;
