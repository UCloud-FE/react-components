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
    const offsets = [1, 2, 3, 4];
    return (
        <div>
            {offsets.map(offset => (
                <Row {...layout} key={offset}>
                    <Col span={2} offset={offset}>
                        <div style={style}>offset: {offset}</div>
                    </Col>
                </Row>
            ))}
        </div>
    );
};
// demo end

export default Demo;
