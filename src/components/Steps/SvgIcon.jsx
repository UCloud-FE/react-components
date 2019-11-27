import React, { PureComponent } from 'react';

import { SvgWrapper } from './style';

export default class SvgIcon extends PureComponent {
    render() {
        return <SvgWrapper viewBox="0 0 24 24" {...this.props} />;
    }
}
