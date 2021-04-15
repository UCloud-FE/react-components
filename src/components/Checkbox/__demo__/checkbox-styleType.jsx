import React from 'react';

import Checkbox from 'src/components/Checkbox';
import Combine from 'src/components/Combine';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Combine>
                        <Checkbox checked={false}>checkbox</Checkbox>
                        <Checkbox checked>checkbox</Checkbox>
                        <Checkbox disabled>checkbox</Checkbox>
                        <Checkbox checked disabled>
                            checkbox
                        </Checkbox>
                    </Combine>
                </div>
                <div className="demo-wrap">
                    <Combine>
                        <Checkbox styleType="card" checked={false}>
                            checkbox
                        </Checkbox>
                        <Checkbox styleType="card" checked>
                            checkbox
                        </Checkbox>
                        <Checkbox styleType="card" disabled>
                            checkbox
                        </Checkbox>
                        <Checkbox styleType="card" checked disabled>
                            checkbox
                        </Checkbox>
                    </Combine>
                </div>
                <div className="demo-wrap">
                    <Combine>
                        <Checkbox styleType="card" title="title" checked={false}>
                            checkbox
                        </Checkbox>
                        <Checkbox styleType="card" title="title" checked>
                            checkbox
                        </Checkbox>
                        <Checkbox styleType="card" title="title" disabled>
                            checkbox
                        </Checkbox>
                        <Checkbox styleType="card" title="title" checked disabled>
                            checkbox
                        </Checkbox>
                    </Combine>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
