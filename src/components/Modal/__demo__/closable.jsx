import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <Button onClick={() => Modal.alert({ closable: true }, 'This is a modal')}>closable=true</Button>
                <Button onClick={() => Modal.alert({ closable: false }, 'This is a modal')}>closable=false</Button>
            </div>
        );
    }
}
// demo end

export default Demo;
