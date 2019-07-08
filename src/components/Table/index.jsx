import Table from './Table';
export default Table;

import ColumnConfigButton from './ColumnConfigButton';
Table.ColumnConfigButton = ColumnConfigButton;

import SearchInput from './SearchInput';
Table.SearchInput = SearchInput;

import ActionList from './ActionList';
Table.ActionList = ActionList;

import ExpandedRowContent from './ExpandedRowContent';
Table.ExpandedRowContent = ExpandedRowContent;

import * as utils from './utils';
Object.assign(Table, utils);
