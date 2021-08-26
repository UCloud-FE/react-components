import React from 'react';

import Card from 'src/components/Card';
import Table from 'src/components/Table';
import Select from 'src/components/Select';
import DatePicker from 'src/components/DatePicker';
import ConfigProvider from 'src/components/ConfigProvider';

// demo start
const render = (title, key) => {
    return (
        <div key={key}>
            <h2>{title}</h2>
            <div>
                <div className="demo-wrap">
                    <Card>
                        <Card.Content>
                            <div style={{ position: 'relative' }}>
                                <Select
                                    options={new Array(100)
                                        .fill(null)
                                        .map((v, i) => ({ value: i, label: `option-${i}` }))}
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
                                <DatePicker.Month />
                            </div>
                        </Card.Content>
                    </Card>
                </div>
                <div className="demo-wrap">
                    <Card>
                        <Card.Content>
                            <div style={{ position: 'relative' }}>
                                <DatePicker.Range />
                            </div>
                        </Card.Content>
                    </Card>
                </div>
                <div className="demo-wrap">
                    <Card>
                        <Card.Content>
                            <div style={{ position: 'relative' }}>
                                <Table.ActionList
                                    exposeCount={1}
                                    actionList={new Array(6).fill(null).map((v, i) => ({
                                        label: `Action ${i}`
                                    }))}
                                />
                            </div>
                        </Card.Content>
                    </Card>
                </div>
            </div>
        </div>
    );
};
const Demo = () =>
    [
        { title: 'default', config: false },
        { title: 'forwardPopupContainer: false', config: { forwardPopupContainer: false } },
        {
            title: 'getPopupContainer: body, forwardPopupContainer: false',
            config: { forwardPopupContainer: false, getPopupContainer: () => document.body }
        }
    ].map(({ title, config }, i) => {
        if (config) {
            return (
                <ConfigProvider key={i} {...config}>
                    {render(title, i)}
                </ConfigProvider>
            );
        } else {
            return render(title, i);
        }
    });
// demo end

export default Demo;
