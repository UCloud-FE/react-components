import React from 'react';

import Select from 'src/components/Select';
import Button from 'src/components/Button';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Select multiple showSelectAll onChange={console.log} />
                </div>
                <div className="demo-wrap">
                    <Select
                        multiple
                        showSelectAll
                        search
                        onChange={console.log}
                        extra={{
                            autoHidePopup: true,
                            content: (
                                <Button style={{ width: '100%' }} styleType="primary" onClick={() => console.log(123)}>
                                    插入按钮
                                </Button>
                            )
                        }}
                    />
                </div>
                <div className="demo-wrap">
                    <Select
                        multiple
                        showSelectAll
                        search
                        onChange={console.log}
                        emptyContent={
                            <div style={{ height: 100, textAlign: 'center', background: 'gray' }}>么数据啊</div>
                        }
                        extra={{
                            autoHidePopup: true,
                            content: (
                                <Button style={{ width: '100%' }} styleType="primary" onClick={() => console.log(123)}>
                                    插入按钮
                                </Button>
                            )
                        }}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
