import React from 'react';

import Tabs from 'src/components/Tabs';

// demo start
const Demo = () => {
    return (
        <div>
            <Tabs>
                {[1, 2, 3].map(i => (
                    <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                        Pane {i}
                    </Tabs.Pane>
                ))}
            </Tabs>
            <Tabs defaultActiveKey="1">
                {[1, 2, 3].map(i => (
                    <Tabs.Pane key={i} tab={`tab ${i}`} disabled style={{ padding: 16 }}>
                        Pane {i}
                    </Tabs.Pane>
                ))}
            </Tabs>
        </div>
    );
};
// demo end

export default Demo;
