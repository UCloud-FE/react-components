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
                            title: 'datePicker range',
                            size: 'md'
                        },
                        <div style={{ padding: 24 }}>
                            <DatePicker.Range onChange={console.log} />
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
                            title: 'datePicker range',
                            size: 'md'
                        },
                        <div style={{ padding: 24, position: 'relative', overflow: 'auto' }}>
                            <DatePicker.Range onChange={console.log} />
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
                            title: 'datePicker range',
                            size: 'md'
                        },
                        <div style={{ padding: 24, position: 'relative', overflow: 'auto' }}>
                            <DatePicker.Range
                                onChange={console.log}
                                popoverProps={{
                                    getPopupContainer: () => document.body
                                }}
                                selectProps={{
                                    popoverProps: {
                                        getPopupContainer: () => document.body
                                    }
                                }}
                                zIndex={1020}
                            />
                        </div>
                    );
                }}
            >
                place popover into body
            </Button>
        </div>
    </div>
);
// demo end

export default Demo;
