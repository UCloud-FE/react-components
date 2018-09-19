import React, { Component } from 'react';
import _ from 'lodash';

const uncontrolledDecorator = (...options) => Child => {
    if (!options.length) {
        console.error('Must have at least one option');
    }
    options = options.map(option => {
        const _option = {
            valueName: 'value',
            onChangeName: 'onChange',
            ...option
        };
        const defaultValueName =
            _option.defaultValueName || `default${_option.valueName.replace(/^\S/, s => s.toUpperCase())}`;
        _option.defaultValueName = defaultValueName;
        return _option;
    });
    class UncontrolledWrappedComponent extends Component {
        constructor(props) {
            super(props);
            const state = {};
            options.forEach(option => {
                const { valueName, defaultValueName } = option;
                state[valueName] = valueName in props ? props[valueName] : props[defaultValueName];
            });
            this.state = state;
        }
        componentWillReceiveProps = nextProps => {
            options.forEach(({ valueName }) => {
                if (valueName in nextProps) {
                    this.setState({
                        [valueName]: nextProps[valueName]
                    });
                }
            });
        };
        onChange = (onChangeName, { valueName }, v, ...rest) => {
            if (!(valueName in this.props)) {
                this.setState({ [valueName]: v });
            }
            if (this.props[onChangeName]) {
                this.props[onChangeName](v, ...rest);
            }
        };
        render() {
            const { props, state } = this;
            const { innerRef, ...rest } = props;
            options.forEach(option => {
                const { valueName, onChangeName } = option;
                rest[valueName] = state[valueName];
                if (_.isArray(onChangeName)) {
                    _.each(onChangeName, name => (rest[name] = (...args) => this.onChange(name, option, ...args)));
                } else {
                    rest[onChangeName] = (...args) => this.onChange(onChangeName, option, ...args);
                }
            });
            return <Child {...rest} ref={innerRef} />;
        }
    }
    // get default props
    UncontrolledWrappedComponent.defaultProps = {};
    if (Child.defaultProps) {
        options.forEach(({ defaultValueName }) => {
            if (defaultValueName in Child.defaultProps) {
                UncontrolledWrappedComponent.defaultProps[defaultValueName] = Child.defaultProps[defaultValueName];
            }
        });
    }

    return UncontrolledWrappedComponent;
};

export default uncontrolledDecorator;
