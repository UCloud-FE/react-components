import React from 'react';
import Pagination from 'components/Pagination';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Pagination total={100} />
                </div>
                <div className="demo-wrap">
                    <Pagination total={100} showSizeChanger />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
