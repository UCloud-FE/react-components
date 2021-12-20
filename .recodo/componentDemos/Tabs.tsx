import React from 'react';
import { Tabs, TabsProps, Box } from '@ucloud-fe/react-components';

const styleTypes: TabsProps['styleType'][] = ['ink', 'default'];
const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            {styleTypes.map(styleType => (
                <div key={styleType}>
                    <Tabs styleType={styleType}>
                        {[1, 2, 3].map(i => (
                            <Tabs.Pane key={i} tab={`切换面板 ${i}`} style={{ padding: 16 }}>
                                面板 {i}
                            </Tabs.Pane>
                        ))}
                    </Tabs>
                </div>
            ))}
        </Box>
    );
};

export default React.memo(Demo);
