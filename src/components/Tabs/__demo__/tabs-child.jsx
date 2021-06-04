import React from 'react';

import Tabs from 'src/components/Tabs';

// demo start
const { TabBarPositions } = Tabs;
const Demo = () => {
    return (
        <div>
            <div className="demo-wrap">
                <Tabs>
                    {[0, 1, 2, 3].map(i => (
                        <Tabs.Pane
                            key={i}
                            tab={`tab ${i}`}
                            style={{
                                padding: 16,
                                borderWidth: '0px 1px 1px 1px',
                                borderStyle: 'solid',
                                borderColor: '#ccc'
                            }}
                        >
                            <Tabs tabBarPosition={TabBarPositions[i]}>
                                {[1, 2, 3].map(i => (
                                    <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                                        Pane {i}
                                    </Tabs.Pane>
                                ))}
                            </Tabs>
                        </Tabs.Pane>
                    ))}
                </Tabs>
            </div>
            <div className="demo-wrap">
                <Tabs styleType="ink">
                    {[0, 1, 2, 3].map(i => (
                        <Tabs.Pane
                            key={i}
                            tab={`tab ${i}`}
                            style={{
                                padding: 16,
                                borderWidth: '0px 1px 1px 1px',
                                borderStyle: 'solid',
                                borderColor: '#ccc'
                            }}
                        >
                            <Tabs tabBarPosition={TabBarPositions[i]}>
                                {[1, 2, 3].map(i => (
                                    <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                                        Pane {i}
                                    </Tabs.Pane>
                                ))}
                            </Tabs>
                        </Tabs.Pane>
                    ))}
                </Tabs>
            </div>
            <div className="demo-wrap">
                <Tabs>
                    {[0, 1, 2, 3].map(i => (
                        <Tabs.Pane
                            key={i}
                            tab={`tab ${i}`}
                            style={{
                                padding: 16,
                                borderWidth: '0px 1px 1px 1px',
                                borderStyle: 'solid',
                                borderColor: '#ccc'
                            }}
                        >
                            <Tabs tabBarPosition={TabBarPositions[i]} styleType="ink">
                                {[1, 2, 3].map(i => (
                                    <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                                        Pane {i}
                                    </Tabs.Pane>
                                ))}
                            </Tabs>
                        </Tabs.Pane>
                    ))}
                </Tabs>
            </div>
        </div>
    );
};
// demo end

export default Demo;
