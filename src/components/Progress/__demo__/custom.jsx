import React from 'react';

import Progress from 'src/components/Progress';
import Tooltip from 'src/components/Tooltip';

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Progress percent={40} format={null} style={{ width: 100 }} />
                </div>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Tooltip
                        arrow={false}
                        placement="bottomRight"
                        popup={
                            <ul>
                                <li>提示文案</li>
                                <li>提示文案</li>
                                <li>提示文案</li>
                            </ul>
                        }
                    >
                        <Progress percent={40} format={null} style={{ width: 100 }} />
                    </Tooltip>
                </div>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Progress percent={40} format={null} style={{ width: 100 }} styleType="circle" />
                </div>
            </div>
        );
    }
}

// demo end

export default Demo;
