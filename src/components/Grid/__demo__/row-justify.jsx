import React from 'react';
import Grid from 'src/components/Grid';
const { Row, Col } = Grid;

// demo start
const { Justify } = Row;
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
            {Justify.map(justify => (
                <Row {...layout} key={justify} justify={justify} align="middle" type="flex">
                    <Col span={2}>
                        <div style={style} />
                    </Col>
                    <Col span={2}>
                        <div style={style} />
                    </Col>
                    <Col span={2}>
                        <div style={style} />
                    </Col>
                    <Col span={2}>
                        <div style={style} />
                    </Col>
                </Row>
            ))}
        </div>
    );
};
// demo end

export default Demo;
