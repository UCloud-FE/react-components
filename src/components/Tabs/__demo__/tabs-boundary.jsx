import React from 'react';

import Tabs from 'src/components/Tabs';

// demo start
const Lazy = React.lazy(
    () =>
        new Promise(resolve => {
            setTimeout(() => resolve({ default: () => <div>remote</div> }), 1000);
        })
);
const Demo = () => {
    return (
        <div className="demo-wrap">
            <React.Suspense fallback="loading">
                <Tabs styleType="ink" defaultActiveKey="2">
                    {[1, 2, 3].map(i => (
                        <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                            Pane {i}
                        </Tabs.Pane>
                    ))}
                </Tabs>
                <Lazy />
            </React.Suspense>
            <Tabs styleType="ink" defaultActiveKey="2">
                {[1, 2, 3].map(i => (
                    // eslint-disable-next-line react/jsx-key
                    <Tabs.Pane tabKey={i + ''} tab={`tab ${i}`} style={{ padding: 16 }}>
                        Pane {i}
                    </Tabs.Pane>
                ))}
            </Tabs>
        </div>
    );
};
// demo end

export default Demo;
