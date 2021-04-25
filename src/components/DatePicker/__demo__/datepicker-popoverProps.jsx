import React from 'react';

import DatePicker from 'src/components/DatePicker';
import Modal from 'src/components/Modal';
import Button from 'src/components/Button';

// demo start
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Button
                onClick={() => {
                    Modal.confirm(
                        {
                            title: 'datePicker'
                        },
                        <div style={{ padding: 24 }}>
                            <DatePicker onChange={v => console.log(v.format())} />
                        </div>
                    );
                }}
            >
                default
            </Button>
            <Button
                onClick={() => {
                    Modal.confirm(
                        {
                            title: 'datePicker'
                        },
                        <div style={{ padding: 24, position: 'relative', overflow: 'auto' }}>
                            <DatePicker onChange={v => console.log(v.format())} />
                        </div>
                    );
                }}
            >
                wrong display with positioned wrap
            </Button>
            <Button
                onClick={() => {
                    Modal.confirm(
                        {
                            title: 'datePicker'
                        },
                        <div style={{ padding: 24, position: 'relative', overflow: 'auto' }}>
                            <DatePicker
                                onChange={v => console.log(v.format())}
                                popoverProps={{ getPopupContainer: () => document.body }}
                                zIndex={1020}
                            />
                        </div>
                    );
                }}
            >
                place calendar into body
            </Button>
        </div>
    </div>
);
// demo end

export default Demo;
