import React from 'react';

import ActionList from 'src/components/ActionList';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <ActionList
                        exposeCount={5}
                        actionList={new Array(6).fill(null).map((v, i) => ({
                            label: `Action ${i}`,
                            onClick: e => console.log('action', i, e)
                        }))}
                    />
                </div>
                <div className="demo-wrap">
                    <ActionList
                        smart={false}
                        exposeCount={5}
                        actionList={new Array(6).fill(null).map((v, i) => ({
                            label: `Action ${i}`,
                            onClick: e => console.log('action', i, e)
                        }))}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
