import React from 'react';

import Switch from 'src/components/Switch';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Switch.Sizes.map(size =>
                    [false, true].map(disabled =>
                        [false, true].map(checked => (
                            <div className="demo-wrap" key={`size-${size}_disabled-${disabled}_checked-${checked}`}>
                                <Switch size={size} disabled={disabled} checked={checked} />
                            </div>
                        ))
                    )
                )}
            </div>
        );
    }
}
// demo end

export default Demo;
