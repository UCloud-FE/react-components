import React from 'react';
import Checkbox from 'components/Checkbox';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Checkbox>checkbox</Checkbox>
                </div>
                <div className="demo-wrap">
                    <Checkbox styleType="card" title="title" style={{ marginRight: 8 }}>
                        checkbox
                    </Checkbox>
                    <Checkbox styleType="card" title="title" checked style={{ marginRight: 8 }}>
                        checkbox
                    </Checkbox>
                    <Checkbox styleType="card" title="title" disabledLabel="售罄" disabled style={{ marginRight: 8 }}>
                        checkbox
                    </Checkbox>
                    <Checkbox
                        styleType="card"
                        title="title"
                        disabledLabel="必选"
                        disabled
                        checked
                        style={{ marginRight: 8 }}
                    >
                        checkbox
                    </Checkbox>
                    <Checkbox styleType="card" title="title" disabled checked style={{ marginRight: 8 }}>
                        checkbox
                    </Checkbox>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
