import React from 'react';
import Pagination from 'src/components/Pagination';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Pagination total={100} pageSize={20} showSizeChanger />
                </div>
                <div className="demo-wrap">
                    <Pagination total={100} defaultPageSize={20} showSizeChanger />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
