import React from 'react';

import Tabs from 'src/components/Tabs';

// demo start
const Demo = () => {
    const tabs = [];
    tabs.length = 50;
    tabs.fill();
    return (
        <div>
            <div className="demo-wrap">
                <Tabs>
                    {tabs.map((t, i) => (
                        <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                            Pane {i}
                        </Tabs.Pane>
                    ))}
                </Tabs>
            </div>
            <div className="demo-wrap">
                <Tabs tabBarPosition="left" style={{ height: 300 }}>
                    {tabs.map((t, i) => (
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
