import React from 'react';
import Collapse from 'components/Collapse';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Collapse
                        onChange={(v, ...rest) => {
                            console.log(v, ...rest);
                        }}
                        defaultOpenKeys={[2, 3]}
                    >
                        <Collapse.Panel title="panel 1" panelKey={1}>
                            content 1
                        </Collapse.Panel>
                        <Collapse.Panel title="panel 2" panelKey={2}>
                            content 2
                        </Collapse.Panel>
                        <Collapse.Panel title="panel 3" panelKey={3}>
                            content 3
                        </Collapse.Panel>
                    </Collapse>
                </div>
                <div className="demo-wrap">
                    <Collapse
                        onChange={(v, ...rest) => {
                            console.log(v, ...rest);
                        }}
                        openKeys={[2, 3]}
                    >
                        <Collapse.Panel title="panel 1" panelKey={1}>
                            content 1
                        </Collapse.Panel>
                        <Collapse.Panel title="panel 2" panelKey={2}>
                            content 2
                        </Collapse.Panel>
                        <Collapse.Panel title="panel 3" panelKey={3}>
                            content 3
                        </Collapse.Panel>
                    </Collapse>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
