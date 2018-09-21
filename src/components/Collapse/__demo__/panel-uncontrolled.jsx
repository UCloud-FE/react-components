import React from 'react';
import Collapse from 'components/Collapse';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Collapse.Panel
                        title="Panel"
                        defaultOpen
                        onChange={v => {
                            console.log(v);
                        }}
                    >
                        Content
                    </Collapse.Panel>
                </div>
                <div className="demo-wrap">
                    <Collapse.Panel
                        title="Panel"
                        open
                        onChange={v => {
                            console.log(v);
                        }}
                    >
                        Content
                    </Collapse.Panel>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
