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
    const pulls = [1, 2, 3, 4];
    const pushs = [1, 2, 3, 4];
    return (
        <div>
            <Row {...layout}>
                {pulls.map(pull => (
                    <Col span={2} key={pull} pull={pull}>
                        <div style={style}>pull: {pull}</div>
                    </Col>
                ))}
            </Row>
            <Row {...layout}>
                {pushs.map(push => (
                    <Col span={2} key={push} push={push}>
                        <div style={style}>push: {push}</div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};
// demo end

export default Demo;
