import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'src/components/Tooltip';
import Button from 'src/components/Button';
import SvgIcon from 'src/components/SvgIcon';
import Combine from 'src/components/Combine';
import localeConsumerDecorator from 'src/components/LocaleProvider/localeConsumerDecorator';
import uncontrolledDecorator from 'src/decorators/uncontrolled';
import { PopupWrap, ContentWrap, FooterWrap, IconWrap } from './style';
import LOCALE from './locale/zh_CN';

const noop = () => {};

@localeConsumerDecorator({ defaultLocale: LOCALE, localeName: 'PopConfirm' })
@uncontrolledDecorator({ valueName: 'visible', onChangeName: 'onVisibleChange' })
class PopConfirm extends Component {
    static propTypes = {
        /** @ignore */
        popup: PropTypes.node,
        /** @ignore */
        defaultVisible: PropTypes.bool,
        /** @ignore */
        visible: PropTypes.bool,
        /** @ignore */
        onVisibleChange: PropTypes.func,
        /** @ignore */
        locale: PropTypes.object,
        /** 确认按钮回调 */
        onConfirm: PropTypes.func,
        /** 取消按钮回调 */
        onCancel: PropTypes.func
    };
    static defaultProps = {
        onVisibleChange: noop,
        onConfirm: noop,
        onCancel: noop
    };
    onConfirm = () => {
        const { onVisibleChange, onConfirm } = this.props;
        onVisibleChange(false);
        onConfirm();
    };
    onCancel = () => {
        const { onVisibleChange, onCancel } = this.props;
        onVisibleChange(false);
        onCancel();
    };
    renderPopup = () => {
        const { locale, popup } = this.props;
        return (
            <PopupWrap>
                <IconWrap>
                    <SvgIcon size="20px" type="exclamation-circle-filled" />
                </IconWrap>
                <ContentWrap>{popup}</ContentWrap>
                <FooterWrap>
                    <Combine sharedProps={{ size: 'sm' }}>
                        <Button onClick={this.onCancel}>{locale.cancel}</Button>
                        <Button onClick={this.onConfirm} styleType="primary">
                            {locale.confirm}
                        </Button>
                    </Combine>
                </FooterWrap>
            </PopupWrap>
        );
    };
    render() {
        // eslint-disable-next-line no-unused-vars
        const { popup, defaultVisible, visible, locale, ...rest } = this.props;
        return (
            <Tooltip
                trigger={['click']}
                popup={this.renderPopup()}
                customStyle={{ popupWrapperPadding: '0px' }}
                {...rest}
                visible={visible}
            />
        );
    }
}

export default PopConfirm;
