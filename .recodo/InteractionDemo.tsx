import React, { useState, useCallback, createContext, ReactElement, useContext, useMemo } from 'react';
import { Switch, Radio, Input, Button, Tabs } from '@ucloud-fe/react-components';

import { Config, ConfigInfo } from './interface';

export const USE_DEFINE = 'USE_DEFINE';

const isIgnoreProp = (prop: { description?: { tags?: { title: string; description: string }[] } }) => {
    if (prop.description?.tags?.length) {
        return !!prop.description.tags.find(tag => tag.title === 'ignore');
    }
    return false;
};

const fixString = (str: string) => (str ? str.slice(1, -1) : '');

const Context = createContext<any>({ props: {} });

// eslint-disable-next-line react/display-name
const Action = React.memo(
    ({
        name,
        value,
        onChange,
        type,
        options
    }: {
        name: string;
        value: any;
        onChange?: (v: any, name: string) => void;
        type: string;
        options?: [];
    }) => {
        const handleChange = useCallback(
            v => {
                if (type === 'string') {
                    v = v.target.value;
                }
                onChange?.(v, name);
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
                        options={options?.map(v => (typeof v !== 'object' ? { value: v } : v))}
                    />
                );
            }
            case 'string': {
                return <Input value={value || ''} onChange={handleChange} />;
            }
            case 'boolean': {
                return <Switch checked={!!value} onChange={handleChange} />;
            }
            default: {
                return null;
            }
        }
    }
);

const style = `
.interaction-demo {
    display: flex;
}
.interaction-demo .demo-area {
    flex: 1;
    padding: 0 8px;
}
.interaction-demo .action-area {
    width: 250px;
    flex-shrink: 0;
    border-left: 1px solid #EFEFF8;
    padding: 0 8px;
}
.interaction-demo .action-area > div {
    margin: 4px 0;
}
.interaction-demo .action-area > div > h4 {
    margin: 8px 0;
}
.interaction-demo .action-area .reset {
    margin-top: 8px;
    border-top: 1px solid #EFEFF8;
    padding-top: 8px;
}
.interaction-demo .action-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
`;

const InteractionDemo = ({ config, children }: { config: Config; children: ReactElement }) => {
    const { props: propsInfo } = useContext(Context);
    console.log(propsInfo);

    const [finalDemoPropsDefine, initialState] = useMemo(() => {
        const finalProps: { [key: string]: ConfigInfo } = {};
        const initialState: Record<string, any> = {};
        Object.keys(config).map(name => {
            let prop = config[name];
            let finalProp: ConfigInfo = { type: 'unknown' };
            const propInfo = propsInfo[name];
            if (prop === USE_DEFINE) {
                if (propInfo.tsType) {
                    switch (propInfo.tsType.name) {
                        case 'boolean': {
                            finalProp = { type: 'boolean' };
                            break;
                        }
                        case 'string': {
                            finalProp = { type: 'string' };
                            break;
                        }
                        case 'union': {
                            finalProp = {
                                type: 'union',
                                options: propInfo.tsType.elements.map((element: { value: string }) =>
                                    fixString(element.value)
                                )
                            };
                            break;
                        }
                        default: {
                            console.warn(name, propInfo);
                        }
                    }
                } else {
                    switch (propInfo.type.name) {
                        case 'bool': {
                            finalProp = { type: 'boolean' };
                            break;
                        }
                        case 'string': {
                            finalProp = { type: 'string' };
                            break;
                        }
                        case 'enum': {
                            finalProp = {
                                type: 'union',
                                options: propInfo.type.value.map((element: { value: string }) =>
                                    fixString(element.value)
                                )
                            };
                            break;
                        }
                        default: {
                            console.warn(name, propInfo);
                        }
                    }
                }
                if (propInfo.defaultValue) {
                    finalProp.defaultValue = propInfo.defaultValue.value;
                }
            } else if (typeof prop === 'string') {
                finalProp = { type: prop };
            } else if (Array.isArray(prop)) {
                finalProp = { type: 'union', options: prop };
            } else {
                finalProp = prop;
            }
            if ('defaultValue' in finalProp) {
                initialState[name] = finalProp.defaultValue;
            }
            finalProp.desc = propInfo?.description?.description;
            finalProps[name] = finalProp;
        });
        return [finalProps, initialState];
    }, []);
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
    Object.keys(finalDemoPropsDefine).map(name => {
        let prop = finalDemoPropsDefine[name];
        if (prop.optionToProps) {
            componentProps[name] = prop.optionToProps(componentProps[name]);
        }
    });
    return (
        <div className="interaction-demo">
            <style>{style}</style>
            <div className="demo-area">{React.cloneElement(children, componentProps)}</div>
            <div className="action-area">
                {Object.keys(finalDemoPropsDefine).map(name => {
                    let prop = finalDemoPropsDefine[name];
                    const title = `${name} ${prop.desc ? `- ${prop.desc}` : ''}`;
                    return (
                        <div key={name}>
                            <h4 className="action-title" title={title}>
                                {title}
                            </h4>
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

export default InteractionDemo;

const Provider = ({ props, children }: { props: any; children: any }) => {
    return <Context.Provider value={{ props }}>{children}</Context.Provider>;
};

export { Provider };

const Group = ({ list }: { list: any[] }) => {
    return (
        <Tabs styleType="ink">
            {list.map((item, i) => {
                return (
                    <Tabs.Pane tab={item.title} key={i}>
                        <div style={{ padding: '8px' }}>{item.children}</div>
                    </Tabs.Pane>
                );
            })}
        </Tabs>
    );
};

export { Group };
