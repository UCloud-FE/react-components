import React from 'react';

import Select from 'src/components/Select';

// demo start
const options = new Array(100000).fill(null).map((v, i) => ({ label: `option ${i}`, value: i }));

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Select
                        multiple
                        showSelectAll
                        search
                        onChange={console.log}
                        options={options}
                        virtualList={{ height: 500 }}
                    />
                </div>
                <h2>simple</h2>
                <div className="demo-wrap">
                    <Select
                        multiple
                        showSelectAll
                        search
                        onChange={console.log}
                        options={options}
                        virtualList={{ simple: true }}
                    />
                </div>
                <h2>通过 customStyle.popupWidth 固定宽度避免宽度变化</h2>
                <div className="demo-wrap">
                    <Select
                        multiple
                        onChange={console.log}
                        options={options}
                        virtualList
                        customStyle={{ popupWidth: '200px' }}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
