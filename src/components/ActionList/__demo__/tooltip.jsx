import React from 'react';

import ActionList from 'src/components/ActionList';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <ActionList
                        exposeCount={3}
                        actionList={[
                            {
                                label: 'Action 1',
                                styleType: 'primary'
                            },
                            {
                                label: 'Action 2',
                                disabled: true,
                                tooltip: '提示语，这个不能点了，balabalabalabala'
                            },
                            {
                                label: 'Action 3',
                                tooltip: '危险！谨慎操作'
                            },
                            {
                                label: 'Action 4',
                                disabled: true,
                                tooltip: '提示语，这个不能点了，balabalabalabala'
                            },
                            {
                                label: 'Action 5',
                                tooltip: '危险！谨慎操作'
                            },
                            {
                                label: 'Action 6',
                                tooltip: <span>node 类提示</span>
                            },
                            {
                                label: 'Action 7',
                                tooltip: {
                                    popup: '自定义提示',
                                    theme: 'dark'
                                }
                            }
                        ].map(i => ({ ...i, onClick: () => i.label }))}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
