/* eslint-disable react/display-name */
import React from 'react';

import Table from 'src/components/Table';
import Drawer from 'src/components/Drawer';
import Button from 'src/components/Button';
import Popover from 'src/components/Popover';
import Select from 'src/components/Select';
import DatePicker from 'src/components/DatePicker';
import Card from 'src/components/Card';

// demo start
const tests = [
    () => (
        <Popover
            forwardPopupContainer
            popup={<div style={{ background: '#ccc', width: 300, height: 300, padding: 20 }}>This is the popup</div>}
        >
            <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
        </Popover>
    ),
    () => <Select options={new Array(100).fill(null).map((v, i) => ({ value: i, label: `option-${i}` }))} />,
    () => <DatePicker />,
    () => <DatePicker.Month />,
    record => (
        <Table.ActionList
            exposeCount={1}
            actionList={new Array(10).fill(null).map((v, i) => ({
                label: `Action ${i}`,
                onClick: e => console.log('action', i, record, e)
            }))}
        />
    )
];
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h3>Drawer 会拦截外层的 getPopupContainer</h3>
                <div className="demo-wrap">
                    <Card>
                        {tests.map((test, i) => (
                            <div key={i}>
                                <Button onClick={() => this.setState({ [`visible-${i}`]: true })}>Test {i}</Button>
                                <Drawer
                                    visible={this.state[`visible-${i}`]}
                                    width="50%"
                                    onClose={() => this.setState({ [`visible-${i}`]: false })}
                                >
                                    {test()}
                                </Drawer>
                            </div>
                        ))}
                    </Card>
                </div>
            </div>
        );
    }
}

// demo end

export default Demo;
