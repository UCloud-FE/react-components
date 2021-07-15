import React from 'react';
import Pagination from 'src/components/Pagination';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Pagination total={100} showTotal />
                </div>
                <div className="demo-wrap">
                    <Pagination total={100} showTotal={total => `总共有 ${total} 条数据`} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
