import raf from 'raf';

const scrollMap: { [key: number]: number } = {};

const _scrollTo = (element: Element, to: number, duration: number, uid: number, tag: number) => {
    if (tag != scrollMap[uid]) return;
    if (duration <= 0) {
        raf(() => {
            element.scrollTop = to;
        });
        return;
    }
    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;

    raf(() => {
        element.scrollTop += perTick;
        if (element.scrollTop === to) return;
        _scrollTo(element, to, duration - 10, uid, tag);
    });
};

export const scrollTo = (element: Element, to: number, duration: number, uid: number) => {
    _scrollTo(element, to, duration, uid, (scrollMap[uid] = (scrollMap[uid] | 0) + 1));
};
