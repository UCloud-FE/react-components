import React from 'react';

import Transfer from 'src/components/Transfer';
import Checkbox from 'src/components/Radio';

// demo start
const { defaultProps } = Transfer;

const dataSource = new Array(100).fill(null).map((v, i) => ({
    key: i,
    label: `item-${i}`
}));

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: defaultProps.search,
            disabled: defaultProps.disabled,
            sourceSearch: 'default',
            sourceDisabled: 'default',
            sourceTitle: 'default',
            sourceFooter: false,
            targetSearch: 'default',
            targetDisabled: 'default',
            targetTitle: 'default',
            targetFooter: false
        };
    }
    render() {
        const props = {
            dataSource,
            search: {
                handleSearch: (searchValue, item) => {
                    console.log(searchValue, item);
                    const index = item.label.indexOf(searchValue);
                    return index >= 0 && index < 3;
                }
            },
            target: {
                search: {
                    handleSearch: (searchValue, item) => {
                        console.log(searchValue, item);
                        return item.label.indexOf(searchValue) > 2;
                    }
                }
            }
        };

        return (
            <div>
                <h3>自定义搜索：左侧只能匹配前 3 位，右侧只能匹配后 3 位</h3>
                <div className="demo-wrap">
                    <Transfer
                        {...props}
                        renderList={({ dataSource, selectedKeys, onChange, disabled }) => {
                            return (
                                <div style={{ padding: '12px', height: '300px', overflow: 'auto' }}>
                                    <Checkbox.Group value={selectedKeys} onChange={onChange} disabled={disabled}>
                                        {dataSource.map(v => (
                                            <div key={v.key}>
                                                <Checkbox value={v.key}>{v.label}</Checkbox>
                                            </div>
                                        ))}
                                    </Checkbox.Group>
                                </div>
                            );
                        }}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
