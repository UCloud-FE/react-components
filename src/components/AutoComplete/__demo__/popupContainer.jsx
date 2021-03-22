import React from 'react';

import Card from 'src/components/Card';
import AutoComplete from 'src/components/AutoComplete';

// demo start
const options = new Array(100).fill(null).map((v, i) => ({ value: `Item ${i}` }));

const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Card>
                <Card.Content>
                    <div style={{ position: 'relative' }}>
                        <AutoComplete options={options} onChange={console.log} defaultValue={'Item'} />
                    </div>
                </Card.Content>
            </Card>
        </div>
    </div>
);
// demo end

export default Demo;
