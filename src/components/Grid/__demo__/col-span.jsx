import React from 'react';
import Grid from 'src/components/Grid';
const { Row, Col } = Grid;

// demo start
const Demo = () => {
    const style = {
        background: '#888',
        height: 20,
        lineHeight: '20px',
        border: '1px solid #111',
        marginBottom: 10,
        fontSize: 14,
        color: '#FFF',
        textAlign: 'center'
    };
    const spans = [1, 2, 3, 4, 5, 6, 7, 8];
    return (
        <div>
            <Row>
                {spans.map(span => (
                    <Col key={span} span={span}>
                        <div style={style}>span: {span}</div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};
// demo end

export default Demo;
