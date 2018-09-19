import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SimpleStore from 'stores/SimpleStore';

const noop = () => {};

const storeDecorator = ({
    valueName = 'value',
    onChangeName = 'onChange',
    childValueName = 'value',
    StoreContext,
    getItemValue,
    getValue = v => v,
    setValue = v => v,
    callOnChangeBeforeMounted = false
}) => Parent => {
    if (!StoreContext) {
        console.error('Must pass in StoreContext');
    }
    if (!getItemValue) {
        getItemValue = item => (item.props[childValueName] === undefined ? item.uid : item.props[childValueName]);
    }
    return class StoreWrappedComponent extends Component {
        constructor(props) {
            super(props);
            this.store = new SimpleStore({
                items: {}
            });
            if (callOnChangeBeforeMounted) {
                this.handleOnChange = this._handleOnChange;
            }
        }
        static displayName = `StoreWrapped${Parent.name}`;

        static propTypes = {
            multiple: PropTypes.bool,
            selectable: PropTypes.bool,
            innerRef: PropTypes.any,
            onItemsChange: PropTypes.func
        };
        static defaultProps = {
            multiple: Parent.defaultProps && Parent.defaultProps.multiple,
            selectable: Parent.defaultProps && Parent.defaultProps.selectable,
            onItemsChange: noop
        };
        componentDidMount() {
            this.handleOnChange = this._handleOnChange;
        }
        componentWillUnmount() {
            this.handleOnChange = noop;
        }

        handleValueChange = value => {
            const { selectable } = this.props;
            if (!selectable) {
                return;
            }
            this.handleOnChange(value);
        };
        handleItemsChange = items => {
            this.store.setState({ items });
            this.onItemsChange(items);
            this.forceUpdate();
        };
        onItemsChange = _.debounce(items => {
            const { onItemsChange } = this.props;
            onItemsChange(items);
        });
        handleOnChange = noop;
        _handleOnChange = _.debounce(value => {
            const { multiple } = this.props;
            const onChange = this.props[onChangeName] || noop;
            if (multiple) {
                onChange(setValue(value), this.getAllSelectedStatus());
            } else {
                onChange(setValue(value));
            }
        });

        getCurrentValue = copy => {
            const value = getValue(this.props[valueName]) || [];
            return copy ? [...value] : value;
        };

        getAllSelectedStatus = () => {
            const value = this.getCurrentValue();
            const { items } = this.store.getState();
            const itemLength = _.keys(items).length;
            const valueLength = value.length;
            return valueLength === 0 ? 'NONE' : valueLength === itemLength ? 'ALL' : 'PART';
        };

        getAllSelectedStatusOfMiddle = middle => {
            const value = this.getCurrentValue();
            const { items } = this.store.getState();
            const middleUid = middle.uid;
            const middleItems = _.filter(items, item => item.parents[middleUid]);
            const middleValue = _.filter(value, v => _.find(middleItems, item => getItemValue(item.item) === v));
            const itemLength = middleItems.length;
            const valueLength = middleValue.length;

            return valueLength === 0 ? 'NONE' : valueLength === itemLength ? 'ALL' : 'PART';
        };

        appendItem = (item, parents = {}) => {
            const { uid } = item;
            if (!uid) {
                return console.error('Must have uid for store item');
            }
            const { items } = this.store.getState();
            if (uid in items) {
                return console.error(`Can't have same uid form diffent items: ${uid}`);
            }
            this.handleItemsChange({
                ...items,
                [uid]: {
                    item,
                    parents
                }
            });
        };
        removeItem = item => {
            const { uid } = item;
            if (!uid) {
                return console.error('Must have uid for store item');
            }
            let { items } = this.store.getState();
            if (!(uid in items)) {
                return console.error(`There is no this item: ${uid}`);
            }
            items = { ...items };
            delete items[uid];
            this.handleItemsChange(items);
        };
        toggleItem = (item, selected) => {
            const { uid } = item;
            if (!uid) {
                return console.error('Must have uid for store item');
            }
            const itemValue = getItemValue(item);
            const { multiple } = this.props;
            const currentSelected = this.getItemSelected(item);
            if (multiple) {
                const value = this.getCurrentValue(true);
                const itemIndex = _.indexOf(value, itemValue);
                if (currentSelected && !selected) {
                    value.splice(itemIndex, 1);
                    this.handleValueChange(value);
                } else if (!currentSelected && selected) {
                    value.push(itemValue);
                    this.handleValueChange(value);
                }
            } else {
                if (currentSelected && !selected) {
                    this.handleValueChange([]);
                } else if (!currentSelected && selected) {
                    this.handleValueChange([itemValue]);
                }
            }
        };

        getItemSelected = item => {
            const value = this.getCurrentValue();

            const itemValue = getItemValue(item);
            const { multiple } = this.props;
            if (multiple) {
                return _.indexOf(value, itemValue) >= 0;
            } else {
                return !!value.length && value[0] === itemValue;
            }
        };

        selectAllOfMiddle = middle => {
            const value = this.getCurrentValue(true);
            const { items } = this.store.getState();
            const middleUid = middle.uid;
            const middleItems = _.filter(items, item => item.parents[middleUid]);
            _.each(middleItems, item => {
                const itemValue = getItemValue(item.item);
                if (_.indexOf(value, itemValue) === -1) {
                    value.push(itemValue);
                }
            });
            this.handleValueChange(value);
        };
        unselectAllOfMiddle = middle => {
            let value = this.getCurrentValue(true);
            const { items } = this.store.getState();
            const middleUid = middle.uid;
            const middleItems = _.filter(items, item => item.parents[middleUid]);
            value = _.filter(value, v => _.findIndex(middleItems, item => getItemValue(item.item) === v) === -1);
            this.handleValueChange(value);
        };

        render() {
            /* eslint-disable-next-line no-unused-vars*/
            const { innerRef, onItemsChange, ...rest } = this.props;
            return (
                <StoreContext.Provider
                    value={{
                        store: this.store,
                        multiple: this.props.multiple,
                        appendItem: this.appendItem,
                        removeItem: this.removeItem,
                        toggleItem: this.toggleItem,
                        getItemSelected: this.getItemSelected,
                        getAllSelectedStatusOfMiddle: this.getAllSelectedStatusOfMiddle,
                        selectAllOfMiddle: this.selectAllOfMiddle,
                        unselectAllOfMiddle: this.unselectAllOfMiddle,
                        selectable: this.props.selectable
                    }}
                >
                    <Parent ref={innerRef} {...rest} />
                </StoreContext.Provider>
            );
        }
    };
};

export default storeDecorator;
