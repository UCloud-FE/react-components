import React, { useMemo, useState } from 'react';

import hoistStatics from 'src/utils/hoistStatics';

const uncontrolledDecorator = <T, ChildProps = any>(option?: {
    valueName?: string;
    onChangeName?: string | string[];
    defaultValueName?: string;
}) => (Child: React.ComponentType<ChildProps>) => {
    const { valueName = 'value', onChangeName = 'onChange', defaultValueName: _defaultValueName } = option || {};
    const defaultValueName = _defaultValueName || `default${valueName.replace(/^\S/, s => s.toUpperCase())}`;
    const onChangeNames = Array.isArray(onChangeName) ? onChangeName : [onChangeName];

    // eslint-disable-next-line react/display-name
    const UncontrolledWrappedComponent = React.forwardRef((props: any, ref) => {
        // controlled is fixed after constructor
        const isControlled = useMemo(() => valueName in props, [props]);
        const [value, setValue] = useState(() => props[defaultValueName]);
        const finalValue = isControlled ? props[valueName] : value;

        const onChanges = onChangeNames.map(onChangeName => props[onChangeName]);

        const onChangesProps = useMemo(() => {
            const onChangesProps: { [key: string]: (v: unknown) => void } = {};
            onChangeNames.forEach(onChangeName => {
                onChangesProps[onChangeName] = (v, ...rest) => {
                    const onChange = props[onChangeName];
                    if (!isControlled) setValue(v);
                    onChange?.(v, ...rest);
                };
            });
            return onChangesProps;
            // rebuild when one of onChange changed
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isControlled, ...onChanges]);

        const valueProps = {
            [valueName]: finalValue
        };
        // ignore default value prop
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [defaultValueName]: defaultValue, ...restProps } = props;

        return <Child {...restProps} {...valueProps} {...onChangesProps} ref={ref} />;
    });

    hoistStatics(UncontrolledWrappedComponent, Child);
    return UncontrolledWrappedComponent;
};

export default uncontrolledDecorator;
