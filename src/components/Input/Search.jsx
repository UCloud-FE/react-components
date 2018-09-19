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
        onKeyDown: PropTypes.func
    };
    static defaultProps = {
        onSearch: () => {}
    };
    render() {
        const { onSearch, onKeyDown, ...rest } = this.props;
        return (
            <Input
                {...rest}
                onKeyDown={e => {
                    if (e.keyCode === KEYCODE['ENTER']) {
                        onSearch(this.input.input.value);
                        e.preventDefault();
                    }
                    if (onKeyDown) {
                        onKeyDown(e);
                    }
                }}
                ref={ref => (this.input = ref)}
                icon={<SearchIcon type="search" onClick={() => onSearch(this.input.input.value)} />}
            />
        );
    }
}

export default Search;
