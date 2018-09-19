import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <Button onClick={() => Modal.alert({ mask: true }, 'This is a modal')}>mask=true</Button>
                <Button onClick={() => Modal.alert({ mask: false }, 'This is a modal')}>mask=false</Button>
            </div>
        );
    }
}
// demo end

export default Demo;
