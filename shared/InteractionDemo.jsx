import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Tabs from 'src/components/Tabs';
import Switch from 'src/components/Switch';
import Radio from 'src/components/Radio';
import Input from 'src/components/Input';
import Button from 'src/components/Button';

// eslint-disable-next-line react/display-name
const Action = React.memo(({ name, value, onChange, type, options }) => {
    const handleChange = useCallback(
        v => {
            if (type === 'string') {
                v = v.target.value;
            }
            onChange(v, name);
        },
        [name, onChange, type]
    );
    switch (type) {
        case 'union': {
            return (
                <Radio.Group
                    value={value}
                    styleType="button"
                    onChange={handleChange}
                    options={options.map(v => (typeof v !== 'object' ? { value: v } : v))}
                />
            );
        }
        case 'string': {
            return <Input value={value || ''} onChange={handleChange} />;
        }
        case 'boolean': {
            return <Switch checked={!!value} onChange={handleChange} />;
        }
    }
});
Action.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    options: PropTypes.array
};

const style = `
.interaction-demo {
    display: flex;
}
.interaction-demo .demo-area {
    flex: 1;
}
.interaction-demo .action-area {
    width: 250px;
    flex-shrink: 0;
    border-left: 1px solid #EFEFF8;
    padding-left: 8px;
}
.action-area > div {
    margin: 4px 0;
}
.action-area > div > h4 {
    margin-bottom: 4px;
}
.action-area .reset {
    margin-top: 8px;
    border-top: 1px solid #EFEFF8;
    padding-top: 4px;
}
`;

const InteractionDemo = ({ config, initialState = {}, children }) => {
    const [componentState, setComponentState] = useState(initialState);
    const handleValueChange = useCallback(
        (value, key) => {
            setComponentState({ ...componentState, [key]: value });
        },
        [componentState]
    );
    const handleReset = useCallback(() => {
        setComponentState(initialState);
    }, [initialState]);
    const componentProps = {
        ...componentState
    };
    Object.keys(config).map(name => {
        const prop = config[name];
        if (prop.optionToProps) {
            componentProps[name] = prop.optionToProps(componentProps[name]);
        }
    });
    return (
        <div className="interaction-demo">
            <style>{style}</style>
            <div className="demo-area">{React.cloneElement(children, componentProps)}</div>
            <div className="action-area">
                {Object.keys(config).map(name => {
                    let prop = config[name];
                    if (typeof prop === 'string') {
                        prop = { type: prop };
                    }
                    if (Array.isArray(prop)) {
                        prop = { type: 'union', options: prop };
                    }
                    return (
                        <div key={name}>
                            <h4>{name}</h4>
                            <Action {...prop} name={name} value={componentState[name]} onChange={handleValueChange} />
                        </div>
                    );
                })}
                <div className="reset">
                    <Button styleType="primary" onClick={handleReset}>
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
};
InteractionDemo.propTypes = {
    config: PropTypes.object.isRequired,
    initialState: PropTypes.object,
    children: PropTypes.node.isRequired
};

export default InteractionDemo;
