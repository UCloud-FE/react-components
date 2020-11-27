import React from 'react';

import ActionList from 'src/components/ActionList';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                {[0, 4, 5].map(count => (
                    <div className="demo-wrap" key={count}>
                        <ActionList
                            exposeCount={count}
                            actionList={new Array(6).fill(null).map((v, i) => ({
                                label: `Action ${i}`,
                                onClick: e => console.log('action', i, e)
                            }))}
                        />
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
