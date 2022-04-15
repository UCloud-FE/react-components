import React, { memo, ReactNode, useCallback } from 'react';
import { TDate } from '@z-r/calendar/types/interface';

import Button from 'src/components/Button';
import Box from 'src/components/Box';
import Combine from 'src/components/Combine';
import useLocale from 'src/components/LocaleProvider/useLocale';

import LOCALE from './locale/zh_CN';
import { shortcutCls, footerCls, tipCls } from './style';

export interface TShortcut {
    handle: () => TDate;
    locale?: keyof typeof LOCALE;
    label?: ReactNode;
}
type Mode = 'date' | 'month';

const ShortcutWithoutMemo = ({
    index,
    shortcut,
    onShortcutClick,
    locale: _locale
}: {
    index: number;
    shortcut: TShortcut;
    onShortcutClick: (i: number) => void;
    locale?: typeof LOCALE;
}) => {
    const handleClick = useCallback(() => {
        onShortcutClick(index);
    }, [index, onShortcutClick]);
    const locale = useLocale(LOCALE, 'DatePicker', _locale);

    return (
        <span className={shortcutCls} onClick={handleClick}>
            {shortcut.label ? shortcut.label : shortcut.locale ? locale[shortcut.locale] : 'shortcut'}
        </span>
    );
};
const Shortcut = memo(ShortcutWithoutMemo);

interface FooterProps {
    mode: Mode;
    confirmAble: boolean;
    onConfirm: () => void;
    shortcuts?: TShortcut[] | null;
    onShortcut: (d: TDate) => void;
    tip?: ReactNode;
    locale?: typeof LOCALE;
    showConfirm?: boolean;
}
const Footer = ({ confirmAble, onConfirm, shortcuts, onShortcut, tip, showConfirm, locale: _locale }: FooterProps) => {
    if (shortcuts == null) shortcuts = [];
    const handleShortcutClick = useCallback(
        i => {
            const shortcut = shortcuts?.[i];
            if (!shortcut) return;
            const d = shortcut.handle();
            onShortcut(d);
        },
        [onShortcut, shortcuts]
    );
    const handleConfirm = useCallback(() => onConfirm(), [onConfirm]);
    const locale = useLocale(LOCALE, 'DatePicker', _locale);

    return (
        <Box className={footerCls} container justifyContent="space-between" alignItems="center">
            <Combine>
                {shortcuts.map((shortcut, i) => (
                    <Shortcut index={i} key={i} shortcut={shortcut} onShortcutClick={handleShortcutClick} />
                ))}
            </Combine>
            <Combine>
                {tip ? <span className={tipCls}>{tip}</span> : null}
                {showConfirm && (
                    <Button styleType="primary" size='sm' disabled={!confirmAble} onClick={handleConfirm}>
                        {locale.confirm}
                    </Button>
                )}
            </Combine>
        </Box>
    );
};

export default memo(Footer);
