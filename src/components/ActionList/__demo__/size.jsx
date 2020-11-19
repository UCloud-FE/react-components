import React from 'react';

import ActionList from 'src/components/ActionList';

// demo start
const { Size } = ActionList;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Size.map(size => (
                    <div className="demo-wrap" key={size}>
                        <ActionList
                            size={size}
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
