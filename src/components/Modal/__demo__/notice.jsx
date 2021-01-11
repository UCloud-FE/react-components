import React from 'react';

import Modal from 'src/components/Modal';
import Button from 'src/components/Button';
import Link from 'src/components/Link';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <Button
                    onClick={() =>
                        Modal.alert(
                            {
                                notice: (
                                    <Link href="https://google.com" target="_blank">
                                        Google
                                    </Link>
                                )
                            },
                            <Modal.Content>This is a modal</Modal.Content>
                        )
                    }
                >
                    Node Notice
                </Button>
                <Button
                    onClick={() =>
                        Modal.alert(
                            {
                                notice: {
                                    styleType: 'error',
                                    closable: false,
                                    children: (
                                        <Link href="https://google.com" target="_blank">
                                            Google
                                        </Link>
                                    )
                                }
                            },
                            <Modal.Content>This is a modal</Modal.Content>
                        )
                    }
                >
                    Custom Notice
                </Button>
            </div>
        );
    }
}
// demo end

export default Demo;
