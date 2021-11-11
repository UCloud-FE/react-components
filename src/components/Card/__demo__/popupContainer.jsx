import React from 'react';

import Card from 'src/components/Card';
import Popover from 'src/components/Popover';
import Select from 'src/components/Select';
import DatePicker from 'src/components/DatePicker';

// demo start
const Demo = () => (
    <div>
        <h3>Card 提供了内置的 getPopupContainer</h3>
        <div className="demo-wrap">
            <Card>
                <Card.Content>
                    <div style={{ position: 'relative' }}>
                        <Popover
                            forwardPopupContainer
                            popup={
                                <div style={{ background: '#ccc', width: 300, height: 300, padding: 20 }}>
                                    This is the popup
                                </div>
                            }
                        >
                            <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
                        </Popover>
                    </div>
                </Card.Content>
            </Card>
        </div>
        <div className="demo-wrap">
            <Card>
                <Card.Content>
                    <div style={{ position: 'relative' }}>
                        <Select
                            options={new Array(100).fill(null).map((v, i) => ({ value: i, label: `option-${i}` }))}
                        />
                    </div>
                </Card.Content>
            </Card>
        </div>
        <div className="demo-wrap">
            <Card>
                <Card.Content>
                    <div style={{ position: 'relative' }}>
                        <DatePicker />
                    </div>
                </Card.Content>
            </Card>
        </div>
        <div className="demo-wrap">
            <Card>
                <Card.Content>
                    <div style={{ position: 'relative' }}>
                        <DatePicker type="month" />
                    </div>
                </Card.Content>
            </Card>
        </div>
    </div>
);
// demo end

export default Demo;
