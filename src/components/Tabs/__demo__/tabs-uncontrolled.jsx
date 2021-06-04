import React from 'react';

import Tabs from 'src/components/Tabs';

// demo start
const Demo = () => {
    return (
        <div>
            <div className="demo-wrap">
                <Tabs activeKey="2">
                    {[1, 2, 3].map(i => (
                        <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                            Pane {i}
                        </Tabs.Pane>
                    ))}
                </Tabs>
            </div>
            <div className="demo-wrap">
                <Tabs defaultActiveKey="2">
                    {[1, 2, 3].map(i => (
                        <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                            Pane {i}
                        </Tabs.Pane>
                    ))}
                </Tabs>
            </div>
        </div>
    );
};
// demo end

export default Demo;
