import React, { Component } from 'react';
import PropTypes from 'prop-types';

import KEYCODE from 'interfaces/KeyCode';

import Input from './Input';
import { SearchIcon } from './style';

class Search extends Component {
    static propTypes = {
        /** 搜索回调 */
        onSearch: PropTypes.func,
        /** @ignore */
        onKeyDown: PropTypes.func,
        /** @ignore */
        disabled: PropTypes.bool
    };
    static defaultProps = {
        onSearch: () => {}
    };
    onSearch = () => {
        const { onSearch, disabled } = this.props;
        !disabled && onSearch(this.input.input.value);
    };
    render() {
        // eslint-disable-next-line no-unused-vars
        const { onSearch, onKeyDown, ...rest } = this.props;
        return (
            <Input
                {...rest}
                onKeyDown={e => {
                    if (e.keyCode === KEYCODE['ENTER']) {
                        this.onSearch();
                        e.preventDefault();
                    }
                    if (onKeyDown) {
                        onKeyDown(e);
                    }
                }}
                ref={ref => (this.input = ref)}
                suffix={<SearchIcon type="search" onClick={this.onSearch} />}
            />
        );
    }
}

export default Search;
