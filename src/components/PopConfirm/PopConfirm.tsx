import React, { useCallback, useMemo } from 'react';

import Tooltip from 'src/components/Tooltip';
import Button from 'src/components/Button';
import SvgIcon from 'src/components/SvgIcon';
import Combine from 'src/components/Combine';
import noop from 'src/utils/noop';
import useUncontrolled from 'src/hooks/useUncontrolled';
import useLocale from 'src/components/LocaleProvider/useLocale';

import { PopupWrap, ContentWrap, FooterWrap, IconWrap } from './style';
import LOCALE from './locale/zh_CN';

export interface PopConfirmProps {
    /** @ignore */
    locale?: typeof LOCALE;
    /** 确认按钮回调 */
    onConfirm?: () => void;
    /** 取消按钮回调 */
    onCancel?: () => void;
}

const PopConfirm = (
    {
        locale: _locale,
        onConfirm: _onConfirm = noop,
        onCancel: _onCancel = noop,
        popup: _popup,
        defaultVisible = false,
        visible: _visible,
        onVisibleChange: _onVisibleChange,
        ...rest
    }: PopConfirmProps & any // TODO use popupProps
) => {
    const [visible, onVisibleChange] = useUncontrolled(_visible, defaultVisible, _onVisibleChange);
    const onConfirm = useCallback(() => {
        onVisibleChange(false);
        _onConfirm();
    }, [_onConfirm, onVisibleChange]);
    const onCancel = useCallback(() => {
        onVisibleChange(false);
        _onCancel();
    }, [_onCancel, onVisibleChange]);
    const locale = useLocale(LOCALE, 'PopConfirm', _locale);
    const popup = useMemo(() => {
        return (
            <PopupWrap>
                <IconWrap>
                    <SvgIcon size="20px" type="exclamation-circle-filled" />
                </IconWrap>
                <ContentWrap>{_popup}</ContentWrap>
                <FooterWrap>
                    <Combine sharedProps={{ size: 'sm' }}>
                        <Button onClick={onCancel}>{locale.cancel}</Button>
                        <Button onClick={onConfirm} styleType="primary">
                            {locale.confirm}
                        </Button>
                    </Combine>
                </FooterWrap>
            </PopupWrap>
        );
    }, [_popup, locale.cancel, locale.confirm, onCancel, onConfirm]);
    return (
        <Tooltip
            trigger={['click']}
            popup={popup}
            customStyle={{ popupWrapperPadding: '0px' }}
            onVisibleChange={onVisibleChange}
            {...rest}
            visible={visible}
        />
    );
};

export default PopConfirm;
