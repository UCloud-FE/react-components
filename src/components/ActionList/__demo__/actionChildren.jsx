import React from 'react';

import ActionList from 'src/components/ActionList';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <ActionList
                        actionList={new Array(6)
                            .fill(null)
                            .map((v, i) => ({
                                label: `Action ${i}`,
                                onClick: e => console.log('action', i, e)
                            }))
                            .concat({
                                label: `Parent`,
                                children: new Array(6).fill(null).map((v, i) => ({
                                    label: `Child Action ${i}`,
                                    onClick: e => console.log('action', i, e)
                                }))
                            })}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
