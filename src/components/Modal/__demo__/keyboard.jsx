import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <Button onClick={() => Modal.alert({ keyboard: true }, 'This is a modal')}>keyboard=true</Button>
                <Button onClick={() => Modal.alert({ keyboard: false }, 'This is a modal')}>keyboard=false</Button>
            </div>
        );
    }
}
// demo end

export default Demo;
