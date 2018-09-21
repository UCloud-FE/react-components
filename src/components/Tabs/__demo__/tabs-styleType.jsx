import React from 'react';
import Tabs from 'components/Tabs';

// demo start
const { StyleType } = Tabs;
const Demo = () => {
    return (
        <div>
            {StyleType.map(styleType => (
                <div className="demo-wrap" key={styleType}>
                    <Tabs styleType={styleType}>
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
