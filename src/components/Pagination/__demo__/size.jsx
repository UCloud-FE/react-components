import React from 'react';
import Pagination from 'src/components/Pagination';

// demo start
const { Size } = Pagination;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Size.map(size => (
                    <div className="demo-wrap" key={size}>
                        <Pagination size={size} total={100}>
                            Pagination
                        </Pagination>
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
