import React from 'react';

import Progress from 'src/components/Progress';

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
            </div>
        );
    }
}

// demo end

export default Demo;
