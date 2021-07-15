import React from 'react';
import Collapse from 'src/components/Collapse';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Collapse.Panel
                        title="Panel"
                        onChange={v => {
                            console.log(v);
                        }}
                        defaultOpen
                    >
                        Content
                    </Collapse.Panel>
                </div>
                <div className="demo-wrap">
                    <Collapse.Panel
                        title="Panel"
                        titlePosition="bottom"
                        onChange={v => {
                            console.log(v);
                        }}
                        defaultOpen
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
