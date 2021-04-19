import React from 'react';

import Tag from 'src/components/Tag';

// demo start

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Tag.Icon icon="circle-fill" styleType="orange" closable></Tag.Icon>
                </div>
                <div className="demo-wrap">
                    <Tag.Icon
                        icon="circle-fill"
                        styleType="orange"
                        closable
                        customStyle={{
                            color: 'white',
                            background: 'red',
                            borderColor: 'orange'
                        }}
                    ></Tag.Icon>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
