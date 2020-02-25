import React, { Component } from 'react';

import Input from 'src/components/Input';

import { TableContext } from './Table';

export default class SearchInput extends Component {
    render() {
        const { ...rest } = this.props;
        return (
            <TableContext.Consumer>
                {({ handleSearch }) => <Input.Search onSearch={handleSearch} {...rest} />}
            </TableContext.Consumer>
        );
    }
}
