import React, { PureComponent } from 'react';

import { ExpandedRowContent } from './style';

export class ExpandedRow extends PureComponent {
    render() {
        return <ExpandedRowContent {...this.props} />;
    }
}

export default ExpandedRow;
