import React from 'react';
import Grid from 'components/Grid';
const { Row, Col } = Grid;

// demo start
const Demo = () => {
    const style = { background: '#888', height: 20, border: '1px solid #111' };
    const layout = {
        style: {
            marginBottom: 10
        }
    };
    const gutters = [0, 2, 4, 8, 16];
    return (
        <div>
            {gutters.map(gutter => (
                <Row gutter={gutter} key={gutter} {...layout}>
                    <Col span={3}>
                        <div style={style} />
                    </Col>
                    <Col span={3}>
                        <div style={style} />
                    </Col>
                    <Col span={3}>
                        <div style={style} />
                    </Col>
                    <Col span={3}>
                        <div style={style} />
                    </Col>
                </Row>
            ))}
        </div>
    );
};
// demo end

export default Demo;
