import React from 'react';

import ActionList from 'src/components/ActionList';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <ActionList
                        actionList={new Array(6).fill(null).map((v, i) => ({
                            label: `Action ${i}`,
                            onClick: e => console.log('action', i, e)
                        }))}
                        dropdownButton="更多"
                    />
                </div>
                <div className="demo-wrap">
                    <ActionList
                        actionList={new Array(6).fill(null).map((v, i) => ({
                            label: `Action ${i}`,
                            onClick: e => console.log('action', i, e)
                        }))}
                        dropdownButton={{
                            styleType: 'primary',
                            children: '更多'
                        }}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
