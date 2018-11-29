import React, { PureComponent } from 'react';

import withTheme from 'src/components/ThemeProvider/withTheme';

import { CardWrap } from './style';

/** 卡片布局控件 */
@withTheme
class Card extends PureComponent {
    render() {
        return <CardWrap {...this.props} />;
    }
}

export default Card;
