import React from 'react';
import Collapse from 'components/Collapse';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <Collapse.Panel
                    title="Panel"
                    disabled
                    onChange={v => {
                        console.log(v);
                    }}
                >
                    Content
                </Collapse.Panel>
            </div>
        );
    }
}
// demo end

export default Demo;
