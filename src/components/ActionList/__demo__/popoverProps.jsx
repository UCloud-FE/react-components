import React from 'react';

import ActionList from 'src/components/ActionList';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <div ref={_ref => (this.container = _ref)} />
                    <ActionList
                        exposeCount={1}
                        actionList={new Array(6).fill(null).map((v, i) => ({
                            label: `Action ${i}`,
                            onClick: e => console.log('action', i, e)
                        }))}
                        popoverProps={{
                            getPopupContainer: () => this.container,
                            animation: 'slide-up'
                        }}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
