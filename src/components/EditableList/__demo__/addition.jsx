import React from 'react';

import EditableList from 'src/components/EditableList';
import Input from 'src/components/Input';

// demo start
const list = [
    { label: 'false', props: false },
    { label: 'onAdd', props: { onAdd: () => console.log('onAdd') } },
    { label: 'disabled', props: { disabled: true, onAdd: () => console.log('onAdd') } }
];

let uid = 0;

const generateData = ({ name, desc, deletable } = {}) => {
    const id = uid++;
    return {
        key: id + '',
        name: name || `name-${id}`,
        desc: desc || `desc-${id}`,
        deletable
    };
};

const dataSource = [generateData(), generateData()];

const renderItem = item => {
    return <Input defaultValue={item.name} />;
};

class InstanceDemo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <EditableList renderItem={renderItem} {...this.props} />;
    }
}

class Demo extends React.Component {
    render() {
        return (
            <div>
                {list.map(({ props, label }) => (
                    <div key={label}>
                        <h2>{label}</h2>
                        <div className="demo-wrap">
                            <InstanceDemo addition={props} dataSource={[]} />
                        </div>
                        <div className="demo-wrap">
                            <InstanceDemo addition={props} dataSource={dataSource} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
