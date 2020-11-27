import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';

// demo start
const { Size } = Modal;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Size.map(size => (
                    <Button
                        key={size}
                        onClick={() => Modal.alert({ size, customStyle: { contentPadding: true } }, 'This is a modal')}
                    >
                        {size}
                    </Button>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
