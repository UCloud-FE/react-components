import React, { memo, ReactNode, useCallback } from 'react';
import { TDate } from '@z-r/calendar/types/interface';

import Button from 'src/components/Button';
import Box from 'src/components/Box';
import Combine from 'src/components/Combine';
import useLocale from 'src/components/LocaleProvider/useLocale';

import LOCALE from './locale/zh_CN';
import { shortcutCls, footerCls } from './style';

export interface TShortcut {
    handle: () => TDate;
    locale?: keyof typeof LOCALE;
    label?: ReactNode;
}
type Mode = 'date' | 'month';

const presetShortcuts: Record<Mode, TShortcut> = {
    date: {
        handle: () => new Date(),
        locale: 'chooseTodayNow'
    },
    month: {
        handle: () => new Date(),
        locale: 'chooseThisMonth'
    }
};

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
            {shortcut.label ? shortcut.label : shortcut.locale ? locale[shortcut.locale] : shortcut.locale}
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
    locale?: typeof LOCALE;
}
const Footer = ({ mode, confirmAble, onConfirm, shortcuts, onShortcut, locale: _locale }: FooterProps) => {
    if (shortcuts === undefined) {
        shortcuts = [presetShortcuts[mode]];
    } else if (shortcuts === null) {
        shortcuts = [];
    }
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
            <Button styleType="primary" disabled={!confirmAble} onClick={handleConfirm}>
                {locale.confirm}
            </Button>
        </Box>
    );
};

export default memo(Footer);
