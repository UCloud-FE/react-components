import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ExtraWrap } from './style';
import { SelectContext } from './Select';

class Extra extends PureComponent {
    static propTypes = {
        /**
         * 扩展区域被点击后是否自动关闭弹出层
         */
        autoHidePopup: PropTypes.bool,
        /** @ignore */
        children: PropTypes.node,
        /** @ignore */
        onClick: PropTypes.func
    };
    render() {
        const { children, autoHidePopup, onClick, ...rest } = this.props;
        return autoHidePopup ? (
            <SelectContext.Consumer>
                {({ hidePopup }) => (
                    <ExtraWrap
                        onClick={e => {
                            hidePopup();
                            onClick && onClick(e);
                        }}
                        {...rest}
                    >
                        {children}
                    </ExtraWrap>
                )}
            </SelectContext.Consumer>
        ) : (
            <ExtraWrap onClick={onClick} {...rest}>
                {children}
            </ExtraWrap>
        );
    }
}

Extra.isMenuItem = false;

export default Extra;
