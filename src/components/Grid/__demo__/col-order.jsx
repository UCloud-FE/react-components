import React from 'react';
import Grid from 'components/Grid';
const { Row, Col } = Grid;

// demo start
const Demo = () => {
    const style = {
        background: '#888',
        height: 20,
        lineHeight: '20px',
        border: '1px solid #111',
        fontSize: 14,
        color: '#FFF',
        textAlign: 'center'
    };
    const layout = {
        style: {
            marginBottom: 10
        }
    };
    const orders = [4, 3, 2, 1];
    return (
        <div>
            <Row {...layout}>
                {orders.map((order, i) => (
                    <Col span={2} key={order} order={order}>
                        <div style={style}>
                            order: {order}, i: {i}
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};
// demo end

export default Demo;
