import React from 'react';
import PropTypes from 'prop-types';

import EditableList from 'src/components/EditableList';
import Input from 'src/components/Input';
import SizeInterface from 'src/interfaces/Size';

// demo start
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

const renderItem = (item, size) => {
    return <Input defaultValue={item.name} size={size} />;
};

class InstanceDemo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <EditableList renderItem={item => renderItem(item, this.props.size)} {...this.props} />;
    }
}
InstanceDemo.propTypes = {
    size: PropTypes.string
};

class Demo extends React.Component {
    render() {
        return (
            <div>
                {SizeInterface.map(size => (
                    <div key={size}>
                        <h2>size: {size}</h2>
                        <div className="demo-wrap">
                            <InstanceDemo size={size} dataSource={[]} />
                        </div>
                        <div className="demo-wrap">
                            <InstanceDemo size={size} dataSource={dataSource} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
