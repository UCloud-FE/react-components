import React from 'react';
import PropTypes from 'prop-types';

import Popover from 'src/components/Popover';

// demo start
const Animation = ['fade', 'zoom', 'bounce', 'slide-up'];
const Popup = () => <div style={{ height: 30, border: '1px solid #ddd', background: '#fff' }}>This is a popup</div>;
const Content = props => (
    <button style={{ width: 100, height: 40, background: '#ddd', display: 'inline-block', marginLeft: 5 }} {...props} />
);
Content.propTypes = {
    children: PropTypes.node
};

const Demo = () => (
    <div>
        {Animation.map(animation => (
            <Popover key={'key' + animation} animation={animation} popup={<Popup />}>
                <Content>{'' + animation}</Content>
            </Popover>
        ))}
    </div>
);
// demo end

export default Demo;
