import React, { PureComponent } from 'react';

import { BackButtonWrap } from './style';

export default class BackButton extends PureComponent {
    render() {
        return <BackButtonWrap {...this.props} />;
    }
}
