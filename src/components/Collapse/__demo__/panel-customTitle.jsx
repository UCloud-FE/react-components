import React from 'react';
import PropTypes from 'prop-types';
import Collapse from 'src/components/Collapse';
import Button from 'src/components/Button';

// demo start
class PanelTitle extends React.Component {
    render() {
        const { toggle, children } = this.props;
        return (
            <div
                onClick={e => e.stopPropagation()}
                style={{ border: '1px solid #ccc', height: 28, lineHeight: '28px', padding: 10 }}
            >
                {children}
                <Button onClick={() => toggle()} style={{ float: 'right' }}>
                    toggle
                </Button>
            </div>
        );
    }
}
PanelTitle.propTypes = {
    open: PropTypes.bool,
    disabled: PropTypes.bool,
    toggle: PropTypes.func,
    children: PropTypes.node
};
class Demo extends React.Component {
    render() {
        return (
            <div>
                <Collapse.Panel
                    title={props => <PanelTitle {...props}>title</PanelTitle>}
                    onChange={v => {
                        console.log(v);
                    }}
                >
                    Content
                </Collapse.Panel>
            </div>
        );
    }
}
// demo end

export default Demo;
