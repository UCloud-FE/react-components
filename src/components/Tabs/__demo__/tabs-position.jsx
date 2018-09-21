import React from 'react';
import Tabs from 'components/Tabs';

// demo start
const { Position } = Tabs;
const Demo = () => {
    return (
        <div>
            {Position.map(position => (
                <div className="demo-wrap" key={position}>
                    <Tabs tabBarPosition={position}>
                        {[1, 2, 3].map(i => (
                            <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                                Pane {i}
                            </Tabs.Pane>
                        ))}
                    </Tabs>
                </div>
            ))}
        </div>
    );
};
// demo end

export default Demo;
