import React from 'react';
import Grid from 'components/Grid';
const { Row, Col } = Grid;

// demo start
const { Align } = Row;
const Demo = () => {
    const style = { background: '#888', height: 20, border: '1px solid #111' };
    const layout = {
        style: {
            marginBottom: 10,
            height: 40,
            border: '1px solid #ccc'
        }
    };
    return (
        <div>
            {Align.map(align => (
                <Row {...layout} key={align} align={align} type="flex">
                    <Col span={4}>
                        <div style={style} />
                    </Col>
                    <Col span={4}>
                        <div style={style} />
                    </Col>
                </Row>
            ))}
        </div>
    );
};
// demo end

export default Demo;
