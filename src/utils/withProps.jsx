import { createFactory } from 'react';
import classnames from 'classnames';
import _ from 'lodash';

import defaultTheme from 'src/components/ThemeProvider/theme';

const mapProps = propsMapper => BaseComponent => {
    const factory = createFactory(BaseComponent);
    const MapProps = props => factory(propsMapper(props));
    if (process.env.NODE_ENV !== 'production') {
        return setDisplayName(wrapDisplayName(BaseComponent, 'mapProps'))(MapProps);
    }
    return MapProps;
};
const setStatic = (key, value) => BaseComponent => {
    /* eslint-disable no-param-reassign */
    BaseComponent[key] = value;
    /* eslint-enable no-param-reassign */
    return BaseComponent;
};
const getDisplayName = Component => {
    if (typeof Component === 'string') {
        return Component;
    }

    if (!Component) {
        return undefined;
    }

    return Component.displayName || Component.name || 'Component';
};
const wrapDisplayName = (BaseComponent, hocName) => `${hocName}(${getDisplayName(BaseComponent)})`;

const setDisplayName = displayName => setStatic('displayName', displayName);

const withProps = input => {
    const hoc = mapProps((props = {}) => {
        input = typeof input === 'function' ? input(props) : input;
        let { className } = input;
        if (className) {
            className = typeof className === 'function' ? className(props) : className;
        }

        className = classnames(className, props.className);

        const result = {
            ...input,
            ...props,
            className
        };
        if (_.isEmpty(result.theme)) {
            result.theme = defaultTheme;
        }
        if (result._innerRef) {
            result.innerRef = result._innerRef;
            delete result._innerRef;
        }
        return result;
    });
    if (process.env.NODE_ENV !== 'production') {
        return BaseComponent => setDisplayName(wrapDisplayName(BaseComponent, 'withProps'))(hoc(BaseComponent));
    }
    return hoc;
};

export default withProps;
