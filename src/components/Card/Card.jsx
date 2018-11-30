import React, { PureComponent } from 'react';

import { CardWrap } from './style';

/** 卡片布局控件 */
class Card extends PureComponent {
    render() {
        return <CardWrap {...this.props} />;
    }
}

export default Card;
