import React from 'react';
import Popover from 'components/Popover';

// demo start
const Popup = () => <div style={{ border: '1px solid #ddd', background: '#fff', height: '100%' }}>This is a popup</div>;
const Content = props => (
    <button style={{ width: 200, height: 100, background: '#ddd', display: 'inline-block', margin: 5 }} {...props} />
);
const popupStyle = {
    border: '1px solid red',
    padding: 10,
    background: 'white',
    boxSizing: 'border-box'
};

const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Popover placement="top" popup={<Popup />} popupStyle={popupStyle}>
                <Content>default</Content>
            </Popover>
        </div>
        <div className="demo-wrap">
            <Popover placement="top" popup={<Popup />} popupStyle={popupStyle} stretch={['width']}>
                <Content>width</Content>
            </Popover>
        </div>
        <div className="demo-wrap">
            <Popover placement="right" popup={<Popup />} popupStyle={popupStyle} stretch={['minHeight']}>
                <Content>minHeight</Content>
            </Popover>
        </div>
        <div className="demo-wrap">
            <Popover placement="right" popup={<Popup />} popupStyle={popupStyle} stretch={['height', 'width']}>
                <Content>height, width</Content>
            </Popover>
        </div>
    </div>
);
// demo end

export default Demo;
