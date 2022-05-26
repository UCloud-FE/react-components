import React, { memo, ReactNode, useCallback } from 'react';
import { TDate } from '@z-r/calendar';

import Button from 'src/components/Button';
import Box from 'src/components/Box';
import useLocale from 'src/components/LocaleProvider/useLocale';
import SvgIcon from 'src/components/SvgIcon';

import LOCALE from './locale/zh_CN';
import { errorTipCls, footerCls, tipCls, tipIconCls } from './style';

export interface TShortcut {
    handle: () => TDate;
    locale?: keyof typeof LOCALE;
    label?: ReactNode;
}
type Mode = 'date' | 'month';

export const TipIcon = React.memo(function TipIcon() {
    return <SvgIcon type="exclamation-circle-filled" className={tipIconCls} />;
});

interface FooterProps {
    mode: Mode;
    confirmAble: boolean;
    onConfirm: () => void;
    shortcuts?: TShortcut[] | null;
    onShortcut: (d: TDate) => void;
    tip?: {
        type?: 'error' | 'tip';
        content: ReactNode;
    };
    locale?: typeof LOCALE;
    showConfirm?: boolean;
}

// deprecated shortcuts for UX
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Footer = ({ confirmAble, onConfirm, shortcuts, onShortcut, tip, showConfirm, locale: _locale }: FooterProps) => {
    const handleConfirm = useCallback(() => onConfirm(), [onConfirm]);
    const locale = useLocale(LOCALE, 'DatePicker', _locale);
    return !tip && !showConfirm ? null : (
        <Box className={footerCls} container justifyContent="space-between" alignItems="center">
            {tip ? (
                <span
                    className={tip.type === 'error' ? errorTipCls : tipCls}
                    title={typeof tip.content === 'string' ? tip.content : ''}
                >
                    <TipIcon />
                    <span>{tip.content}</span>
                </span>
            ) : (
                <span></span>
            )}
            {showConfirm && (
                <Button styleType="primary" size="sm" disabled={!confirmAble} onClick={handleConfirm}>
                    {locale.confirm}
                </Button>
            )}
        </Box>
    );
};

export default memo(Footer);
