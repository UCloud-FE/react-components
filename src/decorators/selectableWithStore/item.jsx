import React, { Component } from 'react';
import _ from 'lodash';

const contextProps = 'ITEM_DECORATOR_CONTEXT_PROPS';

const itemDecorator = ({ checkedName = 'checked', onChangeName = 'onChange', StoreContext }) => Item => {
    if (!StoreContext) {
        console.error('Must have StoreContext');
    }
    class ItemWrappedComponent extends Component {
        constructor(props) {
            super(props);
            this.uid = _.uniqueId(`uc-${Item.name.toLowerCase()}-`);
        }
        static displayName = `ItemWrapped${Item.name}`;
        componentWillMount() {
            const storeContext = this.props[contextProps];
            if (storeContext) {
                storeContext.appendItem(this);
            }
        }
        componentWillUnmount() {
            const storeContext = this.props[contextProps];
            if (storeContext) {
                storeContext.removeItem(this);
            }
        }
        onChange = (checked, ...rest) => {
            const storeContext = this.props[contextProps];
            if (storeContext && storeContext.selectable) {
                storeContext.toggleItem(this, checked);
            }
            if (this.props[onChangeName]) {
                this.props[onChangeName](checked, ...rest);
            }
        };
        getChecked = () => {
            const storeContext = this.props[contextProps];
            if (storeContext) {
                return storeContext.getItemSelected(this);
            } else {
                return this.props[checkedName];
            }
        };
        render() {
            const { ...rest } = this.props;
            delete rest[contextProps];
            const storeContext = this.props[contextProps] || {};
            return (
                <Item
                    multiple={storeContext.multiple}
                    {...rest}
                    {...{ [checkedName]: this.getChecked(), [onChangeName]: this.onChange }}
                />
            );
        }
    }
    return class ItemWrappedComponentWithContext extends Component {
        render() {
            return (
                <StoreContext.Consumer>
                    {context => <ItemWrappedComponent {...{ [contextProps]: context }} {...this.props} />}
                </StoreContext.Consumer>
            );
        }
    };
};

export default itemDecorator;
